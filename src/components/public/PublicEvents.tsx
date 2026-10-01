import React, { useState } from 'react';
import { CAMPAIGN_EVENTS } from '../../data/campaignData';
import { EventItem } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { Calendar, MapPin, Clock, Users, Check } from 'lucide-react';

export const PublicEvents: React.FC = () => {
  const { theme } = useTheme();
  const [events, setEvents] = useState<EventItem[]>(CAMPAIGN_EVENTS);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const categories = ['All', 'Rally', 'Town Hall', 'Youth Summit', 'Canvassing Drive'];

  const toggleRsvp = (id: string) => {
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id === id) {
          const nextRsvp = !ev.isRsvp;
          return {
            ...ev,
            isRsvp: nextRsvp,
            attendeesCount: nextRsvp ? ev.attendeesCount + 1 : ev.attendeesCount - 1,
          };
        }
        return ev;
      })
    );
  };

  const filtered = events.filter((ev) =>
    selectedFilter === 'All' ? true : ev.category === selectedFilter
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className={`border-b pb-8 space-y-3 transition-colors ${
        theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'
      }`}>
        <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
          Campaign Train Schedule
        </div>
        <h1 className={`text-3xl sm:text-5xl font-extrabold font-display transition-colors ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>
          Rallies, Town Halls & Mobilization
        </h1>
        <p className={`text-base max-w-3xl leading-relaxed ${
          theme === 'dark' ? 'text-neutral-300' : 'text-slate-600'
        }`}>
          Meet the candidate, connect with fellow grassroots canvassers, and participate in historic youth solidarity gatherings across the federation.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className={`flex items-center gap-1 p-1 border rounded-xl overflow-x-auto w-full sm:w-auto transition-colors ${
        theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-emerald-100 shadow-sm'
      }`}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedFilter(cat)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              selectedFilter === cat
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

      {/* Events Grid with card-focus-group: hover pops out card and blurs rest */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 card-focus-group">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`border rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all cursor-pointer ${
              theme === 'dark'
                ? 'bg-neutral-900 border-neutral-800 hover:border-emerald-500/40 text-neutral-100'
                : 'bg-white border-emerald-100 hover:border-emerald-300 shadow-sm text-slate-800'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800/80">
                  {item.category}
                </span>
                <span className={`text-xs font-mono font-semibold ${
                  theme === 'dark' ? 'text-neutral-400' : 'text-emerald-800'
                }`}>
                  📍 {item.state} State
                </span>
              </div>

              <h2 className={`text-xl font-bold font-display ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                {item.title}
              </h2>

              <p className={`text-xs leading-relaxed ${
                theme === 'dark' ? 'text-neutral-400' : 'text-slate-600'
              }`}>
                {item.description}
              </p>

              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-3 border-t ${
                theme === 'dark' ? 'border-neutral-800 text-neutral-400' : 'border-emerald-100 text-slate-600'
              }`}>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="font-medium">{item.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="font-medium">{item.time}</span>
                </div>
                <div className="flex items-center gap-2 sm:col-span-2">
                  <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className={`font-semibold ${theme === 'dark' ? 'text-neutral-200' : 'text-slate-800'}`}>
                    {item.location}
                  </span>
                </div>
              </div>
            </div>

            <div className={`pt-4 border-t flex items-center justify-between ${
              theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'
            }`}>
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <Users className="w-3.5 h-3.5 text-emerald-500" />
                <span className={`tabular-nums font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  {item.attendeesCount.toLocaleString()}
                </span>
                <span className={theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}>Attending</span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleRsvp(item.id);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  item.isRsvp
                    ? 'bg-emerald-600 text-white shadow-md'
                    : theme === 'dark'
                    ? 'bg-neutral-800 text-white hover:bg-neutral-700 border border-neutral-700'
                    : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                }`}
              >
                {item.isRsvp ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Attending</span>
                  </>
                ) : (
                  <span>RSVP Free Seat</span>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
