import React, { useState } from 'react';
import { CAMPAIGN_STORE_ITEMS } from '../../data/campaignData';
import { StoreItem } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { useCampaignMedia } from '../../context/CampaignMediaContext';
import { ShoppingBag, Check } from 'lucide-react';

interface PublicStoreProps {
  onAddToCart: (item: StoreItem, size?: string) => void;
}

export const PublicStore: React.FC<PublicStoreProps> = ({ onAddToCart }) => {
  const { theme } = useTheme();
  const { images } = useCampaignMedia();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSizes, setSelectedSizes] = useState<{ [itemId: string]: string }>({
    'prod-2': 'L',
    'prod-4': 'L',
  });
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);

  const categories = ['All', 'Caps & Hats', 'Apparel', 'Accessories', 'Campaign Bundles'];

  const filtered = CAMPAIGN_STORE_ITEMS.filter((item) =>
    selectedCategory === 'All' ? true : item.category === selectedCategory
  );

  const handleAdd = (item: StoreItem) => {
    const size = selectedSizes[item.id] || item.sizes?.[0];
    onAddToCart(item, size);
    setAddedItemNotice(`Added "${item.name}" to cart!`);
    setTimeout(() => setAddedItemNotice(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className={`border-b pb-8 space-y-3 transition-colors ${
        theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'
      }`}>
        <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
          Official Campaign Merchandise
        </div>
        <h1 className={`text-3xl sm:text-5xl font-extrabold font-display transition-colors ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>
          STYMM Supporter Gear
        </h1>
        <p className={`text-base max-w-3xl leading-relaxed ${
          theme === 'dark' ? 'text-neutral-300' : 'text-slate-600'
        }`}>
          Wear your conviction with pride. All proceeds support grassroots youth organizing, door canvassers, and voter registration kits nationwide.
        </p>
      </div>

      {/* Hero Showcase Banner */}
      <div className={`relative rounded-3xl overflow-hidden border shadow-lg transition-all ${
        theme === 'dark'
          ? 'border-neutral-800 bg-neutral-900'
          : 'border-emerald-100 bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-950 text-white'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 p-6 sm:p-10 space-y-4">
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest">
              Limited Edition 2026 Collection
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
              Premium Field Agent & Supporter Kits
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-xl">
              Crafted with high-grade breathable fabrics, gold embroidered insignias, and built for active field campaign rallies and door-to-door tours.
            </p>
          </div>
          <div className="md:col-span-5 h-64 md:h-full overflow-hidden">
            <img
              src={images.merchandise}
              alt="Official STYMM merchandise arrangement"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>

      {/* Added notice */}
      {addedItemNotice && (
        <div className="p-3 bg-emerald-600 text-white rounded-xl text-xs font-semibold flex items-center justify-between shadow-md animate-fadeIn">
          <span>{addedItemNotice}</span>
          <Check className="w-4 h-4" />
        </div>
      )}

      {/* Category Tabs */}
      <div className={`flex items-center gap-1 p-1 border rounded-xl overflow-x-auto w-full sm:w-auto transition-colors ${
        theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-emerald-100 shadow-sm'
      }`}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-emerald-600 text-white font-bold shadow-sm'
                : theme === 'dark'
                ? 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                : 'text-slate-600 hover:text-emerald-800 hover:bg-emerald-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Store Items Grid with card-focus-group: hover pops out card and blurs rest */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 card-focus-group">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`border rounded-2xl p-5 flex flex-col justify-between space-y-4 transition-all cursor-pointer ${
              theme === 'dark'
                ? 'bg-neutral-900 border-neutral-800 hover:border-emerald-500/40 text-neutral-100'
                : 'bg-white border-emerald-100 hover:border-emerald-300 shadow-sm text-slate-800'
            }`}
          >
            <div className="space-y-3">
              <div className={`w-full aspect-square rounded-xl border flex flex-col items-center justify-center p-4 text-center relative overflow-hidden group transition-colors ${
                theme === 'dark' ? 'bg-black border-neutral-800' : 'bg-emerald-50/50 border-emerald-100'
              }`}>
                <ShoppingBag className="w-12 h-12 text-emerald-500 group-hover:scale-110 transition-transform" />
                <span className={`text-[10px] font-mono uppercase tracking-wider mt-2 font-bold ${
                  theme === 'dark' ? 'text-neutral-400' : 'text-emerald-800'
                }`}>
                  {item.category}
                </span>
                <div className="absolute top-2 right-2 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  {item.stock} left
                </div>
              </div>

              <div>
                <h3 className={`font-bold text-sm leading-snug ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {item.name}
                </h3>
                <p className={`text-xs mt-1 line-clamp-2 ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-600'}`}>
                  {item.description}
                </p>
              </div>

              {item.sizes && (
                <div className="space-y-1.5 pt-1">
                  <div className={`text-[11px] font-semibold ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}`}>
                    Select Size:
                  </div>
                  <div className="flex gap-1.5">
                    {item.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSizes({ ...selectedSizes, [item.id]: sz });
                        }}
                        className={`w-7 h-7 rounded-lg text-xs font-bold border transition-colors ${
                          selectedSizes[item.id] === sz
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : theme === 'dark'
                            ? 'border-neutral-700 bg-neutral-800 text-neutral-300 hover:border-neutral-600'
                            : 'border-emerald-200 bg-white text-slate-700 hover:border-emerald-400'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className={`pt-3 border-t flex items-center justify-between ${
              theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'
            }`}>
              <div className={`font-mono text-base font-extrabold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                ₦{item.price.toLocaleString()}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAdd(item);
                }}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center gap-1.5 active:scale-95"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
