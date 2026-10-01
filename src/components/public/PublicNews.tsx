import React, { useState } from 'react';
import { CAMPAIGN_NEWS } from '../../data/campaignData';
import { NewsItem } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { Search, ArrowRight, ArrowLeft } from 'lucide-react';

export const PublicNews: React.FC = () => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);

  const categories = ['All', 'Press Release', 'Campaign Dispatch', 'Policy Announcement', 'Grassroots Spotlight'];

  const filteredNews = CAMPAIGN_NEWS.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className={`border-b pb-8 space-y-3 transition-colors ${
        theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'
      }`}>
        <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
          Campaign Communications
        </div>
        <h1 className={`text-3xl sm:text-5xl font-extrabold font-display transition-colors ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>
          News, Media & Official Statements
        </h1>
        <p className={`text-base max-w-3xl leading-relaxed ${
          theme === 'dark' ? 'text-neutral-300' : 'text-slate-600'
        }`}>
          Verified press briefings, policy releases, video dispatches, and grassroots mobilization stories directly from the STYMM Secretariat.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
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

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className={`w-4 h-4 absolute left-3 top-2.5 ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}`} />
          <input
            type="text"
            placeholder="Search statements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-9 pr-3 py-2 border rounded-xl text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
              theme === 'dark'
                ? 'bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500 focus:border-emerald-500'
                : 'bg-white border-emerald-200 text-slate-900 placeholder-slate-400 focus:border-emerald-600 shadow-sm'
            }`}
          />
        </div>
      </div>

      {/* Article Detail View */}
      {selectedArticle ? (
        <div className={`border rounded-2xl p-6 sm:p-10 space-y-6 shadow-xl transition-colors ${
          theme === 'dark'
            ? 'bg-neutral-900 border-neutral-800 text-neutral-100'
            : 'bg-white border-emerald-100 text-slate-800 shadow-emerald-950/5'
        }`}>
          <button
            onClick={() => setSelectedArticle(null)}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to all statements
          </button>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold text-[11px]">
                {selectedArticle.category}
              </span>
              <span className={theme === 'dark' ? 'text-neutral-600' : 'text-slate-400'}>·</span>
              <span className={theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}>{selectedArticle.readTime}</span>
              <span className={theme === 'dark' ? 'text-neutral-600' : 'text-slate-400'}>·</span>
              <span className={theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}>{selectedArticle.date}</span>
            </div>
            <h2 className={`text-2xl sm:text-4xl font-black font-display leading-tight ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              {selectedArticle.title}
            </h2>
            <div className={`text-xs font-semibold ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}`}>
              By {selectedArticle.author} · Official Campaign Dispatch
            </div>
          </div>

          <div className={`border-t pt-6 text-sm sm:text-base leading-relaxed space-y-4 ${
            theme === 'dark' ? 'border-neutral-800 text-neutral-300' : 'border-emerald-100 text-slate-700'
          }`}>
            <p className="text-lg font-semibold text-emerald-500">
              {selectedArticle.summary}
            </p>
            <p>{selectedArticle.content}</p>
            <p>
              The movement urges all supporters across the 36 states and the Federal Capital Territory to continue peaceful door-to-door voter engagement, PVC collection campaigns, and participation in upcoming grassroots assemblies.
            </p>
          </div>
        </div>
      ) : (
        /* News Grid with card-focus-group: hover pops out card and blurs rest */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 card-focus-group">
          {filteredNews.map((item) => (
            <article
              key={item.id}
              className={`border rounded-2xl p-6 flex flex-col justify-between space-y-6 transition-all cursor-pointer group hover:shadow-lg ${
                theme === 'dark'
                  ? 'bg-neutral-900 border-neutral-800 hover:border-emerald-500/40 text-neutral-100'
                  : 'bg-white border-emerald-100 hover:border-emerald-300 shadow-sm text-slate-800'
              }`}
              onClick={() => setSelectedArticle(item)}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold text-[11px]">
                    {item.category}
                  </span>
                  <span className={`text-[11px] font-mono ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-400'}`}>
                    {item.readTime}
                  </span>
                </div>

                <h2 className={`text-base font-bold font-display leading-snug group-hover:text-emerald-500 transition-colors ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  {item.title}
                </h2>

                <p className={`text-xs leading-relaxed line-clamp-3 ${
                  theme === 'dark' ? 'text-neutral-400' : 'text-slate-600'
                }`}>
                  {item.summary}
                </p>
              </div>

              <div className={`pt-4 border-t flex items-center justify-between text-xs ${
                theme === 'dark' ? 'border-neutral-800 text-neutral-400' : 'border-emerald-100 text-slate-500'
              }`}>
                <span>{item.date}</span>
                <span className="font-semibold text-emerald-500 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Dispatch <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
