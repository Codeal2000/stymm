import React, { useState } from 'react';
import { PortalSection, PublicNav } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { useCampaignMedia } from '../../context/CampaignMediaContext';
import { 
  ChevronDown, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  ShoppingBag,
  ShieldCheck,
  UserCheck,
  Image as ImageIcon
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
  const { setIsMediaManagerOpen } = useCampaignMedia();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PublicNav; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'movement', label: 'The Movement' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'events', label: 'Events' },
    { id: 'news', label: 'News & Media' },
  ];

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md transition-colors duration-200 ${
      theme === 'dark'
        ? 'bg-black/95 border-b border-neutral-800 text-white'
        : 'bg-white/95 border-b border-emerald-100 text-slate-800 shadow-sm'
    }`}>
      {/* Patriotic Green & White Civic Top Band */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800 text-white px-4 py-1.5 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/20 text-white font-semibold text-[11px] tracking-wide">
              🇳🇬 OFFICIAL YOUTH CAMPAIGN TRAIN
            </span>
            <span className="hidden md:inline text-emerald-100 font-medium">
              Empowering Nigerian Youth Across All 36 States, 774 LGAs & 176,846 Polling Units
            </span>
          </div>

          <div className="flex items-center gap-4 text-emerald-100 text-[11px]">
            <span className="hidden sm:inline font-mono">Toll-Free Hotline: 0800-STYMM-2026</span>
            <span className="hidden sm:inline">·</span>
            <button
              onClick={() => {
                onSelectPortal('public');
                onSelectPublicNav('donate');
              }}
              className="text-white hover:text-emerald-200 underline font-semibold transition-colors"
            >
              Grassroots Fund
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => {
            onSelectPortal('public');
            onSelectPublicNav('home');
          }}
          className="flex items-center gap-3 group text-left"
        >
          {/* Authentic Nigerian Green & White Campaign Emblem */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white flex items-center justify-center font-black text-lg shadow-md group-hover:scale-105 transition-transform border-2 border-emerald-400/40">
            ST
          </div>
          <div>
            <div className={`text-xl sm:text-2xl font-black tracking-tight font-display leading-none transition-colors ${
              theme === 'dark' ? 'text-white group-hover:text-emerald-400' : 'text-emerald-950 group-hover:text-emerald-700'
            }`}>
              STYMM
            </div>
            <div className="text-[10px] font-bold tracking-widest text-emerald-600 uppercase">
              Youth Mobilization Movement
            </div>
          </div>
        </button>

        {/* Main Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold">
          {navLinks.map((link) => {
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

          {/* More Dropdown */}
          <div className="relative group">
            <button
              className={`flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap ${
                theme === 'dark' ? 'text-neutral-300 hover:text-white' : 'text-slate-700 hover:text-emerald-700'
              }`}
            >
              <span>Explore</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            <div className={`absolute top-full left-0 mt-2 w-56 rounded-2xl shadow-2xl py-2 hidden group-hover:block border backdrop-blur-lg ${
              theme === 'dark'
                ? 'bg-neutral-900 border-neutral-800 text-neutral-200'
                : 'bg-white border-emerald-100 text-slate-800'
            }`}>
              <button
                onClick={() => {
                  onSelectPortal('public');
                  onSelectPublicNav('resources');
                }}
                className={`w-full text-left px-4 py-2.5 text-xs font-medium transition-colors ${
                  theme === 'dark' ? 'hover:bg-neutral-800 hover:text-white' : 'hover:bg-emerald-50 hover:text-emerald-900'
                }`}
              >
                Manifesto & Resources
              </button>
              <button
                onClick={() => {
                  onSelectPortal('public');
                  onSelectPublicNav('donate');
                }}
                className={`w-full text-left px-4 py-2.5 text-xs font-medium transition-colors ${
                  theme === 'dark' ? 'hover:bg-neutral-800 hover:text-white' : 'hover:bg-emerald-50 hover:text-emerald-900'
                }`}
              >
                Grassroots Campaign Fund
              </button>
              <button
                onClick={() => {
                  onSelectPortal('public');
                  onSelectPublicNav('store');
                }}
                className={`w-full text-left px-4 py-2.5 text-xs font-medium transition-colors flex items-center justify-between ${
                  theme === 'dark' ? 'hover:bg-neutral-800 hover:text-white' : 'hover:bg-emerald-50 hover:text-emerald-900'
                }`}
              >
                <span>Campaign Store</span>
                {cartCount > 0 && (
                  <span className="bg-emerald-600 text-white font-bold px-1.5 py-0.5 rounded-full text-[10px]">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => {
                  onSelectPortal('public');
                  onSelectPublicNav('contact');
                }}
                className={`w-full text-left px-4 py-2.5 text-xs font-medium transition-colors ${
                  theme === 'dark' ? 'hover:bg-neutral-800 hover:text-white' : 'hover:bg-emerald-50 hover:text-emerald-900'
                }`}
              >
                Secretariat & Contact
              </button>
              <div className={`my-1 border-t ${theme === 'dark' ? 'border-neutral-800' : 'border-slate-100'}`} />
              <button
                onClick={() => onSelectPortal('mobile_preview')}
                className={`w-full text-left px-4 py-2.5 text-xs font-medium transition-colors ${
                  theme === 'dark' ? 'hover:bg-neutral-800 hover:text-emerald-400' : 'hover:bg-emerald-50 hover:text-emerald-700'
                }`}
              >
                Mobile App & Campus Hub
              </button>
            </div>
          </div>
        </nav>

        {/* Action Controls: Theme Toggle + Member Portal + Join Us CTA */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark and light mode"
            className={`p-2 rounded-xl transition-all border ${
              theme === 'dark'
                ? 'bg-neutral-900 text-amber-300 border-neutral-800 hover:bg-neutral-800 hover:border-amber-400/50'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300'
            }`}
            title={theme === 'dark' ? 'Switch to Green & White Light Theme' : 'Switch to Pitch Black Dark Theme'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 animate-spin-slow" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          {/* Cart Icon trigger if items exist */}
          {cartCount > 0 && (
            <button
              onClick={onOpenCart}
              className={`relative px-3 py-2 text-xs font-semibold rounded-xl border flex items-center gap-1.5 transition-colors ${
                theme === 'dark'
                  ? 'bg-neutral-900 text-white border-neutral-800 hover:bg-neutral-800'
                  : 'bg-white text-emerald-900 border-emerald-200 hover:bg-emerald-50'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
              <span>Cart ({cartCount})</span>
            </button>
          )}

          {/* Member Portal Button */}
          <button
            onClick={() => {
              if (portal === 'member') {
                onSelectPortal('public');
                onSelectPublicNav('home');
              } else {
                onSelectPortal('member');
              }
            }}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl border transition-all whitespace-nowrap ${
              portal === 'member'
                ? 'bg-emerald-600 text-white border-emerald-500'
                : theme === 'dark'
                ? 'bg-neutral-900 text-neutral-200 hover:bg-neutral-800 border-neutral-800'
                : 'bg-white text-slate-800 hover:bg-emerald-50 border-emerald-200'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{portal === 'member' ? 'Exit Portal' : 'Member Portal'}</span>
          </button>

          {/* Join Us CTA */}
          <button
            onClick={() => {
              onSelectPortal('public');
              onSelectPublicNav('join');
            }}
            className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl transition-all shadow-sm hover:shadow-emerald-600/30 whitespace-nowrap"
          >
            Join The Movement
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-xl border ${
              theme === 'dark'
                ? 'text-neutral-300 border-neutral-800 hover:bg-neutral-900'
                : 'text-slate-700 border-emerald-200 hover:bg-emerald-50'
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-b px-4 pt-3 pb-6 space-y-4 ${
          theme === 'dark'
            ? 'bg-black border-neutral-800 text-white'
            : 'bg-white border-emerald-100 text-slate-900'
        }`}>
          <div className="text-[11px] uppercase tracking-wider text-emerald-600 font-bold px-2">Navigation</div>
          <div className="grid grid-cols-2 gap-2">
            {[...navLinks, { id: 'resources' as PublicNav, label: 'Resources' }, { id: 'donate' as PublicNav, label: 'Grassroots Fund' }, { id: 'store' as PublicNav, label: 'Campaign Store' }, { id: 'contact' as PublicNav, label: 'Contact' }].map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onSelectPortal('public');
                  onSelectPublicNav(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 text-xs rounded-xl font-medium transition-colors ${
                  portal === 'public' && publicNav === link.id
                    ? 'bg-emerald-600 text-white font-bold'
                    : theme === 'dark'
                    ? 'text-neutral-300 hover:bg-neutral-900'
                    : 'text-slate-700 hover:bg-emerald-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className={`pt-3 border-t space-y-2 ${theme === 'dark' ? 'border-neutral-800' : 'border-slate-100'}`}>
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-semibold text-neutral-400">Theme</span>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200"
              >
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => {
                  onSelectPortal('member');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 p-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs shadow-sm"
              >
                <UserCheck className="w-4 h-4" />
                Member Portal
              </button>
              <button
                onClick={() => {
                  onSelectPortal('admin');
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl text-xs font-bold border ${
                  theme === 'dark'
                    ? 'bg-neutral-900 text-white border-neutral-800'
                    : 'bg-white text-slate-800 border-slate-200'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Admin Command
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
