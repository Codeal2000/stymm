import React, { useState } from 'react';
import { ShieldCheck, Receipt, Lock, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const PublicDonate: React.FC = () => {
  const { theme } = useTheme();
  const [selectedAmount, setSelectedAmount] = useState<number>(10000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState('Abubakar Sadiq');
  const [donorEmail, setDonorEmail] = useState('sadiq.abubakar@example.com');
  const [targetCategory, setTargetCategory] = useState('Polling Unit Agents Logistics');
  const [receiptGenerated, setReceiptGenerated] = useState(false);
  const [receiptCode, setReceiptCode] = useState('');
  const [validationError, setValidationError] = useState('');

  const presetAmounts = [2500, 5000, 10000, 25000, 50000, 100000];

  const handleContribute = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = customAmount ? parseInt(customAmount, 10) : selectedAmount;
    if (!finalAmount || isNaN(finalAmount)) {
      setValidationError("Please select or enter a valid amount.");
      return;
    }
    setValidationError('');
    const code = `STYMM-DON-${Math.floor(100000 + Math.random() * 900000)}`;
    setReceiptCode(code);
    setReceiptGenerated(true);
  };

  const currentAmount = customAmount ? parseInt(customAmount, 10) || 0 : selectedAmount;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className={`border-b pb-8 space-y-3 transition-colors ${
        theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'
      }`}>
        <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
          Grassroots Campaign Fund
        </div>
        <h1 className={`text-3xl sm:text-5xl font-extrabold font-display transition-colors ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>
          Support The Movement
        </h1>
        <p className={`text-base max-w-3xl leading-relaxed ${
          theme === 'dark' ? 'text-neutral-300' : 'text-slate-600'
        }`}>
          100% of grassroots contributions directly power voter education, accredited polling unit agents logistics, and community PVC retrieval clinics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Donation Form */}
        <div className={`lg:col-span-7 border rounded-2xl p-6 sm:p-8 space-y-6 transition-all shadow-sm ${
          theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-emerald-100'
        }`}>
          <h2 className={`text-lg font-bold font-display ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Select Contribution Amount (NGN ₦)
          </h2>

          <div className="grid grid-cols-3 gap-3 card-focus-group">
            {presetAmounts.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => {
                  setSelectedAmount(amt);
                  setCustomAmount('');
                  setValidationError('');
                }}
                className={`py-3 px-2 rounded-xl text-sm font-mono font-bold transition-all border cursor-pointer ${
                  selectedAmount === amt && !customAmount
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md scale-[1.02]'
                    : theme === 'dark'
                    ? 'bg-black text-neutral-300 border-neutral-800 hover:border-neutral-700'
                    : 'bg-emerald-50/60 text-slate-800 border-emerald-100 hover:border-emerald-300'
                }`}
              >
                ₦{amt.toLocaleString()}
              </button>
            ))}
          </div>

          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-600'}`}>
              Or Enter Custom Amount
            </label>
            <div className="relative">
              <span className={`absolute left-3.5 top-2.5 font-mono text-sm font-bold ${theme === 'dark' ? 'text-neutral-400' : 'text-emerald-700'}`}>
                ₦
              </span>
              <input
                type="number"
                placeholder="e.g. 75000"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(0);
                  setValidationError('');
                }}
                className={`w-full pl-9 pr-3.5 py-2.5 border rounded-xl text-sm font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                  theme === 'dark'
                    ? 'bg-black border-neutral-800 text-white placeholder-neutral-500 focus:border-emerald-500'
                    : 'bg-white border-emerald-200 text-slate-900 placeholder-slate-400 focus:border-emerald-600 shadow-sm'
                }`}
              />
            </div>
            {validationError && (
              <p className="text-red-500 text-xs mt-1 font-semibold">{validationError}</p>
            )}
          </div>

          <form onSubmit={handleContribute} className="space-y-4 pt-2 border-t border-neutral-800 dark:border-neutral-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-xs font-semibold mb-1 ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'}`}>
                  Contributor Full Name
                </label>
                <input
                  type="text"
                  required
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className={`w-full px-3.5 py-2.5 border rounded-xl text-xs transition-colors focus:outline-none ${
                    theme === 'dark'
                      ? 'bg-black border-neutral-800 text-white focus:border-emerald-500'
                      : 'bg-white border-emerald-200 text-slate-900 focus:border-emerald-600 shadow-sm'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1 ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'}`}>
                  Email Address (For Tax/Receipt)
                </label>
                <input
                  type="email"
                  required
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  className={`w-full px-3.5 py-2.5 border rounded-xl text-xs transition-colors focus:outline-none ${
                    theme === 'dark'
                      ? 'bg-black border-neutral-800 text-white focus:border-emerald-500'
                      : 'bg-white border-emerald-200 text-slate-900 focus:border-emerald-600 shadow-sm'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'}`}>
                Dedicate Contribution To
              </label>
              <select
                value={targetCategory}
                onChange={(e) => setTargetCategory(e.target.value)}
                className={`w-full px-3.5 py-2.5 border rounded-xl text-xs transition-colors focus:outline-none ${
                  theme === 'dark'
                    ? 'bg-black border-neutral-800 text-white focus:border-emerald-500'
                    : 'bg-white border-emerald-200 text-slate-900 focus:border-emerald-600 shadow-sm'
                }`}
              >
                <option value="Polling Unit Agents Logistics">Polling Unit Agents & Election Day Logistics</option>
                <option value="Voter Education & PVC Clinics">Voter Education & Free PVC Retrieval Clinics</option>
                <option value="Youth Tech & Startup Grants">STYMM Youth Tech Innovation Grants</option>
                <option value="Door-to-Door Canvassing Material">Canvassing Handbooks & Supporter Badges</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
            >
              <Lock className="w-4 h-4" />
              <span>Contribute ₦{currentAmount.toLocaleString()} to Grassroots Fund</span>
            </button>
          </form>
        </div>

        {/* Right Column: Transparent Allocation & Generated Receipt */}
        <div className="lg:col-span-5 space-y-6">
          {/* Transparency Panel */}
          <div className={`border rounded-2xl p-6 space-y-4 text-xs transition-all ${
            theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-neutral-300' : 'bg-white border-emerald-100 shadow-sm text-slate-700'
          }`}>
            <div className="flex items-center gap-2 text-emerald-500 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Transparent Fund Allocation Guarantee</span>
            </div>
            <p className={`leading-relaxed ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-600'}`}>
              Every Naira received is logged in our public compliance ledger and subject to independent pre-election audit.
            </p>
            <div className={`space-y-2 pt-2 border-t ${theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'}`}>
              <div className="flex justify-between">
                <span className={theme === 'dark' ? 'text-neutral-400' : 'text-slate-600'}>Polling Unit Agents Field Kit:</span>
                <span className="font-mono font-bold text-emerald-500">45%</span>
              </div>
              <div className="flex justify-between">
                <span className={theme === 'dark' ? 'text-neutral-400' : 'text-slate-600'}>Voter Education & PVC Outreach:</span>
                <span className="font-mono font-bold text-emerald-500">30%</span>
              </div>
              <div className="flex justify-between">
                <span className={theme === 'dark' ? 'text-neutral-400' : 'text-slate-600'}>Digital Mobilization & Media:</span>
                <span className="font-mono font-bold text-emerald-500">15%</span>
              </div>
              <div className="flex justify-between">
                <span className={theme === 'dark' ? 'text-neutral-400' : 'text-slate-600'}>Legal & Compliance Monitoring:</span>
                <span className="font-mono font-bold text-emerald-500">10%</span>
              </div>
            </div>
          </div>

          {/* Instant Receipt Generator View */}
          {receiptGenerated && (
            <div className={`border-2 rounded-2xl p-6 space-y-4 shadow-xl animate-fadeIn ${
              theme === 'dark' 
                ? 'bg-black border-emerald-500/80 text-white' 
                : 'bg-white border-emerald-600 text-slate-900'
            }`}>
              <div className={`flex items-center justify-between border-b pb-3 ${
                theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'
              }`}>
                <div className="flex items-center gap-2 text-emerald-500">
                  <Receipt className="w-4 h-4" />
                  <span className="text-xs font-bold font-mono">OFFICIAL DONATION RECEIPT</span>
                </div>
                <span className={`text-[10px] font-mono ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}`}>
                  {receiptCode}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className={theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}>Contributor:</span>
                  <span className="font-bold">{donorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className={theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}>Amount Contributed:</span>
                  <span className="font-mono font-extrabold text-emerald-500 text-sm">
                    ₦{currentAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}>Earmarked Cause:</span>
                  <span className="font-medium text-right max-w-[200px] truncate">{targetCategory}</span>
                </div>
                <div className="flex justify-between">
                  <span className={theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}>Payment Status:</span>
                  <span className="text-emerald-500 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified & Logged
                  </span>
                </div>
              </div>

              <div className={`pt-3 border-t text-[10px] text-center ${
                theme === 'dark' ? 'border-neutral-800 text-neutral-500' : 'border-emerald-100 text-slate-400'
              }`}>
                STYMM National Finance Directorate · Abuja FCT, Nigeria
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
