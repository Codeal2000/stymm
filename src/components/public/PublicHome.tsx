import React from 'react';
import { CANDIDATE_INFO, CAMPAIGN_EVENTS, CAMPAIGN_NEWS } from '../../data/campaignData';
import { PublicNav, PortalSection } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { useCampaignMedia } from '../../context/CampaignMediaContext';
import { ArrowRight, CheckCircle2, ShieldCheck, MapPin, Sparkles } from 'lucide-react';

interface PublicHomeProps {
  onSelectNav: (nav: PublicNav) => void;
  onSelectPortal: (portal: PortalSection) => void;
}

export const PublicHome: React.FC<PublicHomeProps> = ({ onSelectNav, onSelectPortal }) => {
  const { theme } = useTheme();
  const { images } = useCampaignMedia();

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      {/* Hero Section */}
      <section className={`relative overflow-hidden border-b transition-colors duration-200 ${
        theme === 'dark'
          ? 'bg-black/80 border-neutral-800'
          : 'bg-gradient-to-b from-emerald-50/80 via-white to-white border-emerald-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Vision & Primary CTA */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border shadow-sm transition-colors duration-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className={theme === 'dark' ? 'text-emerald-400' : 'text-emerald-800'}>
                  Decentralized Youth Mobilization · 176,846 Polling Units
                </span>
              </div>

              <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight font-display text-balance ${
                theme === 'dark' ? 'text-white' : 'text-emerald-950'
              }`}>
                Empower The Youth. <br />
                <span className="text-emerald-500">Transform The Nation.</span>
              </h1>

              <p className={`text-base sm:text-lg leading-relaxed max-w-2xl ${
                theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'
              }`}>
                The Seyi Tinubu Youth Mobilization Movement (STYMM) is uniting energetic grassroots leaders, tech innovators, artisans, and students across Nigeria. We are building the strongest bottom-up democratic force in history.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onSelectNav('join')}
                  className="px-6 py-3.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl shadow-lg hover:shadow-emerald-600/30 transition-all flex items-center gap-2"
                >
                  <span>Join The Movement Today</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onSelectPortal('member')}
                  className={`px-6 py-3.5 text-sm font-semibold rounded-xl border transition-colors flex items-center gap-2 ${
                    theme === 'dark'
                      ? 'bg-neutral-900 hover:bg-neutral-800 text-white border-neutral-700'
                      : 'bg-white hover:bg-emerald-50 text-emerald-950 border-emerald-200 shadow-sm'
                  }`}
                >
                  <span>Enter Member & Canvasser Portal</span>
                </button>
              </div>

              {/* Quick Metrics Adjacency */}
              <div className={`pt-6 border-t grid grid-cols-3 gap-6 ${
                theme === 'dark' ? 'border-neutral-800 text-neutral-300' : 'border-emerald-100 text-slate-700'
              }`}>
                <div>
                  <div className={`text-2xl sm:text-3xl font-extrabold font-mono tabular-nums ${
                    theme === 'dark' ? 'text-white' : 'text-emerald-950'
                  }`}>
                    1.42M+
                  </div>
                  <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-600 font-medium'}`}>
                    Verified Youth Members
                  </div>
                </div>
                <div>
                  <div className={`text-2xl sm:text-3xl font-extrabold font-mono tabular-nums ${
                    theme === 'dark' ? 'text-white' : 'text-emerald-950'
                  }`}>
                    124,500+
                  </div>
                  <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-600 font-medium'}`}>
                    Active Ward Canvassers
                  </div>
                </div>
                <div>
                  <div className={`text-2xl sm:text-3xl font-extrabold font-mono tabular-nums ${
                    theme === 'dark' ? 'text-white' : 'text-emerald-950'
                  }`}>
                    94,200
                  </div>
                  <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-600 font-medium'}`}>
                    Polling Units Adopted
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Asset */}
            <div className="lg:col-span-5 relative">
              <div className={`relative rounded-2xl overflow-hidden border shadow-2xl group ${
                theme === 'dark' ? 'border-neutral-800 bg-neutral-900' : 'border-emerald-200 bg-emerald-50'
              }`}>
                <img
                  src={images.heroRally}
                  alt="Huge youth solidarity rally with green and white banners"
                  referrerPolicy="no-referrer"
                  className="w-full h-[380px] sm:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
                
                {/* Overlay Quote Box */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/90 backdrop-blur-md border border-neutral-700/80 text-xs text-neutral-200">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span>The Youth Mandate</span>
                  </div>
                  <p className="italic text-neutral-300">
                    &ldquo;Democracy begins at your doorstep and your Polling Unit. When youth take responsibility, the future answers.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Candidate Spotlight Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`rounded-2xl p-6 sm:p-10 lg:p-12 border transition-colors duration-200 ${
          theme === 'dark'
            ? 'bg-neutral-900/80 border-neutral-800 text-neutral-300'
            : 'bg-emerald-50/70 border-emerald-200 text-slate-800 shadow-sm'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Candidate Portrait */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className={`relative w-full max-w-sm aspect-[4/3] rounded-2xl overflow-hidden border shadow-2xl transition-all duration-300 ${
                theme === 'dark' ? 'border-neutral-700 bg-black' : 'border-emerald-300 bg-white'
              }`}>
                <img
                  src={images.candidate}
                  alt="Seyi Tinubu official portrait"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />

                {/* Presidential Movement Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/75 backdrop-blur-md text-emerald-400 border border-emerald-500/30 shadow-md">
                    National Convener
                  </span>
                </div>
              </div>
            </div>

            {/* Candidate Message */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                <span>Movement Leadership</span>
                <span aria-hidden="true">·</span>
                <span>The Visionary Convener</span>
              </div>

              <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display ${
                theme === 'dark' ? 'text-white' : 'text-emerald-950'
              }`}>
                {CANDIDATE_INFO.fullName}
              </h2>

              <p className={`text-sm sm:text-base leading-relaxed ${
                theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'
              }`}>
                As a serial entrepreneur, philanthropist, and advocate for civic technology, Seyi Tinubu has consistently invested in the enterprise, capacity, and creative talents of Nigerian youth. STYMM was established not as a passive cheerleading club, but as an operational locomotive that mobilizes young Nigerians to participate actively in democratic governance.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Direct Youth Investment Funds</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>36 States Decentralized Command</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Grassroots Polling Unit Adoption</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Digital Academy & Skills Certification</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onSelectNav('about')}
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1.5 transition-colors"
                >
                  <span>Read Full Leadership Biography & Manifesto</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Candid Conversation & "Why So Serious?" Leadership Feature */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`rounded-3xl p-6 sm:p-10 lg:p-12 border shadow-2xl relative overflow-hidden transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-neutral-900 via-black to-neutral-950 border-neutral-800 text-white'
            : 'bg-gradient-to-br from-white via-emerald-50/40 to-emerald-100/30 border-emerald-200 text-slate-900'
        }`}>
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Column: Vision & Practical Leadership Callout */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Candid Conversation
                </span>
                <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${
                  theme === 'dark' ? 'bg-neutral-800 text-neutral-300 border-neutral-700' : 'bg-emerald-100 text-emerald-900 border-emerald-200'
                }`}>
                  The &ldquo;Why So Serious?&rdquo; Philosophy
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display tracking-tight text-balance">
                &ldquo;Democracy begins when youth bring passion, joy, and fearless energy to the table.&rdquo;
              </h2>

              <p className={`text-sm sm:text-base leading-relaxed ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'}`}>
                In this candid interview session, Seyi Tinubu speaks on breaking free from cynical, backroom politics. Wearing his signature cap and speaking openly with Nigerian youth leaders, he unpacks why grassroots civic engagement shouldn&rsquo;t be intimidating — it is an active celebration of our generation&rsquo;s future.
              </p>

              {/* Three Insight Callouts */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className={`p-3.5 rounded-xl border text-xs ${
                  theme === 'dark' ? 'bg-neutral-900/80 border-neutral-800' : 'bg-white border-emerald-100 shadow-sm'
                }`}>
                  <div className="font-bold text-emerald-500 mb-1">01 · Bold Directness</div>
                  <div className="text-[11px] text-neutral-400">Tackling youth unemployment through venture capital, not empty rhetoric.</div>
                </div>

                <div className={`p-3.5 rounded-xl border text-xs ${
                  theme === 'dark' ? 'bg-neutral-900/80 border-neutral-800' : 'bg-white border-emerald-100 shadow-sm'
                }`}>
                  <div className="font-bold text-emerald-500 mb-1">02 · Grassroots First</div>
                  <div className="text-[11px] text-neutral-400">Ownership in all 176,846 Polling Units nationwide.</div>
                </div>

                <div className={`p-3.5 rounded-xl border text-xs ${
                  theme === 'dark' ? 'bg-neutral-900/80 border-neutral-800' : 'bg-white border-emerald-100 shadow-sm'
                }`}>
                  <div className="font-bold text-emerald-500 mb-1">03 · Digital Generation</div>
                  <div className="text-[11px] text-neutral-400">Civic tech monitoring and open volunteer transparency.</div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onSelectNav('movement')}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <span>Explore Movement Structure</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onSelectNav('about')}
                  className={`px-4 py-2.5 rounded-xl border text-xs font-semibold transition-colors ${
                    theme === 'dark'
                      ? 'border-neutral-700 hover:bg-neutral-800 text-neutral-200'
                      : 'border-slate-300 hover:bg-emerald-50 text-slate-800'
                  }`}
                >
                  Leadership Profile
                </button>
              </div>
            </div>

            {/* Right Column: Authentic Interview Photo Card */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className={`relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden border shadow-2xl transition-all duration-300 ${
                theme === 'dark' ? 'border-neutral-700 bg-neutral-950' : 'border-emerald-300 bg-white'
              }`}>
                <img
                  src={images.interview}
                  alt="Seyi Tinubu candid conversation wearing Why So Serious cap"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />

                {/* Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-black/80 backdrop-blur-md text-white border border-white/20 shadow-lg flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Candid Interview Photo
                  </span>
                </div>
              </div>

              {/* Photo Attribution Caption */}
              <div className="mt-3 flex items-center justify-between w-full max-w-md px-1 text-[11px] text-neutral-400">
                <span>Seyi Tinubu in Dialogue with Youth Volunteers</span>
                <span className="font-mono text-[10px] text-emerald-500">STYMM Vanguard 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Core Pillars - with card-focus-group */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            The STYMM Policy Charter
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold font-display ${
            theme === 'dark' ? 'text-white' : 'text-emerald-950'
          }`}>
            Built on Four Concrete Pillars
          </h2>
          <p className={`text-sm ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-600'}`}>
            Measurable, verifiable commitments designed to transition Nigerian youth from spectators to owners of the national economy.
          </p>
        </div>

        {/* Hover on any card pops it out and blurs the rest */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 card-focus-group">
          {CANDIDATE_INFO.manifestoPillars.map((pillar, idx) => (
            <div
              key={pillar.id}
              className={`rounded-2xl p-6 transition-all space-y-4 flex flex-col justify-between border cursor-pointer ${
                theme === 'dark'
                  ? 'bg-neutral-900 border-neutral-800 text-neutral-300'
                  : 'bg-white border-emerald-100 shadow-sm text-slate-800'
              }`}
            >
              <div className="space-y-3">
                <div className="text-xs font-mono font-bold text-emerald-500">
                  {`0${idx + 1}.`}
                </div>
                <h3 className={`text-lg font-bold font-display ${
                  theme === 'dark' ? 'text-white' : 'text-emerald-950'
                }`}>
                  {pillar.title}
                </h3>
                <p className={`text-xs leading-relaxed ${
                  theme === 'dark' ? 'text-neutral-400' : 'text-slate-600'
                }`}>
                  {pillar.tagline}
                </p>
              </div>

              <div className={`pt-4 border-t text-xs font-mono font-bold ${
                theme === 'dark' ? 'border-neutral-800 text-emerald-400' : 'border-emerald-100 text-emerald-700'
              }`}>
                {pillar.stats}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Grassroots Fieldwork Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden border border-emerald-800 bg-gradient-to-br from-emerald-950 via-emerald-900 to-black text-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 p-8 lg:p-12 space-y-6">
              <div className="text-xs font-bold text-emerald-300 uppercase tracking-widest">
                Grassroots Operation
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-balance">
                Win Your Ward. <br />
                <span className="text-emerald-400">Protect Every Vote.</span>
              </h2>
              <p className="text-sm text-emerald-100/90 leading-relaxed">
                The STYMM field apparatus is built on real human connections. Every door knocked, every voter educated on PVC collection, and every polling unit monitored guarantees the triumph of the youth mandate.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onSelectPortal('member')}
                  className="px-5 py-2.5 text-xs font-bold text-black bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md"
                >
                  Adopt a Polling Unit
                </button>
                <button
                  onClick={() => onSelectNav('resources')}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-colors"
                >
                  Canvasser Field Handbook
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 h-full min-h-[300px] overflow-hidden">
              <img
                src={images.grassroots}
                alt="Grassroots volunteers engaging with community members"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center max-h-[420px] hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Rallies & Events preview - with card-focus-group */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-4 ${
          theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'
        }`}>
          <div>
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
              On The Campaign Train
            </div>
            <h2 className={`text-2xl sm:text-3xl font-bold font-display ${
              theme === 'dark' ? 'text-white' : 'text-emerald-950'
            }`}>
              Upcoming Rallies & Townhalls
            </h2>
          </div>
          <button
            onClick={() => onSelectNav('events')}
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>View All Campaign Events</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Hover pops out card and blurs sibling */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 card-focus-group">
          {CAMPAIGN_EVENTS.slice(0, 2).map((ev) => (
            <div
              key={ev.id}
              className={`rounded-2xl p-6 space-y-4 border transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'bg-neutral-900 border-neutral-800 text-neutral-300'
                  : 'bg-white border-emerald-100 text-slate-800 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-500 font-bold">{ev.category}</span>
                <span className="font-mono text-neutral-400">{ev.date} · {ev.time}</span>
              </div>
              <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{ev.title}</h3>
              <p className={`text-xs line-clamp-2 ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-600'}`}>{ev.description}</p>
              <div className={`flex items-center justify-between text-xs pt-3 border-t ${
                theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'
              }`}>
                <div className="flex items-center gap-1.5 text-neutral-400">
                  <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="truncate max-w-[220px]">{ev.location}</span>
                </div>
                <button
                  onClick={() => onSelectNav('events')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    theme === 'dark'
                      ? 'bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700'
                      : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200'
                  }`}
                >
                  RSVP Seat
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Campaign Dispatches preview - with card-focus-group */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-4 ${
          theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'
        }`}>
          <div>
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
              Official Dispatches
            </div>
            <h2 className={`text-2xl sm:text-3xl font-bold font-display ${
              theme === 'dark' ? 'text-white' : 'text-emerald-950'
            }`}>
              News & Media Statements
            </h2>
          </div>
          <button
            onClick={() => onSelectNav('news')}
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>Read All News & Circulars</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Hover pops out card and blurs sibling */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 card-focus-group">
          {CAMPAIGN_NEWS.map((item) => (
            <div
              key={item.id}
              className={`rounded-2xl p-6 flex flex-col justify-between space-y-4 border transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'bg-neutral-900 border-neutral-800 text-neutral-300'
                  : 'bg-white border-emerald-100 text-slate-800 shadow-sm'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <span className="text-emerald-500 font-bold">{item.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.readTime}</span>
                </div>
                <h3 className={`text-base font-bold leading-snug hover:text-emerald-500 transition-colors ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  {item.title}
                </h3>
                <p className={`text-xs line-clamp-3 ${
                  theme === 'dark' ? 'text-neutral-400' : 'text-slate-600'
                }`}>
                  {item.summary}
                </p>
              </div>

              <div className={`text-xs pt-3 border-t text-neutral-400 ${
                theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'
              }`}>
                {item.date}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
