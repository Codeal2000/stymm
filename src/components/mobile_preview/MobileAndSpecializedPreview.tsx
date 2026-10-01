import React, { useState } from 'react';
import { Smartphone, Globe2, School, Sparkles, Radio, HeartHandshake, Newspaper, CheckCircle2, Check } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const MobileAndSpecializedPreview: React.FC = () => {
  const { theme } = useTheme();
  const [activeMobileTab, setActiveMobileTab] = useState<'home' | 'canvass' | 'events' | 'content' | 'profile'>('home');
  const [activeSpecialPortal, setActiveSpecialPortal] = useState<'campus' | 'diaspora' | 'influencer' | 'media' | 'partner' | 'ussd'>('campus');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const specialPortals = [
    {
      id: 'campus' as const,
      title: 'Campus Chapter Portal',
      icon: School,
      tagline: 'Mobilizing over 250 Tertiary Campuses across Nigeria',
      features: ['Student Union Government (SUG) Liaisons', 'Campus Hostel Canvassing Squads', 'Inter-University Debates & Tech Hackathons'],
    },
    {
      id: 'diaspora' as const,
      title: 'Diaspora Adoption Hub',
      icon: Globe2,
      tagline: 'Connecting Nigerian youth in UK, US, Canada & UAE to Homeland Democracy',
      features: ['Sponsor A Polling Unit with Foreign Remittance', 'Diaspora Policy Advisory Council', 'Virtual Townhalls with Candidate'],
    },
    {
      id: 'influencer' as const,
      title: 'Influencer & Creative Guild',
      icon: Sparkles,
      tagline: 'Empowering 5,000+ Nigerian Creative Content Creators & Ambassadors',
      features: ['Unique Trackable Share Links', 'High-Definition Brand Toolkits & Visual Assets', 'Campaign Music & Video Licensing'],
    },
    {
      id: 'media' as const,
      title: 'Media & Press Bureau',
      icon: Newspaper,
      tagline: 'Accredited Journalist Hub & Live Broadcast Wire',
      features: ['Press Pass Verification System', 'Downloadable 4K Video Briefings & Quotes', 'Direct Hotline to National Campaign Spokesperson'],
    },
    {
      id: 'partner' as const,
      title: 'Strategic Partner Guilds',
      icon: HeartHandshake,
      tagline: 'Transport Unions, Market Associations & Artisan Coalitions',
      features: ['Transport Workers Election Day Logistics Network', 'Market Women Financial Literacy Caravans', 'Artisan Guild Tool Grants'],
    },
    {
      id: 'ussd' as const,
      title: 'USSD & Offline IVR Engine (*384*774#)',
      icon: Radio,
      tagline: 'Zero-Data Voter Information for Basic Feature Phones',
      features: ['*384*774# Polling Unit Locator', 'Voice Prompts in Yoruba, Hausa, Igbo & Pidgin', 'SMS Polling Unit Verification Slips'],
    },
  ];

  const currentSpecial = specialPortals.find((p) => p.id === activeSpecialPortal) || specialPortals[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {toastMessage && (
        <div className="p-3 bg-emerald-600 text-white rounded-xl text-xs font-semibold flex items-center justify-between shadow-lg animate-fadeIn">
          <span>{toastMessage}</span>
          <Check className="w-4 h-4" />
        </div>
      )}

      {/* Pitch Header */}
      <div className={`border rounded-3xl p-6 sm:p-8 space-y-3 transition-all shadow-lg ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-emerald-950 via-neutral-900 to-black border-emerald-900/60 text-white'
          : 'bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-900 border-emerald-600 text-white'
      }`}>
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-200 uppercase tracking-widest">
          <Sparkles className="w-4 h-4" />
          <span>Executive Phase 2 Roadmap & Specialized Verticals</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
          Mobile App & Specialized Verticals Showcase
        </h1>
        <p className="text-xs sm:text-sm text-emerald-100/90 max-w-3xl leading-relaxed">
          Here is the live interactive prototype of the dedicated <strong>Native Mobile App</strong> and the <strong>6 Specialized Campaign Portals</strong>. This provides your team with the full enterprise vision to present and monetize upon project endorsement.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Interactive Smartphone Mockup */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5 ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}>
            <Smartphone className="w-4 h-4 text-emerald-600" />
            <span>Interactive Mobile App Simulator</span>
          </div>

          {/* Smartphone Frame */}
          <div className="w-[310px] sm:w-[340px] h-[640px] bg-black rounded-[44px] p-3 border-4 border-neutral-700 shadow-2xl relative flex flex-col justify-between overflow-hidden">
            {/* Top speaker notch */}
            <div className="w-28 h-4 bg-neutral-800 rounded-b-xl mx-auto absolute top-0 left-1/2 -translate-x-1/2 z-30" />

            {/* Phone Screen */}
            <div className="w-full h-full bg-neutral-900 rounded-[34px] overflow-hidden flex flex-col justify-between pt-6 relative border border-neutral-800">
              {/* Mini App Header */}
              <div className="px-4 py-2 bg-black/80 border-b border-neutral-800 flex items-center justify-between text-xs text-white">
                <span className="font-bold font-display text-emerald-400">STYMM MOBILE</span>
                <span className="text-[10px] font-mono text-slate-400">LAGOS WARD 01</span>
              </div>

              {/* Dynamic Tab Body */}
              <div className="flex-1 p-4 overflow-y-auto text-xs space-y-3">
                {activeMobileTab === 'home' && (
                  <div className="space-y-3">
                    <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded-xl space-y-1">
                      <span className="text-[10px] text-emerald-300 uppercase font-semibold">Today&apos;s Field Target</span>
                      <div className="text-base font-bold text-white">Reach 15 Voters</div>
                      <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden mt-1">
                        <div className="h-full bg-emerald-400 w-2/3" />
                      </div>
                      <span className="text-[10px] text-slate-400 block pt-1">10 of 15 doors knocked today</span>
                    </div>

                    <div className="p-3 bg-black rounded-xl border border-neutral-800 space-y-1">
                      <span className="font-bold text-white block">Next Ward Rally</span>
                      <p className="text-[11px] text-slate-400">Saturday @ Onikan Stadium. Free bus leaves ward office 07:00 AM.</p>
                    </div>

                    <div className="p-3 bg-black rounded-xl border border-neutral-800 space-y-1">
                      <span className="font-bold text-white block">Quick PVC Helper</span>
                      <p className="text-[11px] text-slate-400">Verify voter polling unit in 5 seconds.</p>
                    </div>
                  </div>
                )}

                {activeMobileTab === 'canvass' && (
                  <div className="space-y-3">
                    <div className="font-bold text-white text-sm">1-Tap Canvass Entry</div>
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Voter Name"
                        className="w-full px-2.5 py-1.5 bg-black border border-neutral-800 rounded text-[11px] text-white"
                        defaultValue="Babatunde"
                      />
                      <select className="w-full px-2.5 py-1.5 bg-black border border-neutral-800 rounded text-[11px] text-white">
                        <option>Supportive (Pledged)</option>
                        <option>Undecided</option>
                      </select>
                      <button
                        onClick={() => showToast("Simulated: Voter logged into cloud database!")}
                        className="w-full py-2 bg-emerald-400 text-black font-bold rounded text-xs"
                      >
                        Quick Save To Ward Radar
                      </button>
                    </div>
                  </div>
                )}

                {activeMobileTab === 'events' && (
                  <div className="space-y-2">
                    <span className="font-bold text-white">Upcoming Events</span>
                    <div className="p-2.5 bg-black rounded-lg border border-neutral-800">
                      <div className="text-emerald-400 font-bold text-[11px]">Youth Mega Rally</div>
                      <div className="text-[10px] text-slate-400">12 Oct · Onikan Arena</div>
                    </div>
                    <div className="p-2.5 bg-black rounded-lg border border-neutral-800">
                      <div className="text-emerald-400 font-bold text-[11px]">PU Agents Masterclass</div>
                      <div className="text-[10px] text-slate-400">15 Oct · ICC Abuja</div>
                    </div>
                  </div>
                )}

                {activeMobileTab === 'content' && (
                  <div className="space-y-2">
                    <span className="font-bold text-white">1-Click WhatsApp Posts</span>
                    <div className="p-2.5 bg-black rounded border border-neutral-800 space-y-1">
                      <div className="font-semibold text-white text-[11px]">Manifesto Infographic</div>
                      <button
                        onClick={() => showToast("Simulated: WhatsApp opened with attached image & text!")}
                        className="w-full py-1 bg-emerald-500 text-black font-bold rounded text-[10px]"
                      >
                        Share to WhatsApp
                      </button>
                    </div>
                  </div>
                )}

                {activeMobileTab === 'profile' && (
                  <div className="space-y-2 text-center">
                    <div className="w-14 h-14 rounded-full bg-emerald-950 border border-emerald-500 mx-auto flex items-center justify-center text-emerald-400 font-bold text-sm">
                      KB
                    </div>
                    <div className="font-bold text-white">Kehinde Balogun</div>
                    <div className="text-[10px] text-emerald-400 font-mono">Agent #4429 · Lagos</div>
                    <div className="p-2 bg-black rounded border border-neutral-800 text-[10px] text-slate-400">
                      INEC Verified Canvasser Pass
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Phone Navigation Bar */}
              <div className="bg-black border-t border-neutral-800 grid grid-cols-5 p-1 text-[10px] text-slate-400 text-center">
                <button
                  onClick={() => setActiveMobileTab('home')}
                  className={`py-1.5 ${activeMobileTab === 'home' ? 'text-emerald-400 font-bold' : ''}`}
                >
                  Home
                </button>
                <button
                  onClick={() => setActiveMobileTab('canvass')}
                  className={`py-1.5 ${activeMobileTab === 'canvass' ? 'text-emerald-400 font-bold' : ''}`}
                >
                  Canvass
                </button>
                <button
                  onClick={() => setActiveMobileTab('events')}
                  className={`py-1.5 ${activeMobileTab === 'events' ? 'text-emerald-400 font-bold' : ''}`}
                >
                  Events
                </button>
                <button
                  onClick={() => setActiveMobileTab('content')}
                  className={`py-1.5 ${activeMobileTab === 'content' ? 'text-emerald-400 font-bold' : ''}`}
                >
                  Media
                </button>
                <button
                  onClick={() => setActiveMobileTab('profile')}
                  className={`py-1.5 ${activeMobileTab === 'profile' ? 'text-emerald-400 font-bold' : ''}`}
                >
                  Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Specialized Portals Suite */}
        <div className="lg:col-span-7 space-y-6">
          <div className={`text-xs font-bold uppercase tracking-wider ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}>
            6 Specialized Portals Suite
          </div>

          {/* Portal Selector Cards with card-focus-group */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 card-focus-group">
            {specialPortals.map((p) => {
              const Icon = p.icon;
              const isSelected = activeSpecialPortal === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveSpecialPortal(p.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? theme === 'dark'
                        ? 'bg-neutral-900 border-emerald-500 shadow-md'
                        : 'bg-emerald-50/80 border-emerald-600 text-emerald-950 shadow-md ring-2 ring-emerald-500/20'
                      : theme === 'dark'
                      ? 'bg-black/70 border-neutral-800 hover:bg-neutral-900'
                      : 'bg-white border-emerald-100 text-neutral-700 hover:border-emerald-300 shadow-sm'
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-1.5 ${isSelected ? 'text-emerald-600' : theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`} />
                  <div className={`text-xs font-bold truncate ${
                    isSelected ? (theme === 'dark' ? 'text-white' : 'text-emerald-950') : (theme === 'dark' ? 'text-white' : 'text-neutral-900')
                  }`}>
                    {p.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Portal Detail & Pitch Presentation */}
          <div className={`border rounded-2xl p-6 sm:p-8 space-y-6 transition-all shadow-sm ${
            theme === 'dark' ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-emerald-100'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center font-bold">
                <currentSpecial.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className={`text-xl font-bold font-display ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                  {currentSpecial.title}
                </h3>
                <p className="text-xs text-emerald-600 font-semibold">{currentSpecial.tagline}</p>
              </div>
            </div>

            <div className={`space-y-3 pt-2 border-t text-xs ${theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'}`}>
              <h4 className={`font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                Key Specialized Capabilities:
              </h4>
              <ul className="space-y-2">
                {currentSpecial.features.map((feat, idx) => (
                  <li 
                    key={idx} 
                    className={`flex items-center gap-2.5 p-3 rounded-xl border ${
                      theme === 'dark'
                        ? 'bg-black border-neutral-800/80 text-slate-300'
                        : 'bg-emerald-50/40 border-emerald-100 text-neutral-700'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`p-4 rounded-xl text-xs flex items-center justify-between gap-4 border ${
              theme === 'dark'
                ? 'bg-emerald-950/40 border-emerald-800/80 text-slate-300'
                : 'bg-emerald-50 border-emerald-200 text-emerald-950'
            }`}>
              <div>
                <span className="font-bold block">Phase 2 Production Implementation Ready</span>
                <span className={`text-[11px] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  Can be deployed directly with dedicated subdomains (e.g. campus.stymm.ng, diaspora.stymm.ng).
                </span>
              </div>
              <button
                onClick={() => showToast(`Activated preview scope for: ${currentSpecial.title}`)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-all shadow-sm shrink-0"
              >
                Launch Live Mock
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
