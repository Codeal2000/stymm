import React from 'react';
import { MemberNav } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { Users, Target, Award, ShieldCheck, Plus, Sparkles, MessageSquare, ArrowRight, BarChart3 } from 'lucide-react';
import { INITIAL_CANVASS_RECORDS } from '../../data/campaignData';
import { MemberCanvassingAnalytics } from './MemberCanvassingAnalytics';

interface MemberDashboardProps {
  onSelectMemberNav: (nav: MemberNav) => void;
  canvassCount: number;
}

export const MemberDashboard: React.FC<MemberDashboardProps> = ({ onSelectMemberNav, canvassCount }) => {
  const { theme } = useTheme();

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner */}
      <div className={`relative rounded-3xl border p-6 sm:p-8 overflow-hidden shadow-lg transition-all ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-emerald-950 via-neutral-900 to-black border-emerald-900/60 text-white'
          : 'bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-900 border-emerald-600 text-white'
      }`}>
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-200">
            <span>CANVASSER AGENT ID: #4429</span>
            <span aria-hidden="true">·</span>
            <span>LAGOS STATE / IKEJA / WARD 01</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Welcome back, Comrade Kehinde Balogun
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl leading-relaxed">
            Your ward is currently at <strong>78% voter outreach target</strong>. 45 polling units in Ikeja are accredited with certified STYMM canvassers.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelectMemberNav('canvassing')}
              className="px-4 py-2.5 bg-white text-emerald-950 hover:bg-emerald-50 font-bold rounded-xl text-xs transition-all shadow-md flex items-center gap-1.5 active:scale-95"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-700" />
              <span>Log New Canvassed Voter</span>
            </button>

            <button
              onClick={() => onSelectMemberNav('adopt_pu')}
              className="px-4 py-2.5 bg-emerald-900/60 hover:bg-emerald-900/80 text-white border border-emerald-400/30 font-semibold rounded-xl text-xs transition-all"
            >
              Adopt a Polling Unit
            </button>

            <button
              onClick={() => onSelectMemberNav('helpdesk')}
              className="px-4 py-2.5 bg-emerald-950/70 hover:bg-emerald-950 text-emerald-200 border border-emerald-500/40 rounded-xl text-xs transition-all flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>Canvasser Field FAQ & Guide</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary KPI Metrics with card-focus-group */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 card-focus-group">
        <div className={`border rounded-2xl p-5 space-y-2 transition-all cursor-pointer ${
          theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-emerald-100 shadow-sm'
        }`}>
          <div className={`flex items-center justify-between text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}`}>
            <span>Voters Canvassed by You</span>
            <Users className="w-4 h-4 text-emerald-500" />
          </div>
          <div className={`text-2xl font-extrabold font-mono tabular-nums ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            {canvassCount}
          </div>
          <div className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1">
            <span>+12 logged this week</span>
          </div>
        </div>

        <div className={`border rounded-2xl p-5 space-y-2 transition-all cursor-pointer ${
          theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-emerald-100 shadow-sm'
        }`}>
          <div className={`flex items-center justify-between text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}`}>
            <span>Ward Mobilization Target</span>
            <Target className="w-4 h-4 text-emerald-500" />
          </div>
          <div className={`text-2xl font-extrabold font-mono tabular-nums ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            78.4%
          </div>
          <div className={`text-[11px] ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}`}>
            <span>512 of 650 voters pledged</span>
          </div>
        </div>

        <div className={`border rounded-2xl p-5 space-y-2 transition-all cursor-pointer ${
          theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-emerald-100 shadow-sm'
        }`}>
          <div className={`flex items-center justify-between text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}`}>
            <span>Polling Units Covered</span>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className={`text-2xl font-extrabold font-mono tabular-nums ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            18 / 22
          </div>
          <div className={`text-[11px] ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}`}>
            <span>4 PUs still need adoption</span>
          </div>
        </div>

        <div className={`border rounded-2xl p-5 space-y-2 transition-all cursor-pointer ${
          theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-emerald-100 shadow-sm'
        }`}>
          <div className={`flex items-center justify-between text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}`}>
            <span>Canvasser Rank</span>
            <Award className="w-4 h-4 text-emerald-500" />
          </div>
          <div className={`text-2xl font-extrabold font-mono tabular-nums ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Tier 1
          </div>
          <div className="text-[11px] text-emerald-500 font-semibold">
            <span>Master Canvasser Badge</span>
          </div>
        </div>
      </div>

      {/* Member Personal Canvassing Analytics (Recharts Data Visualization) */}
      <MemberCanvassingAnalytics
        canvassCount={canvassCount}
        onLogNewCanvass={() => onSelectMemberNav('canvassing')}
      />

      {/* Middle Row: Recent Canvassing Log & Fast Operations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Voter Logs */}
        <div className={`lg:col-span-7 border rounded-2xl p-6 space-y-4 transition-all shadow-sm ${
          theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-emerald-100'
        }`}>
          <div className={`flex items-center justify-between border-b pb-3 ${
            theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'
          }`}>
            <div>
              <h2 className={`text-base font-bold font-display ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Recent Field Canvassing Dispatches
              </h2>
              <p className={`text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}`}>
                Last door-to-door interactions recorded in your ward
              </p>
            </div>
            <button
              onClick={() => onSelectMemberNav('canvassing')}
              className="text-xs text-emerald-500 hover:text-emerald-400 font-bold flex items-center gap-1"
            >
              View Full Log <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {INITIAL_CANVASS_RECORDS.slice(0, 3).map((item) => (
              <div 
                key={item.id} 
                className={`p-3.5 rounded-xl border space-y-1.5 text-xs transition-colors ${
                  theme === 'dark' 
                    ? 'bg-black border-neutral-800' 
                    : 'bg-emerald-50/40 border-emerald-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-bold text-sm ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {item.voterName}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    {item.supportSentiment}
                  </span>
                </div>
                <div className={`flex items-center gap-3 text-[11px] ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}`}>
                  <span>{item.pu}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-500 font-semibold">{item.pvcStatus}</span>
                </div>
                <p className={`text-[11px] italic ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-600'}`}>
                  &ldquo;{item.notes}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Shortcuts & Ward Radar */}
        <div className="lg:col-span-5 space-y-4">
          <div className={`border rounded-2xl p-6 space-y-4 transition-all shadow-sm ${
            theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-emerald-100'
          }`}>
            <h2 className={`text-base font-bold font-display ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Fast Operations
            </h2>
            <div className="space-y-2 card-focus-group">
              <button
                onClick={() => onSelectMemberNav('training')}
                className={`w-full p-3.5 border rounded-xl text-left flex items-center justify-between group text-xs transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-black border-neutral-800 text-neutral-200 hover:border-emerald-500'
                    : 'bg-emerald-50/40 hover:bg-emerald-50 border-emerald-100 text-slate-800'
                }`}
              >
                <div>
                  <span className={`font-bold block ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    Training Academy
                  </span>
                  <span className={`text-[11px] ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}`}>
                    Complete &quot;Mastering Form EC8A&quot;
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-500 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onSelectMemberNav('content')}
                className={`w-full p-3.5 border rounded-xl text-left flex items-center justify-between group text-xs transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-black border-neutral-800 text-neutral-200 hover:border-emerald-500'
                    : 'bg-emerald-50/40 hover:bg-emerald-50 border-emerald-100 text-slate-800'
                }`}
              >
                <div>
                  <span className={`font-bold block ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    Content & WhatsApp Media
                  </span>
                  <span className={`text-[11px] ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}`}>
                    Download latest infographics & stickers
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-500 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onSelectMemberNav('surveys')}
                className={`w-full p-3.5 border rounded-xl text-left flex items-center justify-between group text-xs transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-black border-neutral-800 text-neutral-200 hover:border-emerald-500'
                    : 'bg-emerald-50/40 hover:bg-emerald-50 border-emerald-100 text-slate-800'
                }`}
              >
                <div>
                  <span className={`font-bold block ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    Voter Sentiment Survey
                  </span>
                  <span className={`text-[11px] ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}`}>
                    Submit ward economic feedback
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-500 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Quick Notice */}
          <div className={`border rounded-2xl p-5 space-y-2 text-xs transition-all ${
            theme === 'dark'
              ? 'bg-neutral-900 border-neutral-800 text-neutral-300'
              : 'bg-emerald-50 border-emerald-200 text-emerald-950'
          }`}>
            <div className="flex items-center gap-1.5 text-emerald-500 font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Next Ward Assembly</span>
            </div>
            <p className={theme === 'dark' ? 'text-neutral-300' : 'text-emerald-900/80'}>
              Thursday, 15 October · 05:00 PM at Alausa Community Centre. Collection of canvassing reflective bibs and BVAS refresher manuals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
