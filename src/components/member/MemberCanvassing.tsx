import React, { useState } from 'react';
import { CanvassRecord } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { Plus, Search, UserPlus, X } from 'lucide-react';

interface MemberCanvassingProps {
  records: CanvassRecord[];
  onAddRecord: (record: CanvassRecord) => void;
}

export const MemberCanvassing: React.FC<MemberCanvassingProps> = ({ records, onAddRecord }) => {
  const { theme } = useTheme();
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState('');
  const [filterSentiment, setFilterSentiment] = useState('All');

  const [form, setForm] = useState({
    voterName: '',
    phone: '',
    gender: 'Male' as 'Male' | 'Female',
    ageRange: '25-35' as '18-24' | '25-35' | '36-49' | '50+',
    state: 'Lagos',
    lga: 'Ikeja',
    ward: 'Alausa / Ward 01',
    pu: 'PU 012 - Health Centre Alausa',
    pvcStatus: 'Has PVC' as 'Has PVC' | 'Needs Collection' | 'Unregistered',
    supportSentiment: 'Strong Supporter' as 'Strong Supporter' | 'Leaning Supporter' | 'Undecided' | 'Opposed',
    keyIssues: 'Youth Jobs, Electricity, Street Lighting',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.voterName.trim()) return;

    const newRecord: CanvassRecord = {
      id: `canv-${Date.now()}`,
      voterName: form.voterName,
      phone: form.phone || '0800 000 0000',
      gender: form.gender,
      ageRange: form.ageRange,
      state: form.state,
      lga: form.lga,
      ward: form.ward,
      pu: form.pu,
      pvcStatus: form.pvcStatus,
      supportSentiment: form.supportSentiment,
      keyIssues: form.keyIssues.split(',').map((s) => s.trim()),
      notes: form.notes || 'Contacted during ward walking tour. Receptive to manifesto points.',
      canvasserName: 'Kehinde Balogun (Agent ID #4429)',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };

    onAddRecord(newRecord);
    setShowAddModal(false);
    setForm({
      voterName: '',
      phone: '',
      gender: 'Male',
      ageRange: '25-35',
      state: 'Lagos',
      lga: 'Ikeja',
      ward: 'Alausa / Ward 01',
      pu: 'PU 012 - Health Centre Alausa',
      pvcStatus: 'Has PVC',
      supportSentiment: 'Strong Supporter',
      keyIssues: 'Youth Jobs, Electricity, Street Lighting',
      notes: '',
    });
  };

  const filteredRecords = records.filter((r) => {
    const matchesSearch =
      r.voterName.toLowerCase().includes(search.toLowerCase()) ||
      r.pu.toLowerCase().includes(search.toLowerCase()) ||
      r.phone.includes(search);
    const matchesSentiment = filterSentiment === 'All' || r.supportSentiment === filterSentiment;
    return matchesSearch && matchesSentiment;
  });

  return (
    <div className="space-y-6">
      {/* Header & Primary Action */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 transition-colors ${
        theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'
      }`}>
        <div>
          <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
            Field Operations
          </div>
          <h1 className={`text-2xl sm:text-3xl font-extrabold font-display transition-colors ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Door-to-Door Canvassing Log
          </h1>
          <p className={`text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}`}>
            Real-time voter contact records, sentiment classification, and follow-up notes.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center gap-2 self-start sm:self-auto hover:scale-[1.02] active:scale-[0.98]"
        >
          <UserPlus className="w-4 h-4" />
          <span>Log Canvassed Voter</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className={`w-4 h-4 absolute left-3 top-2.5 ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}`} />
          <input
            type="text"
            placeholder="Search voter, PU, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full pl-9 pr-3 py-2 border rounded-xl text-xs transition-colors focus:outline-none ${
              theme === 'dark'
                ? 'bg-neutral-900 border-neutral-800 text-white focus:border-emerald-500'
                : 'bg-white border-emerald-200 text-slate-900 focus:border-emerald-600 shadow-sm'
            }`}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className={`text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-600'}`}>Filter Sentiment:</span>
          <select
            value={filterSentiment}
            onChange={(e) => setFilterSentiment(e.target.value)}
            className={`px-3 py-2 border rounded-xl text-xs transition-colors focus:outline-none ${
              theme === 'dark'
                ? 'bg-neutral-900 border-neutral-800 text-white focus:border-emerald-500'
                : 'bg-white border-emerald-200 text-slate-900 focus:border-emerald-600 shadow-sm'
            }`}
          >
            <option value="All">All Sentiments</option>
            <option value="Strong Supporter">Strong Supporter</option>
            <option value="Leaning Supporter">Leaning Supporter</option>
            <option value="Undecided">Undecided</option>
            <option value="Opposed">Opposed</option>
          </select>
        </div>
      </div>

      {/* Canvassing Table */}
      <div className={`border rounded-2xl overflow-hidden shadow-sm transition-all ${
        theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-emerald-100'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className={`uppercase text-[10px] tracking-wider border-b ${
              theme === 'dark' ? 'bg-black text-neutral-400 border-neutral-800' : 'bg-emerald-50/50 text-slate-600 border-emerald-100'
            }`}>
              <tr>
                <th className="py-3 px-4">Voter Name</th>
                <th className="py-3 px-4">Polling Unit</th>
                <th className="py-3 px-4">PVC Status</th>
                <th className="py-3 px-4">Sentiment</th>
                <th className="py-3 px-4">Key Issues Raised</th>
                <th className="py-3 px-4">Notes</th>
                <th className="py-3 px-4">Logged Time</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${theme === 'dark' ? 'divide-neutral-800' : 'divide-emerald-100'}`}>
              {filteredRecords.map((r) => (
                <tr 
                  key={r.id} 
                  className={`transition-colors ${
                    theme === 'dark' ? 'hover:bg-black/50 text-neutral-300' : 'hover:bg-emerald-50/40 text-slate-700'
                  }`}
                >
                  <td className="py-3 px-4">
                    <div className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{r.voterName}</div>
                    <div className={`text-[10px] font-mono ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}`}>
                      {r.phone} · {r.gender} ({r.ageRange})
                    </div>
                  </td>
                  <td className="py-3 px-4 max-w-[200px] truncate">
                    <span className={theme === 'dark' ? 'text-neutral-200' : 'text-slate-800'}>{r.pu}</span>
                    <div className={`text-[10px] ${theme === 'dark' ? 'text-neutral-500' : 'text-slate-400'}`}>{r.ward}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        r.pvcStatus === 'Has PVC'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                      }`}
                    >
                      {r.pvcStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        r.supportSentiment === 'Strong Supporter'
                          ? 'bg-emerald-600 text-white'
                          : r.supportSentiment === 'Leaning Supporter'
                          ? 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300'
                          : r.supportSentiment === 'Undecided'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      }`}
                    >
                      {r.supportSentiment}
                    </span>
                  </td>
                  <td className="py-3 px-4 max-w-[180px]">
                    <div className="flex flex-wrap gap-1">
                      {r.keyIssues.map((issue, idx) => (
                        <span 
                          key={idx} 
                          className={`px-1.5 py-0.5 rounded-md text-[9px] border font-medium ${
                            theme === 'dark' 
                              ? 'bg-black text-neutral-300 border-neutral-800' 
                              : 'bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          {issue}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className={`py-3 px-4 max-w-[220px] truncate text-[11px] ${
                    theme === 'dark' ? 'text-neutral-400' : 'text-slate-600'
                  }`} title={r.notes}>
                    {r.notes}
                  </td>
                  <td className={`py-3 px-4 font-mono text-[10px] whitespace-nowrap ${
                    theme === 'dark' ? 'text-neutral-500' : 'text-slate-400'
                  }`}>
                    {r.createdAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Canvass Record Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className={`border rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl transition-colors ${
            theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-emerald-100 text-slate-900'
          }`}>
            <div className={`flex items-center justify-between border-b pb-3 ${
              theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'
            }`}>
              <h3 className="font-bold text-base font-display">Log New Canvassed Voter</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className={`p-1 rounded-lg ${theme === 'dark' ? 'text-neutral-400 hover:text-white' : 'text-slate-400 hover:text-slate-800'}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block mb-1 font-semibold ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'}`}>
                    Voter Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.voterName}
                    onChange={(e) => setForm({ ...form, voterName: e.target.value })}
                    placeholder="e.g. Samuel Adeyinka"
                    className={`w-full px-3 py-2 border rounded-xl transition-colors focus:outline-none ${
                      theme === 'dark'
                        ? 'bg-black border-neutral-800 text-white focus:border-emerald-500'
                        : 'bg-white border-emerald-200 text-slate-900 focus:border-emerald-600 shadow-sm'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block mb-1 font-semibold ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'}`}>
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="0803 000 0000"
                    className={`w-full px-3 py-2 border rounded-xl transition-colors focus:outline-none ${
                      theme === 'dark'
                        ? 'bg-black border-neutral-800 text-white focus:border-emerald-500'
                        : 'bg-white border-emerald-200 text-slate-900 focus:border-emerald-600 shadow-sm'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className={`block mb-1 font-semibold ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'}`}>
                    Gender
                  </label>
                  <select
                    value={form.gender}
                    onChange={(e) => setForm({ ...form, gender: e.target.value as any })}
                    className={`w-full px-3 py-2 border rounded-xl transition-colors focus:outline-none ${
                      theme === 'dark'
                        ? 'bg-black border-neutral-800 text-white focus:border-emerald-500'
                        : 'bg-white border-emerald-200 text-slate-900 focus:border-emerald-600 shadow-sm'
                    }`}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label className={`block mb-1 font-semibold ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'}`}>
                    Age Range
                  </label>
                  <select
                    value={form.ageRange}
                    onChange={(e) => setForm({ ...form, ageRange: e.target.value as any })}
                    className={`w-full px-3 py-2 border rounded-xl transition-colors focus:outline-none ${
                      theme === 'dark'
                        ? 'bg-black border-neutral-800 text-white focus:border-emerald-500'
                        : 'bg-white border-emerald-200 text-slate-900 focus:border-emerald-600 shadow-sm'
                    }`}
                  >
                    <option value="18-24">18-24</option>
                    <option value="25-35">25-35</option>
                    <option value="36-49">36-49</option>
                    <option value="50+">50+</option>
                  </select>
                </div>
                <div>
                  <label className={`block mb-1 font-semibold ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'}`}>
                    PVC Status
                  </label>
                  <select
                    value={form.pvcStatus}
                    onChange={(e) => setForm({ ...form, pvcStatus: e.target.value as any })}
                    className={`w-full px-3 py-2 border rounded-xl transition-colors focus:outline-none ${
                      theme === 'dark'
                        ? 'bg-black border-neutral-800 text-white focus:border-emerald-500'
                        : 'bg-white border-emerald-200 text-slate-900 focus:border-emerald-600 shadow-sm'
                    }`}
                  >
                    <option value="Has PVC">Has PVC</option>
                    <option value="Needs Collection">Needs Collection</option>
                    <option value="Unregistered">Unregistered</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={`block mb-1 font-semibold ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'}`}>
                  Polling Unit (PU)
                </label>
                <input
                  type="text"
                  required
                  value={form.pu}
                  onChange={(e) => setForm({ ...form, pu: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-xl transition-colors focus:outline-none ${
                    theme === 'dark'
                      ? 'bg-black border-neutral-800 text-white focus:border-emerald-500'
                      : 'bg-white border-emerald-200 text-slate-900 focus:border-emerald-600 shadow-sm'
                  }`}
                />
              </div>

              <div>
                <label className={`block mb-1 font-semibold ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'}`}>
                  Support Sentiment
                </label>
                <select
                  value={form.supportSentiment}
                  onChange={(e) => setForm({ ...form, supportSentiment: e.target.value as any })}
                  className={`w-full px-3 py-2 border rounded-xl transition-colors focus:outline-none ${
                    theme === 'dark'
                      ? 'bg-black border-neutral-800 text-white focus:border-emerald-500'
                      : 'bg-white border-emerald-200 text-slate-900 focus:border-emerald-600 shadow-sm'
                  }`}
                >
                  <option value="Strong Supporter">Strong Supporter</option>
                  <option value="Leaning Supporter">Leaning Supporter</option>
                  <option value="Undecided">Undecided</option>
                  <option value="Opposed">Opposed</option>
                </select>
              </div>

              <div>
                <label className={`block mb-1 font-semibold ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'}`}>
                  Key Issues / Interests
                </label>
                <input
                  type="text"
                  value={form.keyIssues}
                  onChange={(e) => setForm({ ...form, keyIssues: e.target.value })}
                  placeholder="e.g. Youth Jobs, Power, SME Loans"
                  className={`w-full px-3 py-2 border rounded-xl transition-colors focus:outline-none ${
                    theme === 'dark'
                      ? 'bg-black border-neutral-800 text-white focus:border-emerald-500'
                      : 'bg-white border-emerald-200 text-slate-900 focus:border-emerald-600 shadow-sm'
                  }`}
                />
              </div>

              <div>
                <label className={`block mb-1 font-semibold ${theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'}`}>
                  Interaction Notes
                </label>
                <textarea
                  rows={2}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Any commitments made, follow-up date, or PVC assistance needed..."
                  className={`w-full px-3 py-2 border rounded-xl transition-colors focus:outline-none ${
                    theme === 'dark'
                      ? 'bg-black border-neutral-800 text-white focus:border-emerald-500'
                      : 'bg-white border-emerald-200 text-slate-900 focus:border-emerald-600 shadow-sm'
                  }`}
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className={`px-4 py-2 rounded-xl font-bold border transition-colors ${
                    theme === 'dark' ? 'border-neutral-800 text-neutral-300 hover:bg-neutral-800' : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-md transition-all"
                >
                  Save Canvass Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
