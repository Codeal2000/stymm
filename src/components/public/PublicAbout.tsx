import React, { useState } from 'react';
import { CANDIDATE_INFO } from '../../data/campaignData';
import { useTheme } from '../../context/ThemeContext';
import { useCampaignMedia } from '../../context/CampaignMediaContext';
import { Award, Briefcase, GraduationCap, ShieldCheck, HeartHandshake, Compass, CheckCircle2 } from 'lucide-react';

export const PublicAbout: React.FC = () => {
  const { theme } = useTheme();
  const { images } = useCampaignMedia();
  const [activePhotoTab, setActivePhotoTab] = useState<'candidate' | 'interview'>('candidate');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className={`border-b pb-8 space-y-3 ${theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'}`}>
        <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
          Candidate & Leadership Profile
        </div>
        <h1 className={`text-3xl sm:text-5xl font-extrabold font-display ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
          About Seyi Tinubu & The STYMM Vision
        </h1>
        <p className={`text-base max-w-3xl ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-600'}`}>
          A track record of youthful dynamism, civic entrepreneurship, and unwavering dedication to Nigerian youth empowerment.
        </p>
      </div>

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 space-y-6">
          <div className={`rounded-2xl overflow-hidden border shadow-2xl transition-all duration-300 ${
            theme === 'dark' ? 'border-neutral-800 bg-neutral-900' : 'border-emerald-200 bg-white'
          }`}>
            {/* Photo Selection Tabs */}
            <div className={`px-4 py-2 border-b flex items-center justify-between text-xs font-semibold ${
              theme === 'dark' ? 'bg-black/60 border-neutral-800' : 'bg-slate-50 border-emerald-100'
            }`}>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setActivePhotoTab('candidate')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    activePhotoTab === 'candidate'
                      ? 'bg-emerald-600 text-white font-bold shadow-sm'
                      : theme === 'dark'
                      ? 'text-neutral-400 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Official Portrait
                </button>
                <button
                  type="button"
                  onClick={() => setActivePhotoTab('interview')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    activePhotoTab === 'interview'
                      ? 'bg-emerald-600 text-white font-bold shadow-sm'
                      : theme === 'dark'
                      ? 'text-neutral-400 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Candid Conversation
                </button>
              </div>

              <span className="text-[10px] text-neutral-400 hidden sm:inline">
                {activePhotoTab === 'interview' ? 'Why So Serious? Cap' : 'Presidential Vanguard'}
              </span>
            </div>

            <div className="relative overflow-hidden aspect-[4/3] bg-black/40">
              <img
                src={images[activePhotoTab]}
                alt={activePhotoTab === 'interview' ? 'Seyi Tinubu candid conversation' : 'Seyi Tinubu official portrait'}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            <div className={`p-6 border-t space-y-3 ${
              theme === 'dark' ? 'bg-black/90 border-neutral-800' : 'bg-emerald-50/60 border-emerald-100'
            }`}>
              <div>
                <h3 className={`text-lg font-bold font-display ${theme === 'dark' ? 'text-white' : 'text-emerald-950'}`}>
                  {CANDIDATE_INFO.fullName}
                </h3>
                <p className="text-xs text-emerald-500 font-bold">
                  National Convener & Grand Patron, STYMM
                </p>
              </div>

              <p className={`text-xs leading-relaxed pt-2 border-t ${
                theme === 'dark' ? 'text-neutral-400 border-neutral-800' : 'text-slate-600 border-emerald-200/60'
              }`}>
                &ldquo;Our generation cannot afford to remain mere spectators in the democratic theater. We must organize, register, verify our polling units, and govern with integrity.&rdquo;
              </p>
            </div>
          </div>

          <div className={`rounded-2xl p-6 space-y-3 text-xs border ${
            theme === 'dark'
              ? 'bg-neutral-900 border-neutral-800 text-neutral-300'
              : 'bg-white border-emerald-100 text-slate-700 shadow-sm'
          }`}>
            <h4 className={`font-bold uppercase tracking-wider text-xs ${theme === 'dark' ? 'text-white' : 'text-emerald-950'}`}>
              Leadership Core Values
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Empowerment Over Patronage</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Accountability in Every Polling Unit</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Inclusive Inter-Faith & Inter-Ethnic Coalition</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Tech-Driven Civic Innovation</span>
              </div>
            </div>
          </div>
        </div>

        <div className={`lg:col-span-7 space-y-8 text-sm leading-relaxed ${
          theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'
        }`}>
          <div className="space-y-4">
            <h2 className={`text-2xl font-bold font-display ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
              A Legacy of Youth Advocacy & Practical Action
            </h2>
            <p>
              Seyi Tinubu has established himself as a forward-thinking entrepreneur, community organizer, and champion of Nigerian creative and technological excellence. Educated with degrees in Corporate Law and International Commerce, he chose to invest his energy directly in the Nigerian domestic economy.
            </p>
            <p>
              Over the last decade, through numerous philanthropic and venture initiatives, he has supported thousands of youth-led startups, provided sports academy scholarships, sponsored solar energy vocational training programs, and orchestrated medical outreaches reaching underserved communities in both rural and metropolitan Nigeria.
            </p>
          </div>

          <div className={`space-y-4 pt-4 border-t ${theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'}`}>
            <h3 className={`text-xl font-bold font-display ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
              Why The Youth Mobilization Movement Was Founded
            </h3>
            <p>
              Recognizing that youth represent over 65% of Nigeria&apos;s registered voter demographic, the Seyi Tinubu Youth Mobilization Movement (STYMM) was launched to bridge the historic gap between youthful passion and organized political power.
            </p>
            <p>
              Unlike conventional political groups that disperse after elections, STYMM operates as a 365-day civic infrastructure. We build continuous capacity: certifying polling unit monitors, educating citizens on their electoral rights, advocating for youth business policies, and ensuring that government at all levels listens to young voices.
            </p>
          </div>

          {/* Key Milestones Timeline with card-focus-group */}
          <div className={`space-y-4 pt-4 border-t ${theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'}`}>
            <h3 className={`text-xl font-bold font-display ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
              Pivotal Milestones & Community Impact
            </h3>
            <div className="space-y-4 card-focus-group">
              <div className={`border-l-4 border-emerald-500 pl-4 py-3 rounded-r-xl space-y-1 transition-all border ${
                theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-emerald-100 shadow-sm'
              }`}>
                <div className="text-xs font-mono text-emerald-500 font-bold">2021 · Seed & Scale Initiative</div>
                <div className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  Venture Incubation for 1,200 Grassroots Startups
                </div>
                <p className={`text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-600'}`}>
                  Provided zero-interest working capital and mentorship to young tech and artisanal founders.
                </p>
              </div>

              <div className={`border-l-4 border-emerald-500 pl-4 py-3 rounded-r-xl space-y-1 transition-all border ${
                theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-emerald-100 shadow-sm'
              }`}>
                <div className="text-xs font-mono text-emerald-500 font-bold">2023 · Nationwide PVC Rescue Drive</div>
                <div className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  Mobilizing 1.1 Million New Voters
                </div>
                <p className={`text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-600'}`}>
                  Deployed volunteer voter guidance desks to ease card collection in crowded metropolitan LGAs.
                </p>
              </div>

              <div className={`border-l-4 border-emerald-500 pl-4 py-3 rounded-r-xl space-y-1 transition-all border ${
                theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-emerald-100 shadow-sm'
              }`}>
                <div className="text-xs font-mono text-emerald-500 font-bold">2026 · STYMM Digital Mobilization Portal</div>
                <div className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  Activating 176,846 Polling Units
                </div>
                <p className={`text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-600'}`}>
                  Built Nigeria&apos;s first decentralized youth voter mobilization, polling unit adoption, and canvassing logging platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
