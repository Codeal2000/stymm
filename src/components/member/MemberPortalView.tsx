import React, { useState } from 'react';
import { MemberNav, CanvassRecord, StoreItem } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { MemberDashboard } from './MemberDashboard';
import { MemberCanvassing } from './MemberCanvassing';
import { MemberAdoptPU } from './MemberAdoptPU';
import { MemberTraining } from './MemberTraining';
import { MemberHelpDesk } from './MemberHelpDesk';
import { MemberSurveys } from './MemberSurveys';
import { MemberCanvassingAnalytics } from './MemberCanvassingAnalytics';
import { PublicEvents } from '../public/PublicEvents';
import { PublicStore } from '../public/PublicStore';
import {
  LayoutDashboard,
  BarChart3,
  User,
  Users2,
  MapPin,
  ClipboardList,
  Shield,
  Calendar,
  GraduationCap,
  FolderDown,
  BellRing,
  Award,
  Wallet,
  ShoppingBag,
  HelpCircle,
  BookOpen,
  Settings,
  QrCode,
  Share2,
  Download,
  CheckCircle,
  Check,
  Lock,
} from 'lucide-react';
import { VanguardAuthGate } from './VanguardAuthGate';

interface MemberPortalViewProps {
  memberNav: MemberNav;
  onSelectMemberNav: (nav: MemberNav) => void;
  canvassRecords: CanvassRecord[];
  onAddCanvassRecord: (record: CanvassRecord) => void;
  onAddToCart: (item: StoreItem, size?: string) => void;
  onBackToPublic?: () => void;
  onApplyForMembership?: () => void;
}

export const MemberPortalView: React.FC<MemberPortalViewProps> = ({
  memberNav,
  onSelectMemberNav,
  canvassRecords,
  onAddCanvassRecord,
  onAddToCart,
  onBackToPublic,
  onApplyForMembership,
}) => {
  const { theme } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('stymm_vanguard_auth') === 'true';
    }
    return false;
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleAuthenticated = (credentials: { id: string; name: string }) => {
    sessionStorage.setItem('stymm_vanguard_auth', 'true');
    setIsAuthenticated(true);
    showToast(`Access granted. Welcome, ${credentials.name}`);
  };

  const handleLockPortal = () => {
    sessionStorage.removeItem('stymm_vanguard_auth');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <VanguardAuthGate
        onSuccess={handleAuthenticated}
        onBackToPublic={() => onBackToPublic ? onBackToPublic() : window.location.reload()}
        onApplyForMembership={() => onApplyForMembership ? onApplyForMembership() : null}
      />
    );
  }

  const sidebarLinks: { id: MemberNav; label: string; icon: any }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: 'Canvassing Analytics', icon: BarChart3 },
    { id: 'profile', label: 'My Profile & ID Pass', icon: User },
    { id: 'network', label: 'My Network & Squad', icon: Users2 },
    { id: 'ward', label: 'My Ward & PU Radar', icon: MapPin },
    { id: 'canvassing', label: 'Voter Canvassing Log', icon: ClipboardList },
    { id: 'adopt_pu', label: 'Adopt-a-PU', icon: Shield },
    { id: 'events', label: 'Campaign Events', icon: Calendar },
    { id: 'training', label: 'Training Academy', icon: GraduationCap },
    { id: 'content', label: 'Content & Media Library', icon: FolderDown },
    { id: 'news', label: 'News & Internal Alerts', icon: BellRing },
    { id: 'achievements', label: 'Achievements & Badges', icon: Award },
    { id: 'donations', label: 'My Contributions', icon: Wallet },
    { id: 'store', label: 'Campaign Store', icon: ShoppingBag },
    { id: 'surveys', label: 'Ward Voter Surveys', icon: HelpCircle },
    { id: 'helpdesk', label: 'Field FAQ & Guidelines', icon: BookOpen },
    { id: 'settings', label: 'Account Settings', icon: Settings },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">
      {toastMessage && (
        <div className="p-3 bg-emerald-600 text-white rounded-xl text-xs font-semibold flex items-center justify-between shadow-lg animate-fadeIn">
          <span>{toastMessage}</span>
          <Check className="w-4 h-4" />
        </div>
      )}

      {/* Mobile Fast Navigation Scroller (Phones & Tablets) */}
      <div className="lg:hidden w-full space-y-2">
        <div className={`p-3 rounded-2xl border flex items-center justify-between ${
          theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-emerald-100 shadow-sm'
        }`}>
          <div>
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block">
              Member Console
            </span>
            <div className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Kehinde Balogun · Agent #4429
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-500 border border-emerald-500/30">
              Field Active
            </span>
            <button
              onClick={handleLockPortal}
              className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-xl text-rose-500 hover:bg-rose-500/10 border border-rose-500/20 transition-colors"
              title="Lock Vanguard Session"
            >
              <Lock className="w-3 h-3" />
              <span>Lock</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto no-scrollbar pb-1">
          <div className="flex items-center gap-1.5 min-w-max p-1.5 rounded-2xl bg-neutral-100 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800">
            {sidebarLinks.map((item) => {
              const Icon = item.icon;
              const isActive = memberNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectMemberNav(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap active:scale-95 ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : theme === 'dark'
                      ? 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                      : 'text-neutral-600 hover:text-emerald-950 hover:bg-emerald-50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar Menu (Desktop Only) */}
        <div className={`hidden lg:block lg:col-span-3 border rounded-2xl p-4 space-y-4 sticky top-24 transition-all shadow-sm ${
          theme === 'dark' ? 'bg-neutral-900/70 border-neutral-800' : 'bg-white border-emerald-100 shadow-sm'
        }`}>
          <div className={`px-3 py-2 border-b ${theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'}`}>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block">
              Member Console
            </span>
            <div className={`text-sm font-bold truncate ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
              Kehinde Balogun
            </div>
            <div className="flex items-center justify-between mt-1">
              <div className={`text-[11px] font-mono ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                Agent ID #4429
              </div>
              <button
                onClick={handleLockPortal}
                className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded-lg text-rose-500 hover:bg-rose-500/10 border border-rose-500/20 transition-colors"
                title="Lock Vanguard Session"
              >
                <Lock className="w-3 h-3" />
                <span>Lock</span>
              </button>
            </div>
          </div>

          <nav className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto pr-1">
            {sidebarLinks.map((item) => {
              const Icon = item.icon;
              const isActive = memberNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectMemberNav(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-xl transition-all text-left ${
                    isActive
                      ? 'bg-emerald-600 text-white font-bold shadow-sm'
                      : theme === 'dark'
                      ? 'text-slate-300 hover:bg-neutral-800 hover:text-white'
                      : 'text-neutral-700 hover:bg-emerald-50 hover:text-emerald-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-emerald-600'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-9 space-y-6">
          {memberNav === 'dashboard' && (
            <MemberDashboard
              onSelectMemberNav={onSelectMemberNav}
              canvassCount={canvassRecords.length}
            />
          )}

          {memberNav === 'analytics' && (
            <MemberCanvassingAnalytics
              canvassCount={canvassRecords.length}
              canvassRecords={canvassRecords}
              onLogNewCanvass={() => onSelectMemberNav('canvassing')}
            />
          )}

          {memberNav === 'canvassing' && (
            <MemberCanvassing
              records={canvassRecords}
              onAddRecord={onAddCanvassRecord}
            />
          )}

          {memberNav === 'adopt_pu' && <MemberAdoptPU />}

          {memberNav === 'training' && <MemberTraining />}

          {memberNav === 'helpdesk' && <MemberHelpDesk />}

          {memberNav === 'surveys' && <MemberSurveys />}

          {memberNav === 'events' && <PublicEvents />}

          {memberNav === 'store' && <PublicStore onAddToCart={onAddToCart} />}

          {/* Profile & ID View */}
          {memberNav === 'profile' && (
            <div className="space-y-6">
              <div className={`border-b pb-4 ${theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'}`}>
                <h2 className={`text-xl font-bold font-display ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                  My Member Profile & Accreditation
                </h2>
                <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                  Official STYMM Grassroots Member Accreditation Pass
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* ID Card Display */}
                <div className="rounded-3xl p-6 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950 border-2 border-emerald-400/50 shadow-2xl text-white space-y-6">
                  <div className="flex items-center justify-between border-b border-emerald-700 pb-3">
                    <div>
                      <div className="text-xs font-bold tracking-tight">STYMM NATIONAL COUNCIL</div>
                      <div className="text-[10px] text-emerald-300">Certified Canvasser Pass</div>
                    </div>
                    <div className="text-right text-[10px] font-mono text-emerald-200 font-bold">
                      STYMM-LAG-2026-4429
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-4 flex flex-col items-center">
                      <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white text-2xl font-black">
                        KB
                      </div>
                      <div className="mt-2 text-[10px] font-bold text-emerald-300 uppercase">
                        CANVASSER
                      </div>
                    </div>

                    <div className="col-span-8 space-y-1.5 text-xs">
                      <div>
                        <div className="text-[10px] text-emerald-200">NAME</div>
                        <div className="font-bold text-white text-sm">Kehinde Balogun</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-emerald-200">WARD & LGA</div>
                        <div className="font-medium text-emerald-100">Ward 01 (Alausa) · Ikeja, Lagos</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-emerald-200">PRIMARY PU</div>
                        <div className="font-mono text-[11px] text-emerald-300 font-bold">PU 012 - Health Centre Gate</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-emerald-700/60 flex items-center justify-between text-[10px] text-emerald-200">
                    <div className="flex items-center gap-2">
                      <QrCode className="w-8 h-8 text-emerald-300 bg-emerald-950 p-1 rounded-lg border border-emerald-700" />
                      <div>
                        <span className="text-white block font-medium">INEC ACCREDITATION READY</span>
                        <span>Ward Desk Scannable</span>
                      </div>
                    </div>
                    <span className="font-mono text-emerald-300 font-bold px-2 py-0.5 rounded-full bg-emerald-950">
                      ACTIVE
                    </span>
                  </div>
                </div>

                {/* Profile Information details */}
                <div className={`border rounded-2xl p-6 space-y-4 text-xs transition-all shadow-sm ${
                  theme === 'dark' ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-emerald-100'
                }`}>
                  <h3 className={`font-bold text-sm ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                    Canvasser Account Details
                  </h3>
                  <div className="space-y-2">
                    <div className={`flex justify-between py-1.5 border-b ${theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'}`}>
                      <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>Phone:</span>
                      <span className="font-mono font-medium">0803 451 9821</span>
                    </div>
                    <div className={`flex justify-between py-1.5 border-b ${theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'}`}>
                      <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>Email:</span>
                      <span className="font-medium">kehinde.balogun@stymm.ng</span>
                    </div>
                    <div className={`flex justify-between py-1.5 border-b ${theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'}`}>
                      <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>PVC Status:</span>
                      <span className="text-emerald-600 font-bold">Verified & Active</span>
                    </div>
                    <div className={`flex justify-between py-1.5 border-b ${theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'}`}>
                      <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>Recruited Canvassers:</span>
                      <span className="font-mono font-bold text-emerald-600">14 Squad Members</span>
                    </div>
                  </div>

                  <button
                    onClick={() => showToast("Digital ID Pass downloaded successfully!")}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Official ID Pass (PDF)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Network & Squad */}
          {memberNav === 'network' && (
            <div className="space-y-6">
              <div className={`border-b pb-4 ${theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'}`}>
                <h2 className={`text-xl font-bold font-display ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                  My Grassroots Network & Canvasser Squad
                </h2>
                <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                  Canvassers enlisted directly under your ward recruitment link
                </p>
              </div>

              <div className={`p-4 border rounded-2xl flex items-center justify-between text-xs transition-all ${
                theme === 'dark' ? 'bg-neutral-900/80 border-neutral-800' : 'bg-white border-emerald-100 shadow-sm'
              }`}>
                <div>
                  <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>Your Personal Recruitment Link:</span>
                  <div className="font-mono text-emerald-600 font-bold">https://stymm-movement.ng/join?ref=agent-4429</div>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText("https://stymm-movement.ng/join?ref=agent-4429");
                    showToast("Recruitment link copied to clipboard!");
                  }}
                  className={`px-3.5 py-2 rounded-xl font-semibold flex items-center gap-1.5 transition-colors ${
                    theme === 'dark' ? 'bg-neutral-800 hover:bg-neutral-700 text-white' : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}
                >
                  <Share2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copy Link</span>
                </button>
              </div>

              <div className={`border rounded-2xl overflow-hidden transition-all shadow-sm ${
                theme === 'dark' ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-emerald-100'
              }`}>
                <table className="w-full text-left text-xs">
                  <thead className={`uppercase text-[10px] tracking-wider border-b ${
                    theme === 'dark' ? 'bg-black text-slate-400 border-neutral-800' : 'bg-emerald-50/50 text-slate-600 border-emerald-100'
                  }`}>
                    <tr>
                      <th className="py-3 px-4">Canvasser</th>
                      <th className="py-3 px-4">Assigned PU</th>
                      <th className="py-3 px-4">Voters Contacted</th>
                      <th className="py-3 px-4">Training Status</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${theme === 'dark' ? 'divide-neutral-800/60 text-slate-300' : 'divide-emerald-100 text-neutral-700'}`}>
                    <tr>
                      <td className={`py-3 px-4 font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>Rasheed Oladipo</td>
                      <td className="py-3 px-4 font-mono">PU 012 - Health Centre</td>
                      <td className="py-3 px-4 font-mono text-emerald-600 font-bold">48 voters</td>
                      <td className="py-3 px-4 text-emerald-600 font-semibold">Certified</td>
                    </tr>
                    <tr>
                      <td className={`py-3 px-4 font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>Blessing Adebayo</td>
                      <td className="py-3 px-4 font-mono">PU 013 - Alausa Grammar</td>
                      <td className="py-3 px-4 font-mono text-emerald-600 font-bold">36 voters</td>
                      <td className="py-3 px-4 text-emerald-600 font-semibold">Certified</td>
                    </tr>
                    <tr>
                      <td className={`py-3 px-4 font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>Chuka Obi</td>
                      <td className="py-3 px-4 font-mono">PU 014 - Secretariat Gate</td>
                      <td className="py-3 px-4 font-mono text-emerald-600 font-bold">29 voters</td>
                      <td className="py-3 px-4 text-amber-600 font-semibold">Module 2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Ward & PU Radar */}
          {memberNav === 'ward' && (
            <div className="space-y-6">
              <div className={`border-b pb-4 ${theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'}`}>
                <h2 className={`text-xl font-bold font-display ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                  My Ward: Alausa Ward 01 (Ikeja, Lagos)
                </h2>
                <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                  Executive structure and polling unit breakdown
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 card-focus-group">
                <div className={`p-4 border rounded-2xl space-y-1 transition-all shadow-sm ${
                  theme === 'dark' ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-emerald-100'
                }`}>
                  <span className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Registered Ward Voters</span>
                  <div className={`text-2xl font-mono font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>8,450</div>
                  <span className={`text-[11px] ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>Across 22 Polling Units</span>
                </div>
                <div className={`p-4 border rounded-2xl space-y-1 transition-all shadow-sm ${
                  theme === 'dark' ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-emerald-100'
                }`}>
                  <span className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Pledged STYMM Supporters</span>
                  <div className="text-2xl font-mono font-bold text-emerald-600">5,840</div>
                  <span className="text-[11px] text-emerald-600 font-semibold">69.1% of voter register</span>
                </div>
                <div className={`p-4 border rounded-2xl space-y-1 transition-all shadow-sm ${
                  theme === 'dark' ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-emerald-100'
                }`}>
                  <span className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Active Field Agents</span>
                  <div className={`text-2xl font-mono font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>44</div>
                  <span className={`text-[11px] ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>2 agents per PU deployed</span>
                </div>
              </div>
            </div>
          )}

          {/* Content Library */}
          {memberNav === 'content' && (
            <div className="space-y-6">
              <div className={`border-b pb-4 ${theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'}`}>
                <h2 className={`text-xl font-bold font-display ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                  Content Library & Social Toolkits
                </h2>
                <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                  Official flyers, campaign jingles, and WhatsApp graphics
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 card-focus-group">
                <div className={`p-5 border rounded-2xl space-y-3 transition-all shadow-sm ${
                  theme === 'dark' ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-emerald-100'
                }`}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-emerald-600 font-bold font-mono">POSTER KIT 01</span>
                    <span className={theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}>High-Res PNG</span>
                  </div>
                  <h3 className={`font-bold text-sm ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                    Youth Tech Fund ₦50B Infographic Banner
                  </h3>
                  <button
                    onClick={() => showToast("Downloading Poster Kit 01 (PNG)...")}
                    className={`w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                      theme === 'dark' ? 'bg-neutral-800 hover:bg-neutral-700 text-white' : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Download Poster</span>
                  </button>
                </div>

                <div className={`p-5 border rounded-2xl space-y-3 transition-all shadow-sm ${
                  theme === 'dark' ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-emerald-100'
                }`}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-emerald-600 font-bold font-mono">AUDIO JINGLE</span>
                    <span className={theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}>MP3 · 45 secs</span>
                  </div>
                  <h3 className={`font-bold text-sm ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                    Official Grassroots Movement Theme Song (Afrobeats)
                  </h3>
                  <button
                    onClick={() => showToast("Downloading Audio Jingle (MP3)...")}
                    className={`w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                      theme === 'dark' ? 'bg-neutral-800 hover:bg-neutral-700 text-white' : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Download Audio File</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Internal News & Alerts */}
          {memberNav === 'news' && (
            <div className="space-y-4">
              <div className={`border-b pb-4 ${theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'}`}>
                <h2 className={`text-xl font-bold font-display ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                  Internal Field Circulars & Alerts
                </h2>
                <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                  Strictly for accredited canvassers and ward officers
                </p>
              </div>

              <div className={`p-5 border rounded-2xl space-y-2 text-xs transition-all ${
                theme === 'dark'
                  ? 'bg-emerald-950/40 border-emerald-800/80 text-slate-200'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-950'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-600 font-bold">CIRCULAR #08 - PVC RECOVERY ACCELERATION</span>
                  <span className={theme === 'dark' ? 'text-slate-400 font-mono' : 'text-slate-500 font-mono'}>30 Sept 2026</span>
                </div>
                <p className={theme === 'dark' ? 'text-slate-200 leading-relaxed' : 'text-neutral-700 leading-relaxed'}>
                  All canvassers in Lagos and Oyo state are instructed to concentrate door walks this weekend exclusively on voters who indicated &quot;Needs Collection&quot; on their voter registers.
                </p>
              </div>
            </div>
          )}

          {/* Achievements & Badges */}
          {memberNav === 'achievements' && (
            <div className="space-y-6">
              <div className={`border-b pb-4 ${theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'}`}>
                <h2 className={`text-xl font-bold font-display ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                  Canvasser Badges & Ranking
                </h2>
                <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                  Recognizing grassroots dedication
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs card-focus-group">
                <div className={`p-5 border rounded-2xl space-y-2 text-center transition-all ${
                  theme === 'dark' ? 'bg-neutral-900/60 border-emerald-500/80' : 'bg-white border-emerald-300 shadow-sm'
                }`}>
                  <Award className="w-10 h-10 text-emerald-600 mx-auto" />
                  <div className={`font-bold text-sm ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                    Grassroots Centurion
                  </div>
                  <p className={theme === 'dark' ? 'text-slate-400 text-[11px]' : 'text-slate-600 text-[11px]'}>
                    Logged over 100 verified door-to-door voter interactions.
                  </p>
                  <span className="inline-block px-2.5 py-0.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400 font-bold rounded-full text-[10px]">
                    UNLOCKED
                  </span>
                </div>

                <div className={`p-5 border rounded-2xl space-y-2 text-center transition-all ${
                  theme === 'dark' ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-emerald-100 shadow-sm'
                }`}>
                  <Shield className="w-10 h-10 text-slate-400 mx-auto" />
                  <div className={`font-bold text-sm ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                    Ward Defender
                  </div>
                  <p className={theme === 'dark' ? 'text-slate-400 text-[11px]' : 'text-slate-600 text-[11px]'}>
                    Complete BVAS result verification in your primary PU.
                  </p>
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                    theme === 'dark' ? 'bg-neutral-800 text-slate-400' : 'bg-slate-100 text-slate-500'
                  }`}>
                    LOCKED (ELECTION DAY)
                  </span>
                </div>

                <div className={`p-5 border rounded-2xl space-y-2 text-center transition-all ${
                  theme === 'dark' ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-emerald-100 shadow-sm'
                }`}>
                  <Users2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <div className={`font-bold text-sm ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                    Squad Commander
                  </div>
                  <p className={theme === 'dark' ? 'text-slate-400 text-[11px]' : 'text-slate-600 text-[11px]'}>
                    Recruit 10+ certified field canvassers into your network.
                  </p>
                  <span className="inline-block px-2.5 py-0.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400 font-bold rounded-full text-[10px]">
                    UNLOCKED (14/10)
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Donations */}
          {memberNav === 'donations' && (
            <div className="space-y-6">
              <div className={`border-b pb-4 ${theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'}`}>
                <h2 className={`text-xl font-bold font-display ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                  My Contributions & Dues
                </h2>
                <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                  Receipts and disbursement audit for your account
                </p>
              </div>

              <div className={`p-5 border rounded-2xl space-y-3 text-xs transition-all shadow-sm ${
                theme === 'dark' ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-emerald-100'
              }`}>
                <div className="flex justify-between items-center">
                  <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                    Grassroots Supporter Pledge
                  </span>
                  <span className="font-mono text-emerald-600 font-bold text-sm">₦25,000</span>
                </div>
                <div className={theme === 'dark' ? 'text-slate-400 text-[11px]' : 'text-slate-500 text-[11px]'}>
                  Receipt: STYMM-DON-449102 · Verified 28 Sept 2026
                </div>
                <div className={`p-3 rounded-xl border text-[11px] ${
                  theme === 'dark' ? 'bg-black border-neutral-800 text-slate-300' : 'bg-emerald-50/50 border-emerald-100 text-neutral-700'
                }`}>
                  Allocated to: Ikeja LGA Polling Unit Agents Logistic Refreshment Kit
                </div>
              </div>
            </div>
          )}

          {/* Settings */}
          {memberNav === 'settings' && (
            <div className={`border rounded-2xl p-6 space-y-4 text-xs max-w-lg transition-all shadow-sm ${
              theme === 'dark' ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-emerald-100'
            }`}>
              <h2 className={`text-base font-bold font-display ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                Preferences & Communication Settings
              </h2>
              
              <div className="space-y-3">
                <div>
                  <label className={`block mb-1 font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-neutral-700'}`}>
                    Preferred System Language
                  </label>
                  <select className={`w-full px-3 py-2 border rounded-xl transition-colors focus:outline-none ${
                    theme === 'dark'
                      ? 'bg-black border-neutral-800 text-white focus:border-emerald-500'
                      : 'bg-white border-emerald-200 text-neutral-900 focus:border-emerald-600 shadow-sm'
                  }`}>
                    <option>English</option>
                    <option>Yoruba</option>
                    <option>Hausa</option>
                    <option>Igbo</option>
                    <option>Nigerian Pidgin</option>
                  </select>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-emerald-600" />
                    <span className={theme === 'dark' ? 'text-slate-300' : 'text-neutral-700'}>
                      Receive SMS notifications for urgent Ward alerts
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-emerald-600" />
                    <span className={theme === 'dark' ? 'text-slate-300' : 'text-neutral-700'}>
                      Enable location geo-tagging when logging canvassed voters
                    </span>
                  </label>
                </div>

                <button
                  onClick={() => showToast("Preferences saved successfully!")}
                  className="mt-4 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-sm"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
