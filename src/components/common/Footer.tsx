import React from 'react';
import { PublicNav, PortalSection, AdminRole } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface FooterProps {
  onSelectPublicNav: (nav: PublicNav) => void;
  onSelectPortal: (portal: PortalSection, role?: AdminRole) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectPublicNav, onSelectPortal }) => {
  const { theme } = useTheme();

  return (
    <footer className={`border-t transition-colors duration-200 text-sm ${
      theme === 'dark'
        ? 'bg-black border-neutral-900 text-neutral-400'
        : 'bg-emerald-950 border-emerald-900 text-emerald-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow">
                ST
              </span>
              <span className="text-xl font-bold tracking-tight text-white font-display">
                STYMM
              </span>
            </div>
            <p className="text-xs leading-relaxed opacity-80">
              Decentralized grassroots civic and electoral mobilization platform empowering youth across all 36 States, 774 LGAs, and 176,846 Polling Units in Nigeria.
            </p>
            <div className="text-xs text-emerald-400 font-medium">
              National Campaign Headquarters: Central Business District, Abuja FCT
            </div>
          </div>

          {/* Public Website links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Public Movement</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => { onSelectPortal('public'); onSelectPublicNav('about'); }} className="hover:text-white transition-colors">
                  About Candidate & Leadership
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectPortal('public'); onSelectPublicNav('movement'); }} className="hover:text-white transition-colors">
                  The STYMM Charter & Vision
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectPortal('public'); onSelectPublicNav('achievements'); }} className="hover:text-white transition-colors">
                  Tangible Youth Impact Milestones
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectPortal('public'); onSelectPublicNav('events'); }} className="hover:text-white transition-colors">
                  Rallies & Town Hall Dates
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectPortal('public'); onSelectPublicNav('resources'); }} className="hover:text-white transition-colors">
                  Download Manifesto & Media Toolkit
                </button>
              </li>
            </ul>
          </div>

          {/* Member Operations */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Field Mobilization</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectPortal('member')} className="hover:text-white transition-colors">
                  Member Portal & Canvasser Log
                </button>
              </li>
              <li>
                <button onClick={() => onSelectPortal('member')} className="hover:text-white transition-colors">
                  Adopt-a-Polling-Unit (PU) Initiative
                </button>
              </li>
              <li>
                <button onClick={() => onSelectPortal('member')} className="hover:text-white transition-colors">
                  STYMM Training Academy
                </button>
              </li>
              <li>
                <button onClick={() => onSelectPortal('admin')} className="hover:text-white transition-colors">
                  Coordinator Command Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onSelectPortal('mobile_preview')} className="hover:text-white transition-colors">
                  Specialized Portals & Campus Hub
                </button>
              </li>
            </ul>
          </div>

          {/* Grassroots Fund & Transparency */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Compliance & Civic Support</h4>
            <p className="text-xs leading-relaxed opacity-80">
              Official STYMM Grassroots Fund is audited for transparent campaign financing, poll agent welfare, and voter logistics.
            </p>
            <div className="pt-2">
              <button
                onClick={() => { onSelectPortal('public'); onSelectPublicNav('donate'); }}
                className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md hover:shadow-emerald-500/20"
              >
                Contribute to Grassroots Fund
              </button>
            </div>
          </div>
        </div>

        {/* Bottom divider and quiet copyright */}
        <div className={`mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between text-xs gap-4 ${
          theme === 'dark' ? 'border-slate-800 text-slate-500' : 'border-emerald-900 text-emerald-300/80'
        }`}>
          <p className="select-none">
            <span
              onDoubleClick={(e) => {
                e.stopPropagation();
                onSelectPortal('admin', 'developer');
              }}
              title="Developer Admin Console (Double-click)"
              className="cursor-pointer font-bold hover:text-emerald-400 transition-colors inline-block text-sm mr-0.5"
            >
              ©
            </span>{' '}
            <span
              onDoubleClick={() => onSelectPortal('admin', 'developer')}
              title="Developer Admin Console (Double-click)"
              className="cursor-pointer"
            >
              2026 Seyi Tinubu Youth Mobilization Movement (STYMM). All rights reserved.
            </span>
          </p>
          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span>Electoral Code of Conduct</span>
            <span aria-hidden="true">·</span>
            <span>Non-Violent Civic Charter</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
