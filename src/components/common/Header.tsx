import React, { useState, useEffect } from 'react';
import { PortalSection, PublicNav } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { 
  ChevronDown, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  ShoppingBag,
  ArrowRight,
  Flame,
  Heart,
  Lock,
  Flag
} from 'lucide-react';

interface HeaderProps {
  portal: PortalSection;
  onSelectPortal: (portal: PortalSection) => void;
  publicNav: PublicNav;
  onSelectPublicNav: (nav: PublicNav) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  portal,
  onSelectPortal,
  publicNav,
  onSelectPublicNav,
  cartCount,
  onOpenCart,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Core essential links for top bar
  const primaryNavLinks: { id: PublicNav; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'movement', label: 'The Movement' },
    { id: 'events', label: 'Events' },
    { id: 'news', label: 'News' },
  ];

  // All navigation links for full hamburger menu
  const allNavLinks: { id: PublicNav; label: string; desc?: string }[] = [
    { id: 'home', label: 'Home', desc: 'Campaign overview, youth mandate & live updates' },
    { id: 'about', label: 'About Seyi Tinubu & STYMM', desc: 'Vision, profile and youth leadership' },
    { id: 'movement', label: 'The Movement', desc: 'Decentralized grassroots structure across 36 states' },
    { id: 'achievements', label: 'Achievements & Impact', desc: 'Civic projects, youth empowerment & track record' },
    { id: 'events', label: 'Upcoming Rallies & Events', desc: 'Townhalls, campus tours & mobilization dates' },
    { id: 'news', label: 'News & Press Releases', desc: 'Official statements, disclaimers & media center' },
    { id: 'resources', label: 'Manifesto & Field Manuals', desc: 'Canvasser guides, downloads & policy agenda' },
    { id: 'donate', label: 'Grassroots Campaign Fund', desc: 'Voluntary civic donations & ward funding' },
    { id: 'store', label: 'Official Campaign Store', desc: 'Caps, t-shirts, badges & mobilization merch' },
    { id: 'contact', label: 'Secretariat & Contact', desc: 'Zonal offices, hotlines & field coordinator directory' },
  ];

  const handleNavClick = (id: PublicNav) => {
    onSelectPortal('public');
    onSelectPublicNav(id);
    setMenuOpen(false);
  };

  const handlePortalClick = (targetPortal: PortalSection) => {
    onSelectPortal(targetPortal);
    setMenuOpen(false);
  };

  const handleThemeToggleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleTheme();
  };

  return (
    <>
      <header className={`sticky top-0 z-40 backdrop-blur-md transition-colors duration-200 ${
        theme === 'dark'
          ? 'bg-black/95 border-b border-neutral-800 text-white'
          : 'bg-white/95 border-b border-emerald-100 text-slate-800 shadow-xs'
      }`}>
        {/* Patriotic Green & White Civic Top Band */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800 text-white px-4 py-1 text-xs font-medium">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/20 text-white font-semibold text-[10px] tracking-wide">
                <Flag className="w-3 h-3 text-emerald-300" />
                <span>OFFICIAL YOUTH CAMPAIGN TRAIN</span>
              </span>
              <span className="hidden lg:inline text-emerald-100 font-medium text-[11px]">
                Empowering Nigerian Youth Across 36 States, 774 LGAs & 176,846 Polling Units
              </span>
            </div>

            <div className="flex items-center gap-3 text-emerald-100 text-[11px]">
              <span className="hidden sm:inline font-mono">0800-STYMM-2026</span>
              <span className="hidden sm:inline">·</span>
              <button
                onClick={() => {
                  onSelectPortal('public');
                  onSelectPublicNav('donate');
                }}
                className="text-white hover:text-emerald-200 underline font-semibold transition-colors flex items-center gap-1"
              >
                <Heart className="w-3 h-3 text-rose-300 inline fill-rose-300" />
                <span>Grassroots Fund</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Top Bar - Clean, Spacious & Uncongested */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand / Logo */}
          <button
            onClick={() => {
              onSelectPortal('public');
              onSelectPublicNav('home');
            }}
            className="flex items-center gap-2.5 group text-left shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white flex items-center justify-center font-black text-base shadow-sm group-hover:scale-105 transition-transform border border-emerald-400/30">
              ST
            </div>
            <div>
              <div className={`text-lg sm:text-xl font-black tracking-tight font-display leading-none transition-colors ${
                theme === 'dark' ? 'text-white group-hover:text-emerald-400' : 'text-emerald-950 group-hover:text-emerald-700'
              }`}>
                STYMM
              </div>
              <div className="text-[9px] font-bold tracking-widest text-emerald-600 uppercase">
                Youth Movement
              </div>
            </div>
          </button>

          {/* Primary Navigation - Visible on large screens (xl+) */}
          <nav className="hidden xl:flex items-center gap-6 text-xs sm:text-sm font-semibold">
            {primaryNavLinks.map((link) => {
              const isActive = portal === 'public' && publicNav === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onSelectPortal('public');
                    onSelectPublicNav(link.id);
                  }}
                  className={`transition-all py-1 border-b-2 whitespace-nowrap ${
                    isActive
                      ? 'border-emerald-600 text-emerald-600 font-bold'
                      : theme === 'dark'
                      ? 'border-transparent text-neutral-300 hover:text-white hover:border-neutral-700'
                      : 'border-transparent text-slate-700 hover:text-emerald-700 hover:border-emerald-300'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            <button
              onClick={() => {
                onSelectPortal('public');
                onSelectPublicNav('resources');
              }}
              className={`transition-all py-1 border-b-2 whitespace-nowrap ${
                portal === 'public' && publicNav === 'resources'
                  ? 'border-emerald-600 text-emerald-600 font-bold'
                  : theme === 'dark'
                  ? 'border-transparent text-neutral-300 hover:text-white hover:border-neutral-700'
                  : 'border-transparent text-slate-700 hover:text-emerald-700 hover:border-emerald-300'
              }`}
            >
              Resources
            </button>
          </nav>

          {/* Right Action Controls: Theme Toggle + Cart + Join CTA + Hamburger */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Theme Toggle Button - Strictly Isolated to Light/Dark Mode */}
            <button
              type="button"
              onClick={handleThemeToggleClick}
              aria-label="Toggle dark and light mode"
              className={`p-2 rounded-xl transition-all border shrink-0 ${
                theme === 'dark'
                  ? 'bg-neutral-900 text-amber-300 border-neutral-800 hover:bg-neutral-800'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
              }`}
              title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 pointer-events-none" />
              ) : (
                <Moon className="w-4 h-4 pointer-events-none" />
              )}
            </button>

            {/* Cart Icon trigger if items exist */}
            {cartCount > 0 && (
              <button
                onClick={onOpenCart}
                className={`relative px-2.5 py-1.5 text-xs font-semibold rounded-xl border flex items-center gap-1.5 transition-colors ${
                  theme === 'dark'
                    ? 'bg-neutral-900 text-white border-neutral-800 hover:bg-neutral-800'
                    : 'bg-white text-emerald-900 border-emerald-200 hover:bg-emerald-50'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-bold">{cartCount}</span>
              </button>
            )}

            {/* Join Us CTA */}
            <button
              onClick={() => {
                onSelectPortal('public');
                onSelectPublicNav('join');
              }}
              className="px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl transition-all shadow-xs whitespace-nowrap"
            >
              Join Us
            </button>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`p-2 rounded-xl border flex items-center gap-1.5 transition-all ${
                menuOpen
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                  : theme === 'dark'
                  ? 'bg-neutral-900 text-neutral-200 border-neutral-800 hover:bg-neutral-800 hover:border-neutral-700'
                  : 'bg-emerald-50/80 text-emerald-950 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300'
              }`}
              aria-label="Toggle navigation menu"
              title="Open full navigation directory"
            >
              {menuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
              <span className="hidden sm:inline text-xs font-bold">
                {menuOpen ? 'Close' : 'Menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Hamburger Navigation Drawer Modal / Backdrop */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          {/* Backdrop Blur Overlay */}
          <div 
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs z-[101] transition-opacity animate-fadeIn" 
          />

          {/* Slide-out Drawer Panel - 100% Opaque Solid Background */}
          <div 
            className={`fixed inset-y-0 right-0 max-w-full w-full sm:w-[420px] shadow-2xl flex flex-col z-[102] overflow-y-auto border-l transition-transform duration-300 animate-fadeIn ${
              theme === 'dark' ? 'border-neutral-800 text-white' : 'border-emerald-200 text-slate-900'
            }`}
            style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#ffffff' }}
          >
            {/* Drawer Header - 100% Solid Non-Translucent Top */}
            <div 
              className={`p-4 sm:p-5 border-b flex items-center justify-between sticky top-0 z-20 ${
                theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'
              }`}
              style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#ffffff' }}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-sm">
                  ST
                </div>
                <div>
                  <div className="font-extrabold text-sm font-display leading-tight">
                    STYMM Campaign Directory
                  </div>
                  <div className="text-[10px] text-emerald-500 font-semibold uppercase tracking-wider">
                    Official Youth Movement
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleThemeToggleClick}
                  className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 ${
                    theme === 'dark' ? 'border-neutral-800 text-amber-300' : 'border-emerald-200 text-emerald-800'
                  }`}
                  title="Toggle theme"
                >
                  {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => setMenuOpen(false)}
                  className={`p-1.5 rounded-lg border text-xs ${
                    theme === 'dark' ? 'border-neutral-800 hover:bg-neutral-900' : 'border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Main Navigation Links */}
            <div className="p-4 sm:p-5 space-y-4">
              <div className="space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-500 px-2 py-1">
                  Campaign Navigation
                </div>
                {allNavLinks.map((link) => {
                  const isActive = portal === 'public' && publicNav === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleNavClick(link.id)}
                      className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between group ${
                        isActive
                          ? 'bg-emerald-600 text-white font-bold shadow-xs'
                          : theme === 'dark'
                          ? 'hover:bg-neutral-900 text-neutral-300 hover:text-white'
                          : 'hover:bg-emerald-50 text-slate-700 hover:text-emerald-950'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold group-hover:translate-x-0.5 transition-transform">
                          {link.label}
                        </div>
                        {link.desc && (
                          <div className={`text-[10px] line-clamp-1 ${
                            isActive ? 'text-emerald-100' : 'text-neutral-400'
                          }`}>
                            {link.desc}
                          </div>
                        )}
                      </div>
                      <ChevronDown className={`w-3.5 h-3.5 -rotate-90 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all ${
                        isActive ? 'text-white' : ''
                      }`} />
                    </button>
                  );
                })}
              </div>

              {/* Special Campaign Hubs */}
              <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 px-2 py-1">
                  Civic Engines
                </div>

                <button
                  onClick={() => handlePortalClick('mobile_preview')}
                  className={`w-full text-left p-2.5 rounded-xl text-xs font-medium flex items-center justify-between transition-colors ${
                    theme === 'dark' ? 'hover:bg-neutral-900 text-neutral-300' : 'hover:bg-emerald-50 text-slate-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Flame className="w-3.5 h-3.5 text-amber-500" />
                    Mobile App & Campus Hub
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold">
                    PWA Ready
                  </span>
                </button>
              </div>

              {/* Confidential Field Operatives Gate */}
              <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 px-2 py-1 flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-emerald-500" />
                  <span>Confidential Apparatus</span>
                </div>

                <button
                  onClick={() => handlePortalClick('member')}
                  className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                    portal === 'member'
                      ? 'bg-emerald-600 text-white font-bold'
                      : theme === 'dark'
                      ? 'bg-neutral-900/60 hover:bg-neutral-900 text-neutral-300 border border-neutral-800'
                      : 'bg-slate-50 hover:bg-emerald-50 text-slate-700 border border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-emerald-500" />
                    <div>
                      <div>Accredited Vanguard Portal</div>
                      <div className="text-[10px] text-neutral-400 font-normal">Restricted to verified canvassers</div>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider bg-rose-500/10 text-rose-500 border border-rose-500/20">
                    <Lock className="w-2.5 h-2.5" />
                    <span>Restricted</span>
                  </span>
                </button>
              </div>

              {/* Primary Call to Action in Drawer */}
              <div className="pt-3 pb-6 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
                <button
                  onClick={() => handleNavClick('join')}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm text-center shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>Join The Movement Today</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-center text-[11px] text-neutral-400">
                  <span>Toll-Free Nationwide Hotline: </span>
                  <strong className="text-emerald-500 font-mono">0800-STYMM-2026</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
