import React, { useState } from 'react';
import { PortalSection, AdminRole } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { Lock, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface PublicAuthProps {
  onLoginSuccess: (portal: PortalSection, adminRole?: AdminRole) => void;
}

export const PublicAuth: React.FC<PublicAuthProps> = ({ onLoginSuccess }) => {
  const { theme } = useTheme();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('canvasser.kehinde@stymm.ng');
  const [password, setPassword] = useState('••••••••••••');

  const demoAccounts = [
    {
      title: "Grassroots Canvasser",
      name: "Kehinde Balogun",
      roleDesc: "Lagos / Ikeja Ward 01 Canvasser",
      targetPortal: 'member' as PortalSection,
      adminRole: undefined,
    },
    {
      title: "Ward Coordinator",
      name: "Alhaji Aminu Bello",
      roleDesc: "Kano / Nasarawa Ward 04 Command",
      targetPortal: 'admin' as PortalSection,
      adminRole: 'ward' as AdminRole,
    },
    {
      title: "State Coordinator",
      name: "Dr. Kunle Akande",
      roleDesc: "Oyo State Campaign Directorate",
      targetPortal: 'admin' as PortalSection,
      adminRole: 'state' as AdminRole,
    },
    {
      title: "National Operations Lead",
      name: "Engr. Femi Solanke",
      roleDesc: "National Mobilization Council",
      targetPortal: 'admin' as PortalSection,
      adminRole: 'national' as AdminRole,
    },
  ];

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess('member');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
          Secure Campaign Access
        </div>
        <h1 className={`text-3xl sm:text-4xl font-extrabold font-display transition-colors ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>
          STYMM Portal Authentication
        </h1>
        <p className={`text-sm max-w-lg mx-auto leading-relaxed ${
          theme === 'dark' ? 'text-neutral-400' : 'text-slate-600'
        }`}>
          Single sign-on access for registered members, door-to-door canvassers, ward coordinators, and campaign leadership.
        </p>
      </div>

      {/* 1-Click Fast Preview Logins for review with card-focus-group */}
      <div className={`border rounded-2xl p-6 sm:p-8 space-y-5 transition-all shadow-sm ${
        theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-emerald-100 shadow-sm'
      }`}>
        <div className={`flex items-center justify-between border-b pb-3 ${
          theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'
        }`}>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Instant Role Simulation (For Campaign Director & Candidate Review)</span>
          </div>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
            theme === 'dark' ? 'bg-neutral-800 text-neutral-400' : 'bg-emerald-50 text-emerald-700'
          }`}>
            1-Click Access
          </span>
        </div>

        <p className={`text-xs ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-600'}`}>
          Select any role below to experience the system from that exact perspective:
        </p>

        {/* Hover on any role card pops it out and blurs the rest */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 card-focus-group">
          {demoAccounts.map((acc, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onLoginSuccess(acc.targetPortal, acc.adminRole)}
              className={`p-4 rounded-xl border text-left transition-all group flex flex-col justify-between cursor-pointer ${
                theme === 'dark'
                  ? 'bg-black border-neutral-800 hover:border-emerald-500'
                  : 'bg-emerald-50/40 hover:bg-white border-emerald-100 hover:border-emerald-400'
              }`}
            >
              <div>
                <span className={`text-xs font-bold group-hover:text-emerald-500 transition-colors block ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  {acc.title}
                </span>
                <span className={`text-[11px] font-semibold block mt-0.5 ${
                  theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'
                }`}>
                  {acc.name}
                </span>
                <span className={`text-[10px] block mt-1 line-clamp-1 ${
                  theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'
                }`}>
                  {acc.roleDesc}
                </span>
              </div>

              <div className={`mt-3 pt-2 border-t text-[10px] font-bold text-emerald-500 flex items-center justify-between ${
                theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'
              }`}>
                <span>Enter as {acc.title.split(' ')[0]}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Manual Login Form */}
      <div className={`max-w-md mx-auto border rounded-2xl p-6 sm:p-8 space-y-6 transition-all shadow-sm ${
        theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-emerald-100 shadow-sm'
      }`}>
        <div className={`flex items-center justify-between border-b pb-3 ${
          theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'
        }`}>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-500" />
            <h2 className={`text-base font-bold font-display ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {isRegisterMode ? 'Register Member Account' : 'Credentials Login'}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsRegisterMode(!isRegisterMode)}
            className="text-xs text-emerald-500 hover:underline font-semibold"
          >
            {isRegisterMode ? 'Already have account?' : 'Need to register?'}
          </button>
        </div>

        <form onSubmit={handleManualSubmit} className="space-y-4">
          <div>
            <label className={`block text-xs font-semibold mb-1 ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'}`}>
              Official Email or Phone Number
            </label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3.5 py-2.5 border rounded-xl text-xs transition-colors focus:outline-none ${
                theme === 'dark'
                  ? 'bg-black border-neutral-800 text-white focus:border-emerald-500'
                  : 'bg-white border-emerald-200 text-slate-900 focus:border-emerald-600 shadow-sm'
              }`}
            />
          </div>

          <div>
            <label className={`block text-xs font-semibold mb-1 ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'}`}>
              Secret Password / Security PIN
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3.5 py-2.5 border rounded-xl text-xs transition-colors focus:outline-none ${
                theme === 'dark'
                  ? 'bg-black border-neutral-800 text-white focus:border-emerald-500'
                  : 'bg-white border-emerald-200 text-slate-900 focus:border-emerald-600 shadow-sm'
              }`}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
          >
            <Lock className="w-4 h-4" />
            <span>{isRegisterMode ? 'Create New Member Profile' : 'Authenticate & Enter Console'}</span>
          </button>
        </form>

        <div className={`pt-3 border-t text-[11px] text-center ${
          theme === 'dark' ? 'border-neutral-800 text-neutral-400' : 'border-emerald-100 text-slate-500'
        }`}>
          <span>Protected by STYMM Decentralized Campaign Security Protocol</span>
        </div>
      </div>
    </div>
  );
};
