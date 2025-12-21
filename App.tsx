
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import AIAssistant from './components/AIAssistant';
import { products } from './data/products';
import { Product, CartItem, Category } from './types';
import { Tag, Sparkles } from 'lucide-react';

const CATEGORIES: Category[] = ['All', 'Electronics', 'Fashion', 'Home', 'Gadgets'];

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen pb-20">
      <Header 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onCartToggle={() => setIsCartOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden bg-slate-900 px-4">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1600" 
            className="w-full h-full object-cover" 
            alt="Hero Background"
          />
        </div>
        <div className="relative z-10 text-center space-y-6 max-w-2xl animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 border border-indigo-400/30 rounded-full text-indigo-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
            <Sparkles className="w-3 h-3" /> New Collection 2024
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
            Nova Market ilə<br/>Gələcəyi Alın.
          </h1>
          <p className="text-slate-300 text-lg md:text-xl font-medium max-w-lg mx-auto">
            Ən son texnologiya və premium məhsullar artıq bir klik uzaqlığında.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
              İndi Alış-veriş et
            </button>
            <button className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-bold backdrop-blur-md transition-all active:scale-95">
              Kampaniyalar
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Categories */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-2">
            <Tag className="text-indigo-600 w-5 h-5" />
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Kategoriyalar</h2>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide no-scrollbar">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 scale-105' 
                    : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 space-y-4">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="w-10 h-10 text-slate-200" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 italic">"Onlayn Market" axtarışınız üzrə heç nə tapılmadı</h3>
            <p className="text-slate-500 max-w-sm mx-auto text-sm">Axtarış sözünü dəyişməyə və ya başqa kateqoriyaya baxmağa çalışın.</p>
            <button 
              onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
              className="text-indigo-600 font-bold hover:underline"
            >
              Bütün məhsullara bax
            </button>
          </div>
        )}
      </main>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <Cart 
          items={cartItems} 
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
        />
      )}

      {/* AI Assistant */}
      <AIAssistant />

      <footer className="mt-20 py-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-indigo-600 p-1 rounded-lg">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">
              NovaMarket
            </span>
          </div>
          <p className="text-slate-500 text-sm max-w-md mx-auto mb-8">
            Premium shopping experience with AI-powered assistance. Fast delivery worldwide.
          </p>
          <div className="flex justify-center gap-8 mb-8 text-sm font-semibold text-slate-600">
            <a href="#" className="hover:text-indigo-600">Məxfilik</a>
            <a href="#" className="hover:text-indigo-600">Şərtlər</a>
            <a href="#" className="hover:text-indigo-600">Dəstək</a>
            <a href="#" className="hover:text-indigo-600">Bizimlə Əlaqə</a>
          </div>
          <p className="text-slate-400 text-xs">
            © 2024 NovaMarket Inc. Bütün hüquqlar qorunur.
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes slide-up {
          from { transform: translateY(20px) scale(0.95); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in { animation: slide-in 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-slide-up { animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default App;
