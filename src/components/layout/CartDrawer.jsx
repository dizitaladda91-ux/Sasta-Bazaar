import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    updateQuantity,
    removeFromCart,
    subtotal,
    totalCount,
    freeShippingRemaining,
    freeShippingProgress,
    freeShippingThreshold
  } = useCart();

  const navigate = useNavigate();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    closeCart();
    navigate('/cart');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={closeCart}
      />

      {/* Slide-out Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-drawer flex flex-col z-10 animate-fade-in">
        {/* Drawer Header */}
        <div className="p-4 border-b border-sasta-border flex items-center justify-between bg-sasta-yellow-cream">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-sasta-gold-dark" />
            <h3 className="font-serif font-bold text-lg text-sasta-heading">
              In your Bag ({totalCount})
            </h3>
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 text-sasta-muted hover:text-sasta-heading hover:bg-white rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Indicator */}
        <div className="bg-sasta-yellow-light/60 p-3 border-b border-sasta-border text-xs">
          {freeShippingRemaining > 0 ? (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sasta-heading">
                <span className="flex items-center gap-1 font-medium">
                  <Truck className="w-3.5 h-3.5 text-sasta-gold-dark" />
                  Add <strong className="text-sasta-navy font-bold">£{freeShippingRemaining.toFixed(2)}</strong> more for FREE UK Delivery
                </span>
                <span className="font-bold">{Math.round(freeShippingProgress)}%</span>
              </div>
              <div className="w-full bg-sasta-border/50 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-sasta-gold h-full rounded-full transition-all duration-500"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-emerald-800 font-semibold">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>🎉 Congratulations! You qualified for FREE UK Delivery!</span>
            </div>
          )}
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-sasta-border/50">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.itemKey} className="py-4 first:pt-0 last:pb-0 flex gap-3.5">
                <Link
                  to={`/product/${item.handle}`}
                  onClick={closeCart}
                  className="shrink-0 w-20 h-28 bg-neutral-100 rounded overflow-hidden"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </Link>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <Link
                        to={`/product/${item.handle}`}
                        onClick={closeCart}
                        className="text-sm font-medium text-sasta-heading hover:text-sasta-gold-dark line-clamp-2 transition-colors"
                      >
                        {item.title}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.itemKey)}
                        className="text-sasta-muted hover:text-red-600 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-1 flex flex-wrap gap-2 text-xs text-sasta-muted">
                      {item.size && (
                        <span className="bg-sasta-yellow-cream px-1.5 py-0.5 rounded border border-sasta-border/70">
                          Size: {item.size}
                        </span>
                      )}
                      {item.color && (
                        <span className="bg-sasta-yellow-cream px-1.5 py-0.5 rounded border border-sasta-border/70">
                          Color: {item.color}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-sasta-border rounded bg-white">
                      <button
                        onClick={() => updateQuantity(item.itemKey, item.quantity - 1)}
                        className="p-1 hover:bg-neutral-100 text-sasta-heading transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-semibold text-sasta-heading min-w-[24px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.itemKey, item.quantity + 1)}
                        className="p-1 hover:bg-neutral-100 text-sasta-heading transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <div className="text-sm font-bold text-sasta-heading">
                        £{(item.price * item.quantity).toFixed(2)}
                      </div>
                      {item.compareAtPrice && (
                        <div className="text-xs text-sasta-muted line-through">
                          £{(item.compareAtPrice * item.quantity).toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-sasta-muted space-y-4">
              <div className="w-16 h-16 rounded-full bg-sasta-yellow-soft flex items-center justify-center text-sasta-gold-dark">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-lg font-bold text-sasta-heading">
                Your Bag is Empty
              </h4>
              <p className="text-xs text-sasta-body max-w-xs leading-relaxed">
                Discover our latest handcrafted suits, lehengas, and everyday luxury ethnic fashion.
              </p>
              <Link
                to="/shop"
                onClick={closeCart}
                className="bg-sasta-gold hover:bg-sasta-gold-hover text-sasta-heading font-semibold text-xs uppercase tracking-wider px-6 py-2.5 rounded shadow-sm transition-all"
              >
                Start Shopping
              </Link>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t border-sasta-border bg-sasta-yellow-cream/60 space-y-3">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-sasta-body">
                <span>Subtotal</span>
                <span className="font-semibold text-sasta-heading">£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-sasta-muted">
                <span>Taxes &amp; Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={handleCheckout}
                className="w-full bg-sasta-gold hover:bg-sasta-gold-hover text-sasta-heading font-bold text-sm uppercase tracking-wider py-3 rounded shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Checkout Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                to="/cart"
                onClick={closeCart}
                className="w-full text-center text-xs font-semibold uppercase tracking-wider text-sasta-heading hover:text-sasta-gold-dark py-1.5 transition-colors"
              >
                View Full Bag &rarr;
              </Link>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-sasta-muted pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-sasta-gold-dark" />
              <span>Secure, encrypted 256-bit SSL checkout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
