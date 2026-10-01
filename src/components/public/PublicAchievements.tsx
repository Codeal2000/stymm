import React from 'react';
import { Award, CheckCircle, TrendingUp, Users, Zap, BookOpen, HeartPulse } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const PublicAchievements: React.FC = () => {
  const { theme } = useTheme();

  const achievements = [
    {
      metric: "₦1.2B+",
      label: "Seed Venture Capital Deployed",
      timeframe: "Last 18 Months",
      description: "Direct micro-grants and venture debt disbursed to 840+ youth startups spanning fintech, agribusiness, and renewable energy in 6 geopolitical zones.",
      icon: TrendingUp,
    },
    {
      metric: "450,000+",
      label: "PVCs Retrieved & Verified",
      timeframe: "2024 - 2026 Mobilization Blitz",
      description: "Grassroots voter desks set up outside INEC local offices assisting youth in checking registration logs and securing uncollected voter cards.",
      icon: Users,
    },
    {
      metric: "65,000+",
      label: "Youth Trained & Certified",
      timeframe: "STYMM Academy Programs",
      description: "Certified graduates in solar installation, frontend software development, cybersecurity, graphics design, and modern poultry husbandry.",
      icon: BookOpen,
    },
    {
      metric: "180+",
      label: "Solar Mini-Grids & Boreholes Installed",
      timeframe: "Community Infrastructure Drive",
      description: "Clean water boreholes and solar street illumination installed in underserved polling unit catchments in Lagos, Kano, Oyo, and Rivers.",
      icon: Zap,
    },
    {
      metric: "320,000+",
      label: "Free Medical Health Screenings",
      timeframe: "Grassroots Medical Caravans",
      description: "Mobile clinics offering free blood pressure checks, diabetes testing, vision screenings, and maternal care packages.",
      icon: HeartPulse,
    },
    {
      metric: "176,846",
      label: "Polling Units Mapped Digitally",
      timeframe: "National Field Census",
      description: "Complete geo-referenced database linking accredited youth observers, local polling unit locations, and neighborhood canvasser units.",
      icon: Award,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className={`border-b pb-8 space-y-3 ${theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'}`}>
        <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
          Verified Impact Record
        </div>
        <h1 className={`text-3xl sm:text-5xl font-extrabold font-display ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
          Concrete Achievements & Milestones
        </h1>
        <p className={`text-base max-w-3xl ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-600'}`}>
          We believe in governance by results. Before asking for the vote, STYMM leadership has consistently delivered tangible progress across Nigeria.
        </p>
      </div>

      {/* Grid of Quantified Achievements with card-focus-group */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 card-focus-group">
        {achievements.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`rounded-2xl p-6 flex flex-col justify-between space-y-6 border transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'bg-neutral-900 border-neutral-800 text-neutral-300'
                  : 'bg-white border-emerald-100 text-slate-700 shadow-sm'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-xs font-mono font-medium ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}`}>{item.timeframe}</span>
                </div>

                <div>
                  <div className={`text-3xl font-extrabold font-mono tabular-nums ${theme === 'dark' ? 'text-white' : 'text-emerald-950'}`}>
                    {item.metric}
                  </div>
                  <div className="text-sm font-bold text-emerald-500 mt-1">
                    {item.label}
                  </div>
                </div>

                <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-600'}`}>
                  {item.description}
                </p>
              </div>

              <div className={`pt-3 border-t flex items-center gap-1.5 text-xs font-semibold ${
                theme === 'dark' ? 'border-neutral-800 text-neutral-400' : 'border-emerald-100 text-emerald-800'
              }`}>
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Audited & Field-Verified</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Case Study Quote */}
      <div className={`rounded-2xl p-8 lg:p-10 space-y-6 border ${
        theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-neutral-200' : 'bg-emerald-50/70 border-emerald-200 text-slate-800'
      }`}>
        <div className="text-xs font-bold text-emerald-500 uppercase tracking-widest">
          Grassroots Voice
        </div>
        <blockquote className="text-lg sm:text-xl italic font-serif leading-relaxed">
          &ldquo;Before STYMM brought the solar installation training and certified kit to our ward in Ikeja, over 40 of our youth were idle on street corners. Today, 32 of them have registered their own solar maintenance businesses, earning independent livelihood and giving back to our community.&rdquo;
        </blockquote>
        <div className="text-xs">
          <strong className={`block font-sans ${theme === 'dark' ? 'text-white' : 'text-slate-950 font-bold'}`}>
            Engr. Tunde Adeleke
          </strong>
          <span className={theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}>Ward Youth Leader & Solar Enterprise Fellow, Lagos State</span>
        </div>
      </div>
    </div>
  );
};
