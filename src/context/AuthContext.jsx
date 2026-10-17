import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

const AUTH_STORAGE_KEY = 'sasta_bazaar_auth_user_v1';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error('Failed to parse user from localStorage', e);
      return null;
    }
  });

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to save user in localStorage', e);
    }
  }, [user]);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await api.login({ email, password });
      if (res.success && res.user) {
        setUser(res.user);
        showNotification(`Welcome back, ${res.user.name.split(' ')[0]}!`);
        return { success: true, user: res.user };
      } else {
        return { success: false, message: res.message || 'Login failed' };
      }
    } catch (err) {
      return { success: false, message: 'Network error during login' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const res = await api.register(userData);
      if (res.success && res.user) {
        setUser(res.user);
        showNotification(`Account created! Welcome to Sasta Bazaar.`);
        return { success: true, user: res.user, couponCode: res.couponCode };
      } else {
        return { success: false, message: res.message || 'Registration failed' };
      }
    } catch (err) {
      return { success: false, message: 'Network error during registration' };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    if (!user) return { success: false, message: 'Not logged in' };
    try {
      const res = await api.updateProfile({ ...profileData, email: user.email });
      if (res.success && res.user) {
        setUser(res.user);
        showNotification('Profile updated successfully');
        return { success: true, user: res.user };
      }
      return { success: false, message: res.message };
    } catch (e) {
      return { success: false, message: 'Error updating profile' };
    }
  };

  const logout = () => {
    setUser(null);
    showNotification('You have been signed out.');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        loading,
        notification,
        login,
        register,
        updateProfile,
        logout,
        showNotification
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
