import React, { useRef, useState } from 'react';
import { useCampaignMedia, IMAGE_SLOTS_CONFIG, ImageSlot } from '../../context/CampaignMediaContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  UploadCloud, 
  RotateCcw, 
  CheckCircle2, 
  Image as ImageIcon, 
  Link as LinkIcon,
  ShieldCheck, 
  Download, 
  FileCode,
  Sparkles,
  AlertCircle,
  Eye,
  Trash2
} from 'lucide-react';

export const DeveloperMediaManager: React.FC = () => {
  const { theme } = useTheme();
  const { 
    images, 
    isCustom, 
    uploadImage, 
    setImageDataUrl,
    resetSlot, 
    resetAllSlots 
  } = useCampaignMedia();

  const [activeSlot, setActiveSlot] = useState<ImageSlot>('candidate');
  const [urlInputs, setUrlInputs] = useState<Record<string, string>>({});
  const [dragOverSlot, setDragOverSlot] = useState<ImageSlot | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [previewModalImg, setPreviewModalImg] = useState<{ src: string; title: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentMeta = IMAGE_SLOTS_CONFIG[activeSlot];
  const currentImage = images[activeSlot];
  const isSlotCustom = isCustom(activeSlot);

  const handleFileUpload = async (slot: ImageSlot, file: File) => {
    try {
      await uploadImage(slot, file);
      setFeedback({
        type: 'success',
        message: `Permanent update: ${IMAGE_SLOTS_CONFIG[slot].label} successfully updated with authentic asset.`,
      });
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: err.message || 'Failed to upload photo.',
      });
    }
  };

  const handleSaveUrl = (slot: ImageSlot) => {
    const url = urlInputs[slot]?.trim();
    if (!url) {
      setFeedback({ type: 'error', message: 'Please enter a valid image URL.' });
      return;
    }
    setImageDataUrl(slot, url);
    setUrlInputs((prev) => ({ ...prev, [slot]: '' }));
    setFeedback({
      type: 'success',
      message: `Permanent update: ${IMAGE_SLOTS_CONFIG[slot].label} updated with remote image URL.`,
    });
  };

  const handleApplyPreset = (slot: ImageSlot, presetSrc: string, presetName: string) => {
    setImageDataUrl(slot, presetSrc);
    setFeedback({
      type: 'success',
      message: `Applied ${presetName} permanently to ${IMAGE_SLOTS_CONFIG[slot].label}.`,
    });
  };

  const handleExportConfig = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(images, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'stymm_media_assets_config.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setFeedback({ type: 'success', message: 'Media assets configuration exported successfully.' });
  };

  return (
    <div className="space-y-6">
      {/* Developer Banner */}
      <div className={`p-6 rounded-2xl border ${
        theme === 'dark'
          ? 'bg-neutral-900/90 border-neutral-800 text-white'
          : 'bg-white border-emerald-200 text-slate-900 shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Developer Master Control
              </span>
              <span className="flex items-center gap-1 text-xs text-neutral-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Zero AI Alteration · 100% Raw Asset Persistence
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight">
              Permanent Media & Asset Manager
            </h2>
            <p className={`text-xs max-w-2xl ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-600'}`}>
              Any photo uploaded or updated here permanently changes the website assets for the candidate, interview sessions, rallies, and store banners without requiring visitors to upload anything.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportConfig}
              className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                theme === 'dark'
                  ? 'border-neutral-700 hover:bg-neutral-800 text-neutral-300'
                  : 'border-slate-200 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Config</span>
            </button>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to reset all custom images to factory defaults?')) {
                  resetAllSlots();
                  setFeedback({ type: 'success', message: 'All assets reset to factory defaults.' });
                }
              }}
              className="px-3 py-2 rounded-xl border border-rose-500/40 text-rose-400 hover:bg-rose-500/10 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All</span>
            </button>
          </div>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div className={`mt-4 p-3 rounded-xl border text-xs flex items-center justify-between animate-fadeIn ${
            feedback.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
          }`}>
            <div className="flex items-center gap-2">
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0" />
              )}
              <span>{feedback.message}</span>
            </div>
            <button
              onClick={() => setFeedback(null)}
              className="text-[11px] underline opacity-80 hover:opacity-100"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>

      {/* Main Grid: Slot Tabs on Left, Active Editor on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Slot Selector */}
        <div className="lg:col-span-4 space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 block px-1">
            Campaign Media Slots
          </label>
          <div className="space-y-2">
            {(Object.keys(IMAGE_SLOTS_CONFIG) as ImageSlot[]).map((slotKey) => {
              const meta = IMAGE_SLOTS_CONFIG[slotKey];
              const active = activeSlot === slotKey;
              const custom = isCustom(slotKey);
              const preview = images[slotKey];

              return (
                <button
                  key={slotKey}
                  onClick={() => {
                    setActiveSlot(slotKey);
                    setFeedback(null);
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center gap-3 ${
                    active
                      ? theme === 'dark'
                        ? 'bg-neutral-800 border-emerald-500 text-white shadow-lg ring-1 ring-emerald-500'
                        : 'bg-emerald-50/80 border-emerald-500 text-emerald-950 shadow-md ring-1 ring-emerald-500'
                      : theme === 'dark'
                      ? 'bg-neutral-900/60 border-neutral-800 hover:bg-neutral-800/50 text-neutral-300'
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-black/40 shrink-0 border border-neutral-700/50">
                    <img
                      src={preview}
                      alt={meta.label}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="truncate flex-1 min-w-0">
                    <div className="font-bold text-xs truncate">{meta.label}</div>
                    <div className="text-[11px] text-neutral-400 truncate mt-0.5">
                      {meta.recommendedAspect}
                    </div>
                  </div>

                  {custom ? (
                    <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Custom
                    </span>
                  ) : (
                    <span className="shrink-0 text-[10px] text-neutral-500">
                      Default
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Active Slot Master Panel */}
        <div className="lg:col-span-8 space-y-6">
          <div className={`p-6 rounded-2xl border ${
            theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-4 mb-6">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-emerald-500 font-bold">
                  Editing Media Asset
                </div>
                <h3 className="text-lg font-bold font-display">{currentMeta.label}</h3>
                <p className={`text-xs mt-0.5 ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}`}>
                  {currentMeta.description}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {isSlotCustom ? (
                  <button
                    onClick={() => {
                      resetSlot(activeSlot);
                      setFeedback({ type: 'success', message: `Reset ${currentMeta.label} to default asset.` });
                    }}
                    className="px-3 py-1.5 rounded-xl border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset to Default</span>
                  </button>
                ) : (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-neutral-800 text-neutral-400 border border-neutral-700">
                    System Preset Active
                  </span>
                )}
              </div>
            </div>

            {/* Current Active Preview */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">
                Current Active Image Preview
              </label>

              <div className="relative rounded-2xl overflow-hidden border border-neutral-700/60 bg-black/60 aspect-video max-h-[360px] flex items-center justify-center group">
                <img
                  src={currentImage}
                  alt={currentMeta.label}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />

                <div className="absolute top-3 left-3 flex items-center gap-2">
                  {isSlotCustom ? (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-lg flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Permanent Custom Asset Active
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/80 backdrop-blur-md text-white border border-white/20">
                      Standard Default Asset
                    </span>
                  )}
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <button
                    onClick={() => setPreviewModalImg({ src: currentImage, title: currentMeta.label })}
                    className="p-2 rounded-xl bg-black/70 hover:bg-black text-white backdrop-blur-md border border-white/20 text-xs flex items-center gap-1 transition-colors"
                    title="View Full Resolution"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Upload Zone & Controls */}
            <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800 space-y-5">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">
                Change Image for this Slot
              </label>

              {/* Method 1: Local File Upload & Dropzone */}
              <div
                onDrop={async (e) => {
                  e.preventDefault();
                  setDragOverSlot(null);
                  if (e.dataTransfer.files?.[0]) {
                    await handleFileUpload(activeSlot, e.dataTransfer.files[0]);
                  }
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOverSlot(activeSlot);
                }}
                onDragLeave={() => setDragOverSlot(null)}
                className={`p-6 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center text-center cursor-pointer ${
                  dragOverSlot === activeSlot
                    ? 'border-emerald-500 bg-emerald-500/10'
                    : theme === 'dark'
                    ? 'border-neutral-700 bg-black/30 hover:border-emerald-500/50 hover:bg-neutral-800/40'
                    : 'border-slate-300 bg-slate-50 hover:border-emerald-500/50 hover:bg-emerald-50/40'
                }`}
                onClick={() => fileInputRef.current?.click()}
              >
                <UploadCloud className="w-10 h-10 text-emerald-500 mb-2 animate-pulse" />
                <div className="text-sm font-bold">
                  Click or drag and drop new image here
                </div>
                <div className="text-xs text-neutral-400 mt-1">
                  Supports PNG, JPG, WEBP, SVG (Max 15MB) · Zero AI Alteration
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    if (e.target.files?.[0]) {
                      await handleFileUpload(activeSlot, e.target.files[0]);
                    }
                  }}
                />
              </div>

              {/* Method 2: Direct URL Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold flex items-center gap-1.5 text-neutral-400">
                  <LinkIcon className="w-3.5 h-3.5" />
                  <span>Or apply image via direct web URL:</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://example.com/seyi-tinubu-photo.jpg"
                    value={urlInputs[activeSlot] || ''}
                    onChange={(e) => setUrlInputs({ ...urlInputs, [activeSlot]: e.target.value })}
                    className={`flex-1 px-3.5 py-2 text-xs rounded-xl border focus:outline-none transition-colors ${
                      theme === 'dark'
                        ? 'bg-black border-neutral-700 text-white focus:border-emerald-500'
                        : 'bg-white border-slate-300 text-slate-900 focus:border-emerald-600'
                    }`}
                  />
                  <button
                    onClick={() => handleSaveUrl(activeSlot)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-colors shrink-0 shadow-sm"
                  >
                    Apply URL
                  </button>
                </div>
              </div>

              {/* Quick Presets for Candidate & Interview slots */}
              {(activeSlot === 'candidate' || activeSlot === 'interview') && (
                <div className={`p-4 rounded-xl border space-y-2 ${
                  theme === 'dark' ? 'bg-black/40 border-neutral-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="text-xs font-bold flex items-center gap-1.5 text-emerald-500">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Official Campaign Presets for this Slot:</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      onClick={() => handleApplyPreset(activeSlot, '/candidate_seyi_tinubu.png', 'Official 1080x1080 Headshot')}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                        theme === 'dark'
                          ? 'border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-neutral-200'
                          : 'border-slate-300 bg-white hover:bg-slate-100 text-slate-800 shadow-sm'
                      }`}
                    >
                      Official Headshot (seyitinubu.com)
                    </button>
                    <button
                      onClick={() => resetSlot(activeSlot)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                        theme === 'dark'
                          ? 'border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-neutral-200'
                          : 'border-slate-300 bg-white hover:bg-slate-100 text-slate-800 shadow-sm'
                      }`}
                    >
                      Factory Default Preset
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Full Resolution Preview Lightbox */}
      {previewModalImg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="max-w-4xl max-h-[90vh] flex flex-col items-center">
            <img
              src={previewModalImg.src}
              alt={previewModalImg.title}
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
            />
            <div className="mt-4 flex items-center justify-between w-full text-white text-xs px-2">
              <span className="font-bold">{previewModalImg.title}</span>
              <button
                onClick={() => setPreviewModalImg(null)}
                className="px-4 py-1.5 bg-neutral-800 hover:bg-neutral-700 rounded-lg font-bold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
