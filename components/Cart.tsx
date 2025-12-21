
import React from 'react';
import { X, Trash2, Plus, Minus, CreditCard } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

const Cart: React.FC<CartProps> = ({ items, onClose, onUpdateQuantity, onRemove }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transform transition-transform animate-slide-in">
        <div className="p-6 flex items-center justify-between border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">Səbətiniz</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                <Trash2 className="w-8 h-8 text-slate-300" />
              </div>
              <div>
                <p className="text-lg font-semibold text-slate-800">Səbət boşdur</p>
                <p className="text-sm text-slate-500">Alış-verişə davam edin!</p>
              </div>
              <button 
                onClick={onClose}
                className="px-6 py-2 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors"
              >
                Kataloqa qayıt
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <h4 className="font-semibold text-slate-800 text-sm">{item.name}</h4>
                    <button onClick={() => onRemove(item.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-indigo-600 font-bold mb-3">${item.price}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-slate-200 rounded-lg">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="p-1 hover:bg-slate-50 text-slate-600 disabled:opacity-30"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="p-1 hover:bg-slate-50 text-slate-600"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-slate-100 bg-slate-50/50">
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-slate-500 text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500 text-sm">
                <span>Çatdırılma</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-slate-900 font-bold text-lg pt-2 border-t border-slate-200">
                <span>Ümumi</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 active:scale-95 transition-all">
              <CreditCard className="w-5 h-5" />
              Sifarişi Tamamla
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
