import React, { useState } from 'react';
import { PollingUnit } from '../../types';
import { INITIAL_POLLING_UNITS } from '../../data/campaignData';
import { useTheme } from '../../context/ThemeContext';
import { ShieldCheck, CheckCircle2, Search, Plus, X } from 'lucide-react';

export const MemberAdoptPU: React.FC = () => {
  const { theme } = useTheme();
  const [pollingUnits, setPollingUnits] = useState<PollingUnit[]>(INITIAL_POLLING_UNITS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPU, setSelectedPU] = useState<PollingUnit | null>(null);
  const [sponsorName, setSponsorName] = useState('Comrade Kehinde Balogun');
  const [sponsorPledge, setSponsorPledge] = useState(50000);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const handleAdopt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPU) return;

    setPollingUnits((prev) =>
      prev.map((pu) => {
        if (pu.id === selectedPU.id) {
          return {
            ...pu,
            adoptionStatus: 'Adopted',
            adoptedBy: sponsorName,
            fundsRaised: pu.fundsRaised + sponsorPledge,
          };
        }
        return pu;
      })
    );

    setSuccessNotice(`Congratulations! You have adopted Polling Unit: ${selectedPU.name} (${selectedPU.code})!`);
    setSelectedPU(null);
    setTimeout(() => setSuccessNotice(null), 5000);
  };

  const filteredPUs = pollingUnits.filter(
    (pu) =>
      pu.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pu.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pu.lga.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pu.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className={`border-b pb-4 space-y-2 transition-colors ${
        theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'
      }`}>
        <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
          Grassroots Anchor Initiative
        </div>
        <h1 className={`text-2xl sm:text-3xl font-extrabold font-display transition-colors ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>
          Adopt-a-Polling-Unit (PU) Command
        </h1>
        <p className={`text-xs max-w-3xl leading-relaxed ${
          theme === 'dark' ? 'text-neutral-400' : 'text-slate-600'
        }`}>
          The election is won or lost at the polling unit level. By adopting a PU, you guarantee that accredited youth monitors have communication tools, refreshments for citizens in the queue, and real-time result transmission capacity.
        </p>
      </div>

      {successNotice && (
        <div className="p-4 bg-emerald-600 text-white rounded-2xl text-xs font-semibold flex items-center justify-between shadow-lg animate-fadeIn">
          <span>{successNotice}</span>
          <CheckCircle2 className="w-5 h-5 shrink-0" />
        </div>
      )}

      {/* Overview Stats with card-focus-group */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 card-focus-group">
        <div className={`border rounded-2xl p-5 space-y-1 transition-all shadow-sm cursor-pointer ${
          theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-emerald-100'
        }`}>
          <span className={`text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}`}>Total PUs in Focus</span>
          <div className={`text-2xl font-extrabold font-mono ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            176,846
          </div>
          <span className="text-[11px] text-emerald-500 font-semibold">Across 36 States + FCT</span>
        </div>

        <div className={`border rounded-2xl p-5 space-y-1 transition-all shadow-sm cursor-pointer ${
          theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-emerald-100'
        }`}>
          <span className={`text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}`}>Currently Adopted PUs</span>
          <div className="text-2xl font-extrabold text-emerald-500 font-mono">94,210</div>
          <span className={`text-[11px] ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}`}>53.2% national coverage</span>
        </div>

        <div className={`border rounded-2xl p-5 space-y-1 transition-all shadow-sm cursor-pointer ${
          theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-emerald-100'
        }`}>
          <span className={`text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}`}>PU Logistics Fund Raised</span>
          <div className={`text-2xl font-extrabold font-mono ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            ₦418.5M
          </div>
          <span className="text-[11px] text-emerald-500 font-semibold">For field agent kits & welfare</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className={`w-4 h-4 absolute left-3 top-2.5 ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}`} />
        <input
          type="text"
          placeholder="Search by PU name, code, LGA, or State..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full pl-9 pr-3 py-2 border rounded-xl text-xs transition-colors focus:outline-none ${
            theme === 'dark'
              ? 'bg-neutral-900 border-neutral-800 text-white focus:border-emerald-500'
              : 'bg-white border-emerald-200 text-slate-900 focus:border-emerald-600 shadow-sm'
          }`}
        />
      </div>

      {/* Polling Units Grid with card-focus-group */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 card-focus-group">
        {filteredPUs.map((pu) => {
          const isAdopted = pu.adoptionStatus === 'Adopted';
          return (
            <div
              key={pu.id}
              className={`border rounded-2xl p-6 flex flex-col justify-between space-y-4 transition-all cursor-pointer ${
                isAdopted
                  ? theme === 'dark'
                    ? 'bg-neutral-900/60 border-neutral-800 opacity-90'
                    : 'bg-emerald-50/40 border-emerald-100'
                  : theme === 'dark'
                  ? 'bg-neutral-900 border-neutral-800 hover:border-emerald-500/50'
                  : 'bg-white border-emerald-100 hover:border-emerald-300 shadow-sm'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-emerald-500 font-bold">{pu.code}</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isAdopted
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                    }`}
                  >
                    {pu.adoptionStatus}
                  </span>
                </div>

                <h3 className={`font-bold text-base leading-snug ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {pu.name}
                </h3>

                <div className={`text-xs space-y-1 ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-600'}`}>
                  <div>Ward: <span className={`font-semibold ${theme === 'dark' ? 'text-neutral-200' : 'text-slate-800'}`}>{pu.ward}</span></div>
                  <div>LGA/State: <span className={`font-semibold ${theme === 'dark' ? 'text-neutral-200' : 'text-slate-800'}`}>{pu.lga}, {pu.state}</span></div>
                </div>

                <div className={`grid grid-cols-2 gap-2 pt-2 border-t text-xs ${
                  theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'
                }`}>
                  <div>
                    <span className={`text-[10px] block ${theme === 'dark' ? 'text-neutral-500' : 'text-slate-400'}`}>
                      Registered Voters
                    </span>
                    <span className={`font-mono font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      {pu.registeredVoters}
                    </span>
                  </div>
                  <div>
                    <span className={`text-[10px] block ${theme === 'dark' ? 'text-neutral-500' : 'text-slate-400'}`}>
                      Pledged Supporters
                    </span>
                    <span className="font-mono font-bold text-emerald-500">
                      {pu.pledgedSupporters}
                    </span>
                  </div>
                </div>

                {isAdopted && pu.adoptedBy && (
                  <div className={`p-2.5 rounded-xl border text-[11px] ${
                    theme === 'dark'
                      ? 'bg-black border-emerald-900/60 text-emerald-300'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  }`}>
                    Sponsor: <strong>{pu.adoptedBy}</strong>
                  </div>
                )}
              </div>

              <div className={`pt-3 border-t flex items-center justify-between ${
                theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'
              }`}>
                <div className={`text-xs font-mono font-semibold ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-600'}`}>
                  ₦{pu.fundsRaised.toLocaleString()} raised
                </div>

                {!isAdopted ? (
                  <button
                    onClick={() => setSelectedPU(pu)}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Adopt This PU</span>
                  </button>
                ) : (
                  <span className="text-[11px] text-emerald-500 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Fully Adopted
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Adoption Modal */}
      {selectedPU && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className={`border rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl transition-colors ${
            theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-emerald-100 text-slate-900'
          }`}>
            <div className={`flex items-center justify-between border-b pb-3 ${
              theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'
            }`}>
              <h2 className="text-base font-bold font-display">Confirm Polling Unit Adoption</h2>
              <button 
                onClick={() => setSelectedPU(null)} 
                className={`p-1 rounded-lg ${theme === 'dark' ? 'text-neutral-400 hover:text-white' : 'text-slate-400 hover:text-slate-800'}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className={`p-3 rounded-xl border text-xs space-y-1 ${
              theme === 'dark' ? 'bg-black border-neutral-800' : 'bg-emerald-50/50 border-emerald-100'
            }`}>
              <div className="font-bold text-sm text-emerald-500">{selectedPU.name}</div>
              <div className={theme === 'dark' ? 'text-neutral-400' : 'text-slate-600'}>
                Code: {selectedPU.code} · {selectedPU.ward}, {selectedPU.lga}
              </div>
            </div>

            <form onSubmit={handleAdopt} className="space-y-4 text-xs">
              <div>
                <label className={`block mb-1 font-semibold ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'}`}>
                  Your Name / Supporter Title
                </label>
                <input
                  type="text"
                  required
                  value={sponsorName}
                  onChange={(e) => setSponsorName(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-xl transition-colors focus:outline-none ${
                    theme === 'dark'
                      ? 'bg-black border-neutral-800 text-white focus:border-emerald-500'
                      : 'bg-white border-emerald-200 text-slate-900 focus:border-emerald-600 shadow-sm'
                  }`}
                />
              </div>

              <div>
                <label className={`block mb-1 font-semibold ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'}`}>
                  Logistics & Refreshment Contribution (NGN ₦)
                </label>
                <select
                  value={sponsorPledge}
                  onChange={(e) => setSponsorPledge(parseInt(e.target.value, 10))}
                  className={`w-full px-3 py-2 border rounded-xl transition-colors focus:outline-none ${
                    theme === 'dark'
                      ? 'bg-black border-neutral-800 text-white focus:border-emerald-500'
                      : 'bg-white border-emerald-200 text-slate-900 focus:border-emerald-600 shadow-sm'
                  }`}
                >
                  <option value={20000}>₦20,000 (Field Agent Calling Airtime & Data)</option>
                  <option value={50000}>₦50,000 (Agent Stipend + Queue Water/Snacks)</option>
                  <option value={100000}>₦100,000 (Full PU Defense Shield + Powerbanks)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Confirm PU Adoption & Earmark Logistics</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
