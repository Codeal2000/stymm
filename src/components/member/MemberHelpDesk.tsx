import React, { useState } from 'react';
import { CAMPAIGN_FIELD_FAQ } from '../../data/campaignData';
import { useTheme } from '../../context/ThemeContext';
import { HelpCircle, Search, ChevronDown, PhoneCall, BookOpen, CheckCircle2 } from 'lucide-react';

export const MemberHelpDesk: React.FC = () => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const filteredFaqs = CAMPAIGN_FIELD_FAQ.filter((item) => {
    const q = item.question.toLowerCase();
    const a = item.answer.toLowerCase();
    const s = searchTerm.toLowerCase();
    return q.includes(s) || a.includes(s) || item.keywords.some((k) => k.includes(s));
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`border-b pb-4 space-y-2 transition-colors ${
        theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'
      }`}>
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-widest">
          <BookOpen className="w-4 h-4" />
          <span>Canvasser Knowledge Bureau</span>
        </div>
        <h1 className={`text-2xl sm:text-3xl font-extrabold font-display transition-colors ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>
          Campaign Help Desk & Field FAQ
        </h1>
        <p className={`text-xs max-w-3xl leading-relaxed ${
          theme === 'dark' ? 'text-neutral-400' : 'text-slate-600'
        }`}>
          Essential talking points, verified electoral answers, and tactical field guidance for door-to-door canvassers and ward coordinators.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-lg">
        <Search className={`w-4 h-4 absolute left-3.5 top-3 ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}`} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search question, policy, or INEC guideline..."
          className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-xs transition-colors focus:outline-none ${
            theme === 'dark'
              ? 'bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500 focus:border-emerald-500'
              : 'bg-white border-emerald-200 text-slate-900 placeholder-slate-400 focus:border-emerald-600 shadow-sm'
          }`}
        />
      </div>

      {/* Accordion FAQ List with card-focus-group */}
      <div className="space-y-3 card-focus-group">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openFaqIndex === idx;
          return (
            <div
              key={idx}
              className={`border rounded-2xl overflow-hidden transition-all shadow-sm cursor-pointer ${
                theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-emerald-100'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                className={`w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm transition-colors ${
                  isOpen
                    ? theme === 'dark' ? 'bg-black text-emerald-400' : 'bg-emerald-50/50 text-emerald-900'
                    : theme === 'dark' ? 'text-white hover:bg-black/40' : 'text-slate-900 hover:bg-emerald-50/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-emerald-600/10 text-emerald-500 flex items-center justify-center font-bold text-xs shrink-0">
                    {idx + 1}
                  </span>
                  <span>{faq.question}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-emerald-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className={`p-4 sm:p-5 pt-0 text-xs leading-relaxed whitespace-pre-line border-t ${
                  theme === 'dark'
                    ? 'text-neutral-300 border-neutral-800 bg-black/60'
                    : 'text-slate-700 border-emerald-50 bg-white'
                }`}>
                  <p className="mt-3">{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Direct Ward Support Box */}
      <div className={`p-5 border rounded-2xl text-xs flex flex-col sm:flex-row items-center justify-between gap-4 transition-all ${
        theme === 'dark'
          ? 'bg-neutral-900 border-neutral-800 text-neutral-300'
          : 'bg-emerald-50 border-emerald-200 text-emerald-950'
      }`}>
        <div className="space-y-1">
          <div className="font-bold text-sm flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-emerald-500" />
            <span>Need Immediate On-Ground Escalation?</span>
          </div>
          <p className={theme === 'dark' ? 'text-neutral-400' : 'text-slate-600'}>
            Call the STYMM Ward Liaison Desk at <strong>0800-STYMM-2026</strong> or reach your LGA Coordinator via the Ward Radar.
          </p>
        </div>
        <div className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold whitespace-nowrap shadow-sm">
          24/7 Field Dispatch
        </div>
      </div>
    </div>
  );
};
