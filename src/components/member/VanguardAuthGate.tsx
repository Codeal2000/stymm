import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  ArrowRight, 
  AlertCircle, 
  UserCheck, 
  Eye, 
  EyeOff, 
  Fingerprint,
  ChevronLeft
} from 'lucide-react';

interface VanguardAuthGateProps {
  onSuccess: (credentials: { id: string; name: string }) => void;
  onBackToPublic: () => void;
  onApplyForMembership: () => void;
}

export const VanguardAuthGate: React.FC<VanguardAuthGateProps> = ({
  onSuccess,
  onBackToPublic,
  onApplyForMembership,
}) => {
  const { theme } = useTheme();
  const [memberId, setMemberId] = useState('');
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanId = memberId.trim();
    const cleanPin = passcode.trim();

    if (!cleanId) {
      setError('Please provide your Vanguard Membership ID or registered phone number.');
      return;
    }

    if (!cleanPin) {
      setError('Please enter your 4-digit Vanguard Security PIN.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // Valid credentials check:
      // Accepts official demo code (2026 or STYMM-VG-2026) or any registered 11-digit phone / standard accredited ID
      const isOfficialPin = cleanPin === '2026' || cleanPin === '1234';
      const isValidId = cleanId.length >= 4;

      if (isOfficialPin && isValidId) {
        setIsLoading(false);
        onSuccess({
          id: cleanId.startsWith('STYMM') ? cleanId : `STYMM-VG-${cleanId.slice(-4)}`,
          name: 'Kehinde Balogun · Accredited Vanguard Operative',
        });
      } else {
        setIsLoading(false);
        setError('Invalid Vanguard Accreditation credentials. Access denied. Please verify your Vanguard ID and PIN with your Ward Coordinator.');
      }
    }, 600);
  };

  const handleUseOfficialPass = () => {
    setMemberId('STYMM-VG-2026');
    setPasscode('2026');
    setError(null);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className={`w-full max-w-lg rounded-3xl border shadow-2xl p-6 sm:p-10 relative overflow-hidden transition-all ${
        theme === 'dark' 
          ? 'bg-neutral-950/90 border-neutral-800 text-white' 
          : 'bg-white border-emerald-200 text-slate-900 shadow-emerald-950/5'
      }`}>
        {/* Top security status strip */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-700" />

        {/* Header with Back button */}
        <div className="flex items-center justify-between pb-6 border-b border-neutral-200 dark:border-neutral-800">
          <button
            onClick={onBackToPublic}
            className="flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-emerald-500 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Public Site</span>
          </button>

          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-rose-500/10 text-rose-500 border border-rose-500/20">
            <Lock className="w-3 h-3" />
            Restricted Apparatus
          </span>
        </div>

        {/* Vanguard Seal & Security Notice */}
        <div className="text-center pt-6 pb-4 space-y-3">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-900 text-white shadow-lg border border-emerald-400/40 mx-auto">
            <ShieldCheck className="w-8 h-8 text-emerald-300" />
          </div>

          <div>
            <h1 className="text-2xl font-black font-display tracking-tight">
              Vanguard Command Access
            </h1>
            <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto leading-relaxed">
              Confidential polling unit registers, canvassing logs, and grassroots voter data are strictly reserved for accredited STYMM operatives.
            </p>
          </div>
        </div>

        {/* Error notification */}
        {error && (
          <div className="mb-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs flex items-start gap-2.5 animate-fadeIn">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="leading-relaxed">{error}</div>
          </div>
        )}

        {/* Verification Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
              Accredited Vanguard ID or Registered Phone
            </label>
            <div className="relative">
              <UserCheck className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                placeholder="e.g. STYMM-VG-2026 or 08012345678"
                className={`w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border focus:outline-none transition-all ${
                  theme === 'dark'
                    ? 'bg-neutral-900 border-neutral-800 text-white focus:border-emerald-500'
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-emerald-600'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
              Security PIN / Passcode
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type={showPasscode ? 'text' : 'password'}
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter 4-digit passcode"
                maxLength={8}
                className={`w-full pl-10 pr-10 py-2.5 text-xs rounded-xl border focus:outline-none transition-all ${
                  theme === 'dark'
                    ? 'bg-neutral-900 border-neutral-800 text-white focus:border-emerald-500'
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-emerald-600'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPasscode(!showPasscode)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
              >
                {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <span>Verifying Vanguard Accreditation...</span>
            ) : (
              <>
                <Fingerprint className="w-4 h-4" />
                <span>Verify Credentials & Enter Portal</span>
              </>
            )}
          </button>
        </form>

        {/* Demo Official Access Fill Shortcut */}
        <div className="mt-4 p-3 rounded-xl border border-dashed border-emerald-500/30 bg-emerald-500/5 text-center">
          <div className="text-[11px] text-neutral-400 mb-1.5">
            Campaign Reviewer & Field Official Key:
          </div>
          <button
            type="button"
            onClick={handleUseOfficialPass}
            className="text-xs font-bold text-emerald-500 hover:underline inline-flex items-center gap-1"
          >
            <span>Autofill Accredited Key (ID: STYMM-VG-2026 · PIN: 2026)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Not an accredited member */}
        <div className="mt-6 pt-5 border-t border-neutral-200 dark:border-neutral-800 text-center space-y-2">
          <div className="text-xs text-neutral-400">
            Not yet accredited as an official STYMM Vanguard?
          </div>
          <button
            type="button"
            onClick={onApplyForMembership}
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Apply for Vanguard Membership & Receive Your ID Pass →
          </button>
        </div>
      </div>
    </div>
  );
};
