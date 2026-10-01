import React from 'react';
import { ShieldCheck, Users, Target } from 'lucide-react';
import { STATES_AND_LGAS } from '../../data/campaignData';
import { useTheme } from '../../context/ThemeContext';

export const PublicMovement: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className={`border-b pb-8 space-y-3 ${theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'}`}>
        <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
          Organizational Architecture
        </div>
        <h1 className={`text-3xl sm:text-5xl font-extrabold font-display ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
          The STYMM Movement
        </h1>
        <p className={`text-base max-w-3xl ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-600'}`}>
          A disciplined, decentralized democratic network built from the ground up: from the polling unit to the national headquarters.
        </p>
      </div>

      {/* Movement Structure Pillars with card-focus-group */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 card-focus-group">
        <div className={`rounded-2xl p-6 space-y-4 border transition-all cursor-pointer ${
          theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-neutral-300' : 'bg-white border-emerald-100 text-slate-700 shadow-sm'
        }`}>
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
            <Target className="w-5 h-5" />
          </div>
          <h3 className={`text-lg font-bold font-display ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
            1. Polling Unit Primacy
          </h3>
          <p className="text-xs leading-relaxed opacity-90">
            All political outcomes are decided in the 176,846 Polling Units across Nigeria. STYMM assigns verified youth captains and accredited agents to every single voting point.
          </p>
        </div>

        <div className={`rounded-2xl p-6 space-y-4 border transition-all cursor-pointer ${
          theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-neutral-300' : 'bg-white border-emerald-100 text-slate-700 shadow-sm'
        }`}>
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <h3 className={`text-lg font-bold font-display ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
            2. Decentralized Command
          </h3>
          <p className="text-xs leading-relaxed opacity-90">
            From National Coordinators to 36 State Directors, 774 LGA leaders, and 8,812 Ward Captains, leadership is transparent, accountable, and driven by merit.
          </p>
        </div>

        <div className={`rounded-2xl p-6 space-y-4 border transition-all cursor-pointer ${
          theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-neutral-300' : 'bg-white border-emerald-100 text-slate-700 shadow-sm'
        }`}>
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className={`text-lg font-bold font-display ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
            3. Non-Violent Civic Code
          </h3>
          <p className="text-xs leading-relaxed opacity-90">
            Every STYMM member pledges absolute non-violence, civic decorum, voter dignity, and compliance with the 2022 Electoral Act and Constitution of Nigeria.
          </p>
        </div>
      </div>

      {/* 36 States Mobilization Status Grid with card-focus-group */}
      <div className="space-y-6">
        <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-4 ${
          theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'
        }`}>
          <div>
            <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
              Nationwide Footprint
            </div>
            <h2 className={`text-2xl font-bold font-display ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
              State Mobilization Coverage
            </h2>
          </div>
          <div className="text-xs font-mono text-emerald-500 font-bold">
            36 States + Federal Capital Territory
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 card-focus-group">
          {STATES_AND_LGAS.map((st) => (
            <div
              key={st.name}
              className={`rounded-xl p-4 space-y-3 border transition-all cursor-pointer ${
                theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-emerald-100 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-bold text-sm ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {st.name} State
                </span>
                <span className="text-xs font-mono text-emerald-500 font-bold">
                  {st.coveragePercentage}%
                </span>
              </div>

              {/* Progress bar */}
              <div className={`w-full h-2 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-neutral-800' : 'bg-emerald-50'}`}>
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${st.coveragePercentage}%` }}
                />
              </div>

              <div className="text-xs flex items-center justify-between pt-1">
                <span className={theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}>Target Voters:</span>
                <span className={`font-mono font-bold ${theme === 'dark' ? 'text-neutral-200' : 'text-slate-800'}`}>
                  {st.targetVoters}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The 5 Wings of STYMM with card-focus-group */}
      <div className={`rounded-2xl p-8 space-y-6 border ${
        theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-emerald-50/60 border-emerald-200'
      }`}>
        <h3 className={`text-xl font-bold font-display ${theme === 'dark' ? 'text-white' : 'text-emerald-950'}`}>
          The Five Operational Wings of STYMM
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-xs card-focus-group">
          {[
            { title: "Campus Vanguard", desc: "Student leaders in over 250 federal, state, and private tertiary institutions." },
            { title: "Artisans & Guilds", desc: "Technicians, tailors, transport unions, and grassroots trade associations." },
            { title: "Tech & Creative Guild", desc: "Software developers, digital creators, content producers, and filmmakers." },
            { title: "Women Mobilizers", desc: "Dedicated female organizers focusing on market women, young mothers, and women in business." },
            { title: "Diaspora Network", desc: "Global chapters in UK, US, Canada, UAE providing advisory and PU adoption support." },
          ].map((wing, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl space-y-2 border transition-all cursor-pointer ${
                theme === 'dark' ? 'bg-black border-neutral-800 text-neutral-300' : 'bg-white border-emerald-100 text-slate-700 shadow-sm'
              }`}
            >
              <h4 className={`font-bold font-display ${theme === 'dark' ? 'text-white' : 'text-emerald-950'}`}>
                {wing.title}
              </h4>
              <p className={`leading-relaxed text-[11px] ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-600'}`}>
                {wing.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
