import React, { useState } from 'react';
import { Download, Share2, Check, FileText } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const PublicResources: React.FC = () => {
  const { theme } = useTheme();
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [downloadingTitle, setDownloadingTitle] = useState<string | null>(null);

  const documents = [
    {
      title: "The Official STYMM 4-Pillar Manifesto (Complete PDF)",
      category: "Policy Document",
      size: "4.8 MB",
      description: "In-depth policy document outlining the Youth Tech Fund, grassroots polling unit infrastructure, and vocational curricula.",
    },
    {
      title: "Grassroots Canvasser Door-to-Door Playbook 2026",
      category: "Field Operations",
      size: "2.1 MB",
      description: "Essential tactical guide for conversation pacing, voter questions, objections handling, and peaceful de-escalation.",
    },
    {
      title: "INEC Polling Unit Agent Vigilance Manual",
      category: "Electoral Compliance",
      size: "1.9 MB",
      description: "Official guide on Form EC8A collation, BVAS accreditation inspection, and election day non-violent monitoring protocols.",
    },
    {
      title: "Youth Digital Economy Whitepaper & Grant Guidelines",
      category: "Economic Blueprint",
      size: "3.2 MB",
      description: "Framework detailing how the ₦50B youth fund will be distributed across the 774 Local Government Areas.",
    },
  ];

  const shareableMessages = [
    {
      title: "WhatsApp Voter Registration Reminder",
      text: "Fellow Nigerian Youth! Your PVC is your true voice in our democracy. Don't let others decide your future for you. Check your polling unit and join the STYMM movement today: https://stymm-movement.ng",
    },
    {
      title: "Doorstep Neighbor Invitation",
      text: "Good day neighbor! Did you know our Ward now has an active STYMM voter desk to help collect your PVC and support community youth projects? Let's unite for genuine youth empowerment!",
    },
  ];

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handleDownload = (title: string) => {
    setDownloadingTitle(title);
    setTimeout(() => setDownloadingTitle(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className={`border-b pb-8 space-y-3 transition-colors ${
        theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'
      }`}>
        <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
          Campaign Toolkits & Documentation
        </div>
        <h1 className={`text-3xl sm:text-5xl font-extrabold font-display transition-colors ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>
          Resources & Downloads
        </h1>
        <p className={`text-base max-w-3xl leading-relaxed ${
          theme === 'dark' ? 'text-neutral-300' : 'text-slate-600'
        }`}>
          Equip yourself with verified policy manifestos, field guides, infographics, and digital broadcast toolkits to educate your community.
        </p>
      </div>

      {downloadingTitle && (
        <div className="p-3 bg-emerald-600 text-white rounded-xl text-xs font-semibold flex items-center justify-between shadow-lg">
          <span>Preparing download for &ldquo;{downloadingTitle}&rdquo;...</span>
          <Check className="w-4 h-4" />
        </div>
      )}

      {/* Official Documents Grid with card-focus-group */}
      <div className="space-y-6">
        <h2 className={`text-xl font-bold font-display ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          Official Policy & Training Documents
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 card-focus-group">
          {documents.map((doc, idx) => (
            <div
              key={idx}
              className={`border rounded-2xl p-6 flex flex-col justify-between space-y-4 transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'bg-neutral-900 border-neutral-800 hover:border-emerald-500/40 text-neutral-100'
                  : 'bg-white border-emerald-100 hover:border-emerald-300 shadow-sm text-slate-800'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold text-[11px]">
                    {doc.category}
                  </span>
                  <span className={`font-mono text-[11px] ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-400'}`}>
                    {doc.size}
                  </span>
                </div>
                <h3 className={`text-base font-bold leading-snug ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {doc.title}
                </h3>
                <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-600'}`}>
                  {doc.description}
                </p>
              </div>

              <div className={`pt-4 border-t flex items-center justify-between text-xs ${
                theme === 'dark' ? 'border-neutral-800' : 'border-emerald-100'
              }`}>
                <span className={theme === 'dark' ? 'text-neutral-400' : 'text-slate-400'}>
                  Version 2.4 · English
                </span>
                <button
                  onClick={() => handleDownload(doc.title)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    theme === 'dark'
                      ? 'bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700'
                      : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}
                >
                  <Download className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Download Document</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shareable Messages for Canvassers with card-focus-group */}
      <div className="space-y-6">
        <h2 className={`text-xl font-bold font-display ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          Direct Social Media & WhatsApp Broadcast Kits
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 card-focus-group">
          {shareableMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`border rounded-2xl p-6 flex flex-col justify-between space-y-4 transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'bg-neutral-900 border-neutral-800 text-neutral-100'
                  : 'bg-white border-emerald-100 text-slate-800 shadow-sm'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-emerald-500" />
                  <h3 className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {msg.title}
                  </h3>
                </div>
                <div className={`p-4 rounded-xl text-xs leading-relaxed border font-mono ${
                  theme === 'dark' ? 'bg-black border-neutral-800 text-neutral-300' : 'bg-emerald-50/50 border-emerald-100 text-slate-700'
                }`}>
                  {msg.text}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => handleCopy(msg.text, idx)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    copiedIdx === idx
                      ? 'bg-emerald-600 text-white shadow-md'
                      : theme === 'dark'
                      ? 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700 border border-neutral-700'
                      : 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
                  }`}
                >
                  {copiedIdx === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <span>Copy Broadcast Text</span>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
