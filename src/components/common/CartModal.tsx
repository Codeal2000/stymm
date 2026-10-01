import React, { useState } from 'react';
import { CartItem } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { ShoppingBag, X, Trash2, CheckCircle2, ArrowRight } from 'lucide-react';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, qty: number) => void;
  onClearCart: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity,
  onClearCart,
}) => {
  const { theme } = useTheme();
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const total = items.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);

  const handleCheckout = () => {
    setIsSuccess(true);
    setTimeout(() => {
      onClearCart();
      setIsSuccess(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className={`border rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl flex flex-col max-h-[85vh] transition-colors duration-200 ${
        theme === 'dark'
          ? 'bg-neutral-900 border-neutral-800 text-slate-100'
          : 'bg-white border-emerald-100 text-neutral-800 shadow-emerald-950/5'
      }`}>
        <div className={`flex items-center justify-between border-b pb-3 ${
          theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'
        }`}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600/10 text-emerald-600 flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className={`text-base font-bold font-display ${
                theme === 'dark' ? 'text-white' : 'text-neutral-900'
              }`}>
                Campaign Store Cart
              </h2>
              <p className={`text-[11px] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                Official STYMM Grassroots Merchandise
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className={`p-1.5 rounded-lg transition-colors ${
              theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-neutral-800' : 'text-slate-400 hover:text-neutral-800 hover:bg-slate-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-10 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
              Order Placed Successfully!
            </h3>
            <p className={`text-xs max-w-xs mx-auto ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
              Thank you for ordering official campaign materials. Your grassroots supporter package is being processed.
            </p>
            <div className="font-mono text-xs text-emerald-600 font-semibold pt-2">
              Receipt #STYMM-{Math.floor(100000 + Math.random() * 900000)}
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="py-12 text-center text-xs space-y-3">
            <ShoppingBag className={`w-12 h-12 mx-auto ${theme === 'dark' ? 'text-neutral-700' : 'text-emerald-200'}`} />
            <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>
              Your campaign merchandise cart is currently empty.
            </p>
            <button
              onClick={onClose}
              className="text-emerald-600 font-semibold text-xs hover:underline inline-flex items-center gap-1"
            >
              Browse Campaign Store <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
            {items.map((cartItem) => (
              <div
                key={cartItem.item.id}
                className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                  theme === 'dark'
                    ? 'bg-black border-neutral-800'
                    : 'bg-emerald-50/40 border-emerald-100'
                }`}
              >
                <div className="space-y-0.5 flex-1 min-w-0">
                  <div className={`font-bold truncate ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                    {cartItem.item.name}
                  </div>
                  <div className="text-[11px] text-emerald-600 font-mono font-semibold">
                    ₦{cartItem.item.price.toLocaleString()} {cartItem.size ? `· Size ${cartItem.size}` : ''}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className={`flex items-center border rounded-lg overflow-hidden ${
                    theme === 'dark' ? 'border-neutral-800 bg-neutral-900' : 'border-emerald-200 bg-white'
                  }`}>
                    <button
                      onClick={() => onUpdateQuantity(cartItem.item.id, Math.max(1, cartItem.quantity - 1))}
                      className={`px-2 py-0.5 font-bold transition-colors ${
                        theme === 'dark' ? 'text-slate-300 hover:text-white hover:bg-neutral-800' : 'text-slate-600 hover:text-emerald-800 hover:bg-emerald-50'
                      }`}
                    >
                      -
                    </button>
                    <span className={`px-2 font-mono font-bold text-xs ${
                      theme === 'dark' ? 'text-white' : 'text-neutral-900'
                    }`}>
                      {cartItem.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                      className={`px-2 py-0.5 font-bold transition-colors ${
                        theme === 'dark' ? 'text-slate-300 hover:text-white hover:bg-neutral-800' : 'text-slate-600 hover:text-emerald-800 hover:bg-emerald-50'
                      }`}
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveItem(cartItem.item.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isSuccess && items.length > 0 && (
          <div className={`border-t pt-3 space-y-3 text-xs ${
            theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'
          }`}>
            <div className="flex items-center justify-between">
              <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
                Total Contribution:
              </span>
              <span className={`font-mono text-base font-extrabold ${
                theme === 'dark' ? 'text-white' : 'text-emerald-950'
              }`}>
                ₦{total.toLocaleString()}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-md shadow-emerald-900/20 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Complete Merchandise Order</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
