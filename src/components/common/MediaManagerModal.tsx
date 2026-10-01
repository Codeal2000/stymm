import React, { useRef, useState } from 'react';
import { useCampaignMedia, IMAGE_SLOTS_CONFIG, ImageSlot } from '../../context/CampaignMediaContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  X, 
  UploadCloud, 
  RotateCcw, 
  CheckCircle2, 
  Image as ImageIcon, 
  ShieldCheck, 
  Sparkles,
  AlertCircle
} from 'lucide-react';

export const MediaManagerModal: React.FC = () => {
  const { theme } = useTheme();
  const { 
    images, 
    isCustom, 
    uploadImage, 
    resetSlot, 
    resetAllSlots, 
    isMediaManagerOpen, 
    setIsMediaManagerOpen,
    activeSlotToEdit,
  } = useCampaignMedia();

  const [selectedSlot, setSelectedSlot] = useState<ImageSlot>(activeSlotToEdit || 'candidate');
  const [dragOverSlot, setDragOverSlot] = useState<ImageSlot | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isMediaManagerOpen) return null;

  const currentMeta = IMAGE_SLOTS_CONFIG[selectedSlot];
  const currentImageSrc = images[selectedSlot];
  const isCurrentCustom = isCustom(selectedSlot);

  const handleFileSelection = async (file: File) => {
    setUploadError(null);
    setUploadSuccess(null);
    setIsProcessing(true);

    try {
      await uploadImage(selectedSlot, file);
      setUploadSuccess(`Successfully replaced ${currentMeta.label} with your authentic image! No AI processing was applied.`);
    } catch (err: any) {
      setUploadError(err.message || 'Failed to upload image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = async (e: React.DragEvent, slot: ImageSlot) => {
    e.preventDefault();
    setDragOverSlot(null);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setSelectedSlot(slot);
      await handleFileSelection(file);
    }
  };

  const handleDragOver = (e: React.DragEvent, slot: ImageSlot) => {
    e.preventDefault();
    setDragOverSlot(slot);
  };

  const handleDragLeave = () => {
    setDragOverSlot(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={() => setIsMediaManagerOpen(false)}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="media-manager-title"
        className={`relative w-full max-w-4xl rounded-2xl border shadow-2xl overflow-hidden z-10 my-8 transition-colors duration-200 ${
          theme === 'dark' 
            ? 'bg-neutral-900 border-neutral-800 text-white' 
            : 'bg-white border-emerald-100 text-slate-900'
        }`}
      >
        {/* Header */}
        <div className={`px-6 py-5 border-b flex items-center justify-between ${
          theme === 'dark' ? 'bg-black/60 border-neutral-800' : 'bg-emerald-50/70 border-emerald-100'
        }`}>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-600 text-white">
                <ImageIcon className="w-5 h-5" />
              </span>
              <h2 id="media-manager-title" className="text-xl font-bold font-display">
                Campaign Media & Real Photo Replacer
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                Zero AI Generation
              </span>
              <span className="text-neutral-400">·</span>
              <span className="text-neutral-500 dark:text-neutral-400">
                Uploaded images replace placeholders directly in full resolution, leaving the look exactly the way it is.
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsMediaManagerOpen(false)}
            aria-label="Close dialog"
            className={`p-2 rounded-xl transition-colors ${
              theme === 'dark' 
                ? 'hover:bg-neutral-800 text-neutral-400 hover:text-white' 
                : 'hover:bg-emerald-100 text-slate-500 hover:text-slate-800'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Slot Navigation */}
          <div className="lg:col-span-4 space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block px-1">
              Select Image Slot to Replace
            </label>
            <div className="space-y-1.5">
              {(Object.keys(IMAGE_SLOTS_CONFIG) as ImageSlot[]).map((slotKey) => {
                const meta = IMAGE_SLOTS_CONFIG[slotKey];
                const active = selectedSlot === slotKey;
                const custom = isCustom(slotKey);

                return (
                  <button
                    key={slotKey}
                    onClick={() => {
                      setSelectedSlot(slotKey);
                      setUploadError(null);
                      setUploadSuccess(null);
                    }}
                    className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition-all flex items-center justify-between ${
                      active
                        ? theme === 'dark'
                          ? 'bg-neutral-800 border-emerald-500 text-white shadow-md'
                          : 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-sm'
                        : theme === 'dark'
                        ? 'bg-black/40 border-neutral-800 hover:bg-neutral-800/60 text-neutral-300'
                        : 'bg-slate-50/80 border-slate-200 hover:bg-emerald-50/50 text-slate-700'
                    }`}
                  >
                    <div className="truncate mr-2">
                      <div className="font-bold truncate">{meta.label}</div>
                      <div className="text-[11px] text-neutral-400 dark:text-neutral-500 truncate">
                        {meta.recommendedAspect}
                      </div>
                    </div>

                    {custom ? (
                      <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Uploaded
                      </span>
                    ) : (
                      <span className="shrink-0 text-[10px] text-neutral-400 dark:text-neutral-500">
                        Default
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
              <button
                onClick={resetAllSlots}
                className={`w-full py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                  theme === 'dark'
                    ? 'border-neutral-800 hover:bg-neutral-800 text-neutral-400 hover:text-white'
                    : 'border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset All Images to Default
              </button>
            </div>
          </div>

          {/* Right Preview & Upload Zone */}
          <div className="lg:col-span-8 space-y-4">
            {/* Slot Description Banner */}
            <div className={`p-4 rounded-xl border ${
              theme === 'dark' ? 'bg-black/50 border-neutral-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm">{currentMeta.label}</h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    {currentMeta.description}
                  </p>
                </div>
                {isCurrentCustom && (
                  <button
                    onClick={() => resetSlot(selectedSlot)}
                    className="text-xs text-amber-500 hover:text-amber-400 font-semibold flex items-center gap-1 px-2.5 py-1 rounded-lg border border-amber-500/30 hover:bg-amber-500/10 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset to Default
                  </button>
                )}
              </div>
            </div>

            {/* Current Image Preview & Drag/Drop Target */}
            <div 
              onDrop={(e) => handleDrop(e, selectedSlot)}
              onDragOver={(e) => handleDragOver(e, selectedSlot)}
              onDragLeave={handleDragLeave}
              className={`relative rounded-2xl overflow-hidden border-2 transition-all flex flex-col items-center justify-center ${
                dragOverSlot === selectedSlot
                  ? 'border-emerald-500 bg-emerald-500/10 scale-[1.01]'
                  : theme === 'dark'
                  ? 'border-neutral-800 bg-black/60'
                  : 'border-emerald-200 bg-emerald-50/30'
              }`}
            >
              {/* Preview Image */}
              <div className="relative w-full aspect-video max-h-[300px] overflow-hidden bg-black/40 flex items-center justify-center">
                <img
                  src={currentImageSrc}
                  alt={currentMeta.label}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />

                {/* Status Overlay Badge */}
                <div className="absolute top-3 left-3">
                  {isCurrentCustom ? (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-lg flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Authentic Real Photo Active
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/70 backdrop-blur-md text-white border border-white/20">
                      Standard Preset
                    </span>
                  )}
                </div>
              </div>

              {/* Upload Action Strip */}
              <div className={`w-full p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${
                theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-emerald-100'
              }`}>
                <div className="text-center sm:text-left">
                  <div className="text-xs font-bold">
                    Drop your image file here or click upload
                  </div>
                  <div className="text-[11px] text-neutral-400">
                    PNG, JPG, WEBP, or SVG · Preserves exact quality without AI conversion
                  </div>
                </div>

                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileSelection(e.target.files[0]);
                    }
                  }}
                />

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md hover:shadow-emerald-600/30 transition-all flex items-center gap-2 shrink-0 disabled:opacity-50"
                >
                  <UploadCloud className="w-4 h-4" />
                  {isProcessing ? 'Saving Photo...' : 'Upload Real Photo'}
                </button>
              </div>
            </div>

            {/* Success Feedback */}
            {uploadSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{uploadSuccess}</span>
              </div>
            )}

            {/* Error Feedback */}
            {uploadError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className={`px-6 py-4 border-t flex items-center justify-between text-xs ${
          theme === 'dark' ? 'bg-black/60 border-neutral-800 text-neutral-400' : 'bg-slate-50 border-slate-200 text-slate-500'
        }`}>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>All uploads remain stored on your device and instantly update the entire website.</span>
          </div>

          <button
            onClick={() => setIsMediaManagerOpen(false)}
            className="px-4 py-2 rounded-xl font-bold bg-neutral-800 hover:bg-neutral-700 text-white transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
