import React, { useState } from 'react';
import { STATES_AND_LGAS } from '../../data/campaignData';
import { useTheme } from '../../context/ThemeContext';
import { ShieldCheck, QrCode, Download, CheckCircle, Sparkles, UserCheck, Check } from 'lucide-react';

interface PublicJoinProps {
  onSuccessNavigate?: () => void;
}

export const PublicJoin: React.FC<PublicJoinProps> = ({ onSuccessNavigate }) => {
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    fullName: 'Adeola Adeleke',
    phone: '0802 334 9912',
    email: 'adeola.adeleke@example.com',
    state: 'Lagos',
    lga: 'Ikeja',
    ward: 'Ward 01 - Alausa / Secretariat',
    puNumber: 'PU 012 - Health Centre Gate',
    pvcStatus: 'Has PVC',
    rolePreference: 'Grassroots Canvasser',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [memberId, setMemberId] = useState('STYMM-NG-2026-8849');

  const selectedStateObj = STATES_AND_LGAS.find((s) => s.name === formData.state) || STATES_AND_LGAS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setMemberId(`STYMM-${formData.state.slice(0, 3).toUpperCase()}-2026-${randomNum}`);
    setIsSubmitted(true);
  };

  const handleDownloadPass = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className={`border-b pb-8 space-y-3 ${theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'}`}>
        <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
          Voter Mobilization Enrollment
        </div>
        <h1 className={`text-3xl sm:text-5xl font-extrabold font-display ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
          Join The STYMM Movement
        </h1>
        <p className={`text-base max-w-3xl ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-600'}`}>
          Enlist as an official volunteer, canvasser, or polling unit defender. Get your verified digital membership badge and direct access to campaign resources.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Enrollment Form */}
        <div className={`lg:col-span-7 rounded-2xl p-6 sm:p-8 space-y-6 border ${
          theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-emerald-100 text-slate-800 shadow-sm'
        }`}>
          <div className={`flex items-center justify-between border-b pb-4 ${theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'}`}>
            <h2 className={`text-lg font-bold font-display ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Supporter & Volunteer Registration
            </h2>
            <span className="text-xs text-emerald-500 font-bold font-mono">100% Free · Verified</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-xs font-bold mb-1 ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'}`}>
                  Full Name (as on voter ID)
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm transition-colors border focus:outline-none focus:border-emerald-500 ${
                    theme === 'dark'
                      ? 'bg-black border-neutral-800 text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                  placeholder="e.g. Babatunde Adeyemi"
                />
              </div>

              <div>
                <label className={`block text-xs font-bold mb-1 ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'}`}>
                  WhatsApp / Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm transition-colors border focus:outline-none focus:border-emerald-500 ${
                    theme === 'dark'
                      ? 'bg-black border-neutral-800 text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                  placeholder="0803 XXX XXXX"
                />
              </div>
            </div>

            <div>
              <label className={`block text-xs font-bold mb-1 ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'}`}>
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm transition-colors border focus:outline-none focus:border-emerald-500 ${
                  theme === 'dark'
                    ? 'bg-black border-neutral-800 text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
                placeholder="you@domain.com"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-xs font-bold mb-1 ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'}`}>
                  State of Registration
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => {
                    const newState = e.target.value;
                    const st = STATES_AND_LGAS.find((s) => s.name === newState);
                    setFormData({
                      ...formData,
                      state: newState,
                      lga: st ? st.lgas[0] : '',
                    });
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm transition-colors border focus:outline-none focus:border-emerald-500 ${
                    theme === 'dark'
                      ? 'bg-black border-neutral-800 text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  {STATES_AND_LGAS.map((st) => (
                    <option key={st.name} value={st.name}>
                      {st.name} State
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-xs font-bold mb-1 ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'}`}>
                  Local Government Area (LGA)
                </label>
                <select
                  value={formData.lga}
                  onChange={(e) => setFormData({ ...formData, lga: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm transition-colors border focus:outline-none focus:border-emerald-500 ${
                    theme === 'dark'
                      ? 'bg-black border-neutral-800 text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  {selectedStateObj.lgas.map((lga) => (
                    <option key={lga} value={lga}>
                      {lga} LGA
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-xs font-bold mb-1 ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'}`}>
                  PVC Card Status
                </label>
                <select
                  value={formData.pvcStatus}
                  onChange={(e) => setFormData({ ...formData, pvcStatus: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm transition-colors border focus:outline-none focus:border-emerald-500 ${
                    theme === 'dark'
                      ? 'bg-black border-neutral-800 text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  <option value="Has PVC">I have collected my PVC</option>
                  <option value="Awaiting Collection">Registered, awaiting PVC collection</option>
                  <option value="Needs Registration">Not yet registered to vote</option>
                </select>
              </div>

              <div>
                <label className={`block text-xs font-bold mb-1 ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'}`}>
                  Role Preference
                </label>
                <select
                  value={formData.rolePreference}
                  onChange={(e) => setFormData({ ...formData, rolePreference: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm transition-colors border focus:outline-none focus:border-emerald-500 ${
                    theme === 'dark'
                      ? 'bg-black border-neutral-800 text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  <option value="Grassroots Canvasser">Grassroots Door Canvasser</option>
                  <option value="Polling Unit Agent">Accredited Polling Unit Agent</option>
                  <option value="Digital Media Warrior">Digital Media & WhatsApp Advocate</option>
                  <option value="Logistics & Transport">Field Logistics & Transport Driver</option>
                  <option value="Campus Chapter Lead">Campus & Student Coordinator</option>
                </select>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm"
              >
                <UserCheck className="w-4 h-4" />
                <span>Generate Official STYMM Supporter Card</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Live Generated Digital Card Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
            Live Digital Membership Card
          </div>

          {/* Card Frame - Iconic Green & Pure Black Theme */}
          <div className="relative rounded-2xl p-6 bg-gradient-to-br from-emerald-900 via-emerald-950 to-black border-2 border-emerald-400 shadow-2xl text-white space-y-6">
            {/* Top row */}
            <div className="flex items-center justify-between border-b border-emerald-800/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-emerald-500 text-black font-black text-sm flex items-center justify-center shadow">
                  ST
                </span>
                <div>
                  <div className="text-xs font-bold tracking-tight">STYMM NATIONAL COUNCIL</div>
                  <div className="text-[10px] text-emerald-300 font-medium">Official Supporter & Canvasser Pass</div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-[10px] font-mono text-emerald-300 font-bold">{memberId}</div>
                <div className="text-[9px] text-emerald-100/70">2026 ELECTION CYCLE</div>
              </div>
            </div>

            {/* Member Details */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-4 flex flex-col items-center">
                <div className="w-20 h-20 rounded-xl bg-emerald-800/80 border-2 border-emerald-400/50 flex items-center justify-center text-white text-2xl font-bold uppercase shadow-inner">
                  {formData.fullName.split(' ').map((n) => n[0]).join('').slice(0, 2) || 'ST'}
                </div>
                <div className="mt-2 text-[10px] font-bold text-emerald-300 uppercase">
                  {formData.rolePreference.split(' ')[0]}
                </div>
              </div>

              <div className="col-span-8 space-y-1.5 text-xs">
                <div>
                  <div className="text-[10px] text-emerald-200">MEMBER NAME</div>
                  <div className="font-bold text-white text-sm truncate">{formData.fullName || 'Registered Supporter'}</div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-[10px] text-emerald-200">STATE / LGA</div>
                    <div className="font-semibold text-white truncate">{formData.state} · {formData.lga}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-emerald-200">PVC STATUS</div>
                    <div className="font-bold text-emerald-300 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      <span className="truncate">{formData.pvcStatus}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-emerald-200">POLLING UNIT</div>
                  <div className="font-mono text-[11px] text-emerald-100 truncate">{formData.puNumber || 'Ward 01 / Central Post'}</div>
                </div>
              </div>
            </div>

            {/* Bottom Row: QR & Security seal */}
            <div className="pt-3 border-t border-emerald-800/80 flex items-center justify-between text-[10px] text-emerald-200">
              <div className="flex items-center gap-2">
                <QrCode className="w-8 h-8 text-emerald-300 bg-black p-1 rounded-lg border border-emerald-700" />
                <div>
                  <span className="text-white block font-bold">INEC ACCREDITATION READY</span>
                  <span>Scannable at STYMM Ward Desks</span>
                </div>
              </div>

              <div className="text-right font-mono text-[10px] text-emerald-400 font-bold bg-emerald-950 px-2 py-1 rounded border border-emerald-800">
                ACTIVE MEMBER
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleDownloadPass}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors border ${
                theme === 'dark'
                  ? 'bg-neutral-900 hover:bg-neutral-800 text-white border-neutral-700'
                  : 'bg-white hover:bg-emerald-50 text-slate-800 border-emerald-200 shadow-sm'
              }`}
            >
              <Download className="w-3.5 h-3.5 text-emerald-500" />
              <span>{downloadSuccess ? 'Digital Pass Downloaded!' : 'Download Digital Pass'}</span>
            </button>
          </div>

          {downloadSuccess && (
            <div className="p-3 bg-emerald-600 text-white rounded-xl text-xs font-semibold flex items-center justify-between shadow-lg animate-fadeIn">
              <span>Card pass for {formData.fullName} ({memberId}) saved!</span>
              <Check className="w-4 h-4" />
            </div>
          )}

          {isSubmitted && (
            <div className="p-4 bg-emerald-950/80 border border-emerald-600 rounded-xl text-xs text-emerald-200 space-y-1 shadow-lg">
              <div className="font-bold flex items-center gap-1.5 text-white">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Registration Successful!</span>
              </div>
              <p className="text-emerald-100">
                Welcome to the movement. Your digital member card has been generated. You can now log into the Member Portal to access training materials and your local ward network.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
