import React, { useState } from 'react';
import { STATES_AND_LGAS } from '../../data/campaignData';
import { useTheme } from '../../context/ThemeContext';
import { AdminRole } from '../../types';
import { DeveloperMediaManager } from './DeveloperMediaManager';
import {
  ShieldCheck,
  Users,
  Target,
  MapPin,
  Download,
  AlertCircle,
  Plus,
  CheckCircle2,
  Image as ImageIcon,
  ArrowLeft,
  Wrench
} from 'lucide-react';

export const AdminDashboards: React.FC<{ initialRole?: AdminRole | string; onBackToPublic?: () => void }> = ({ 
  initialRole, 
  onBackToPublic 
}) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'overview' | 'incidents' | 'media'>(
    initialRole === 'developer' ? 'media' : 'overview'
  );
  const [incidents, setIncidents] = useState([
    {
      id: 1,
      state: 'Lagos',
      location: 'Ikeja Ward 01',
      report: 'High turnout for PVC collection desk; additional voter guide manuals requested.',
      time: '10:30 AM',
      status: 'Resolved',
    },
    {
      id: 2,
      state: 'Kano',
      location: 'Nasarawa Ward 04',
      report: 'Peaceful youth town hall rally concluded with 450 new volunteer pledges.',
      time: '09:15 AM',
      status: 'Active',
    },
  ]);

  const [newLocation, setNewLocation] = useState('');
  const [newReport, setNewReport] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [exported, setExported] = useState(false);

  const handleAddIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReport.trim()) return;
    setIncidents([
      {
        id: Date.now(),
        state: 'National',
        location: newLocation || 'Ward Central Command',
        report: newReport,
        time: 'Just now',
        status: 'Active',
      },
      ...incidents,
    ]);
    setNewLocation('');
    setNewReport('');
    setShowAddModal(false);
  };

  const handleExport = () => {
    setExported(true);
    setTimeout(() => setExported(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header & Breadcrumb */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 transition-colors ${
        theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'
      }`}>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {onBackToPublic && (
              <button
                onClick={onBackToPublic}
                className="inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-emerald-500 font-semibold mr-2 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Exit to Website</span>
              </button>
            )}
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
              {initialRole === 'developer' ? 'Developer Command Console' : 'Campaign Administration'}
            </span>
          </div>
          <h1 className={`text-2xl sm:text-3xl font-extrabold font-display transition-colors ${
            theme === 'dark' ? 'text-white' : 'text-neutral-900'
          }`}>
            {activeTab === 'media' ? 'Developer Media & Photo Manager' : 'National Mobilization Dashboard'}
          </h1>
          <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            {activeTab === 'media' 
              ? 'Permanently update website photos and assets with zero AI alteration.'
              : 'Overview of grassroots coverage, state voter targets, and field coordination.'}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {activeTab !== 'media' && (
            <button
              onClick={handleExport}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Download className="w-4 h-4" />
              <span>{exported ? 'Report Downloaded!' : 'Export Summary (CSV)'}</span>
            </button>
          )}

          {onBackToPublic && (
            <button
              onClick={onBackToPublic}
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-colors ${
                theme === 'dark' 
                  ? 'border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-white' 
                  : 'border-slate-300 bg-white hover:bg-slate-100 text-slate-800 shadow-sm'
              }`}
            >
              Return to Website
            </button>
          )}
        </div>
      </div>

      {/* Admin / Developer Tab Switcher */}
      <div className={`p-1.5 rounded-2xl border flex flex-wrap gap-2 ${
        theme === 'dark' ? 'bg-neutral-900/90 border-neutral-800' : 'bg-slate-100/80 border-slate-200'
      }`}>
        <button
          onClick={() => setActiveTab('media')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'media'
              ? 'bg-emerald-600 text-white shadow-md'
              : theme === 'dark'
              ? 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white'
          }`}
        >
          <Wrench className="w-3.5 h-3.5" />
          <span>🛠️ Permanent Media & Photos</span>
          {initialRole === 'developer' && (
            <span className="px-1.5 py-0.2 rounded-md bg-white/20 text-[10px]">Dev</span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'overview'
              ? 'bg-emerald-600 text-white shadow-md'
              : theme === 'dark'
              ? 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white'
          }`}
        >
          <Target className="w-3.5 h-3.5" />
          <span>Mobilization Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('incidents')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'incidents'
              ? 'bg-emerald-600 text-white shadow-md'
              : theme === 'dark'
              ? 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white'
          }`}
        >
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Incident & Field Dispatches</span>
        </button>
      </div>

      {/* Tab Content: Developer Media Asset Manager */}
      {activeTab === 'media' && (
        <DeveloperMediaManager />
      )}

      {/* Tab Content: Standard Admin Overview & Incidents */}
      {activeTab !== 'media' && (
        <>

      {/* 4 Basic KPI Cards with card-focus-group */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 card-focus-group">
        <div className={`border rounded-2xl p-5 space-y-2 transition-all shadow-sm ${
          theme === 'dark' ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-emerald-100'
        }`}>
          <div className={`flex items-center justify-between text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            <span>Pledged Youth Voters</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className={`text-2xl font-extrabold font-mono tabular-nums ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
            17,940,200
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold">
            62.9% of national 28.5M target
          </div>
        </div>

        <div className={`border rounded-2xl p-5 space-y-2 transition-all shadow-sm ${
          theme === 'dark' ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-emerald-100'
        }`}>
          <div className={`flex items-center justify-between text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            <span>Polling Units Covered</span>
            <Target className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 font-mono tabular-nums">
            94,210 / 176,846
          </div>
          <div className={`text-[11px] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            Accredited agents active in 53% PUs
          </div>
        </div>

        <div className={`border rounded-2xl p-5 space-y-2 transition-all shadow-sm ${
          theme === 'dark' ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-emerald-100'
        }`}>
          <div className={`flex items-center justify-between text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            <span>Active Field Canvassers</span>
            <MapPin className="w-4 h-4 text-emerald-600" />
          </div>
          <div className={`text-2xl font-extrabold font-mono tabular-nums ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
            124,580
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold">
            Across 774 Local Government Areas
          </div>
        </div>

        <div className={`border rounded-2xl p-5 space-y-2 transition-all shadow-sm ${
          theme === 'dark' ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-emerald-100'
        }`}>
          <div className={`flex items-center justify-between text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            <span>State Campaign Desks</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className={`text-2xl font-extrabold font-mono tabular-nums ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
            36 + FCT
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold">
            100% Secretariats verified
          </div>
        </div>
      </div>

      {/* State Mobilization Overview Table */}
      <div className={`border rounded-2xl overflow-hidden shadow-sm transition-all ${
        theme === 'dark' ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-emerald-100'
      }`}>
        <div className={`p-4 sm:p-5 border-b flex items-center justify-between ${
          theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'
        }`}>
          <div>
            <h2 className={`font-bold text-base font-display ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
              State-by-State Mobilization Status
            </h2>
            <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              Real-time voter contact and coverage across geopolitical zones
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className={`uppercase text-[10px] tracking-wider border-b ${
              theme === 'dark' ? 'bg-black text-slate-400 border-neutral-800' : 'bg-emerald-50/50 text-slate-600 border-emerald-100'
            }`}>
              <tr>
                <th className="py-3 px-4">State</th>
                <th className="py-3 px-4">Sample LGAs</th>
                <th className="py-3 px-4">Youth Voter Target</th>
                <th className="py-3 px-4">Coverage Target</th>
                <th className="py-3 px-4">Active Canvassers</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${theme === 'dark' ? 'divide-neutral-800/60 text-slate-300' : 'divide-emerald-100 text-neutral-700'}`}>
              {STATES_AND_LGAS.map((st) => (
                <tr key={st.name} className={theme === 'dark' ? 'hover:bg-neutral-800/40' : 'hover:bg-emerald-50/40'}>
                  <td className={`py-3 px-4 font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                    {st.name} State
                  </td>
                  <td className={`py-3 px-4 max-w-[200px] truncate ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    {st.lgas.join(', ')}
                  </td>
                  <td className="py-3 px-4 font-mono font-medium">{st.targetVoters}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-20 h-1.5 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-neutral-800' : 'bg-slate-200'}`}>
                        <div className="h-full bg-emerald-600" style={{ width: `${st.coveragePercentage}%` }} />
                      </div>
                      <span className="font-mono text-emerald-600 font-bold">{st.coveragePercentage}%</span>
                    </div>
                  </td>
                  <td className={`py-3 px-4 font-mono ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                    {(st.coveragePercentage * 180).toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                      Operational
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Field Activity Log */}
      <div className={`border rounded-2xl p-5 sm:p-6 space-y-4 transition-all shadow-sm ${
        theme === 'dark' ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-emerald-100'
      }`}>
        <div className={`flex items-center justify-between border-b pb-3 ${
          theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'
        }`}>
          <div>
            <h2 className={`font-bold text-base font-display ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
              Recent Field Dispatches & Activity Log
            </h2>
            <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              Operational memos from state secretariats and ward coordinators
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Dispatch</span>
          </button>
        </div>

        <div className="space-y-3">
          {incidents.map((inc) => (
            <div
              key={inc.id}
              className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition-colors ${
                theme === 'dark' ? 'bg-black/70 border-neutral-800' : 'bg-emerald-50/30 border-emerald-100'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>{inc.location}</span>
                  <span className={`text-[10px] ${theme === 'dark' ? 'text-slate-400 font-mono' : 'text-slate-500 font-mono'}`}>· {inc.time}</span>
                </div>
                <p className={theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}>{inc.report}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {inc.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for adding dispatch */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className={`border rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl transition-colors ${
            theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-emerald-100 text-neutral-900'
          }`}>
            <h3 className="font-bold text-base font-display">Log Field Dispatch</h3>
            <form onSubmit={handleAddIncident} className="space-y-3 text-xs">
              <div>
                <label className={`block mb-1 font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-neutral-700'}`}>
                  Location / Ward
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Surulere Ward 02"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-xl transition-colors focus:outline-none ${
                    theme === 'dark'
                      ? 'bg-black border-neutral-800 text-white focus:border-emerald-500'
                      : 'bg-white border-emerald-200 text-neutral-900 focus:border-emerald-600 shadow-sm'
                  }`}
                />
              </div>

              <div>
                <label className={`block mb-1 font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-neutral-700'}`}>
                  Operational Dispatch Notes
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Details of voter outreach or equipment status..."
                  value={newReport}
                  onChange={(e) => setNewReport(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-xl transition-colors focus:outline-none ${
                    theme === 'dark'
                      ? 'bg-black border-neutral-800 text-white focus:border-emerald-500'
                      : 'bg-white border-emerald-200 text-neutral-900 focus:border-emerald-600 shadow-sm'
                  }`}
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-sm"
                >
                  Save Dispatch
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className={`px-4 py-2.5 border rounded-xl font-semibold transition-colors ${
                    theme === 'dark' ? 'border-neutral-800 text-slate-300 hover:bg-neutral-800' : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </>
      )}
    </div>
  );
};
