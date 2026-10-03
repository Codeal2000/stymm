import React, { createContext, useContext, useEffect, useState } from 'react';
import { CAMPAIGN_IMAGES } from '../data/campaignData';
import campaignMediaConfig from '../data/campaignMediaConfig.json';

export type ImageSlot = 'candidate' | 'interview' | 'heroRally' | 'grassroots' | 'merchandise' | 'civicBg';

export interface ImageSlotMeta {
  key: ImageSlot;
  label: string;
  description: string;
  recommendedAspect: string;
  defaultSrc: string;
  recommendedFileName: string;
}

export const IMAGE_SLOTS_CONFIG: Record<ImageSlot, ImageSlotMeta> = {
  candidate: {
    key: 'candidate',
    label: 'Candidate Spotlight (Seyi Tinubu)',
    description: 'The official portrait of Seyi Tinubu featured prominently on the Home spotlight and About Us leadership sections.',
    recommendedAspect: '4:3 or Portrait 3:4 / 1:1',
    defaultSrc: campaignMediaConfig.candidate || CAMPAIGN_IMAGES.candidate,
    recommendedFileName: 'candidate.png',
  },
  interview: {
    key: 'interview',
    label: 'Candid Dialogue & Townhall Speech',
    description: 'Seyi Tinubu speaking directly with Nigerian youth leaders at townhall event.',
    recommendedAspect: '16:9 or 4:3 Landscape',
    defaultSrc: campaignMediaConfig.interview || CAMPAIGN_IMAGES.interview,
    recommendedFileName: 'interview.jpg',
  },
  heroRally: {
    key: 'heroRally',
    label: 'Youth Mobilization Hero Rally',
    description: 'The energetic youth rally banner showcased in the hero section on the campaign homepage.',
    recommendedAspect: '16:9 Landscape',
    defaultSrc: campaignMediaConfig.heroRally || CAMPAIGN_IMAGES.heroRally,
    recommendedFileName: 'hero-rally.jpg',
  },
  grassroots: {
    key: 'grassroots',
    label: 'Grassroots Fieldwork & Canvassing',
    description: 'Field volunteers and grassroots mobilization image in the Polling Unit engagement showcase.',
    recommendedAspect: '4:3 or 16:9',
    defaultSrc: campaignMediaConfig.grassroots || CAMPAIGN_IMAGES.grassroots,
    recommendedFileName: 'grassroots.jpg',
  },
  merchandise: {
    key: 'merchandise',
    label: 'Official Campaign Store Merchandise',
    description: 'Apparel, caps, and campaign collateral banner displayed in the official movement store.',
    recommendedAspect: '16:9 or 4:3',
    defaultSrc: campaignMediaConfig.merchandise || CAMPAIGN_IMAGES.merchandise,
    recommendedFileName: 'merchandise.jpg',
  },
  civicBg: {
    key: 'civicBg',
    label: 'Civic Ambient Background Pattern',
    description: 'The subtle textured atmospheric background pattern layered behind the entire application.',
    recommendedAspect: 'Full HD Wallpaper / Pattern',
    defaultSrc: campaignMediaConfig.civicBg || CAMPAIGN_IMAGES.civicBg,
    recommendedFileName: 'civic-bg.jpg',
  },
};

const STORAGE_KEY = 'stymm_custom_images';

interface CampaignMediaContextType {
  images: Record<ImageSlot, string>;
  customImages: Partial<Record<ImageSlot, string>>;
  isCustom: (slot: ImageSlot) => boolean;
  uploadImage: (slot: ImageSlot, file: File) => Promise<string>;
  setImageDataUrl: (slot: ImageSlot, dataUrl: string) => void;
  resetSlot: (slot: ImageSlot) => void;
  resetAllSlots: () => void;
  isMediaManagerOpen: boolean;
  setIsMediaManagerOpen: (open: boolean) => void;
  activeSlotToEdit: ImageSlot | null;
  openMediaManagerForSlot: (slot?: ImageSlot) => void;
  lastUpdatedNotice: string | null;
  dismissNotice: () => void;
  exportGitConfigJson: () => string;
  downloadGitConfigFile: () => void;
}

const CampaignMediaContext = createContext<CampaignMediaContextType | undefined>(undefined);

export const CampaignMediaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customImages, setCustomImages] = useState<Partial<Record<ImageSlot, string>>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          return JSON.parse(stored);
        }
      } catch (err) {
        console.error('Failed to parse custom images from localStorage:', err);
      }
    }
    return {};
  });

  const [isMediaManagerOpen, setIsMediaManagerOpen] = useState(false);
  const [activeSlotToEdit, setActiveSlotToEdit] = useState<ImageSlot | null>(null);
  const [lastUpdatedNotice, setLastUpdatedNotice] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customImages));
    } catch (err) {
      console.error('Failed to save custom images to localStorage:', err);
    }
  }, [customImages]);

  // Compute effective images: LocalStorage -> Git Config -> Factory bundled defaults
  const images: Record<ImageSlot, string> = {
    candidate: customImages.candidate || campaignMediaConfig.candidate || CAMPAIGN_IMAGES.candidate,
    interview: customImages.interview || campaignMediaConfig.interview || CAMPAIGN_IMAGES.interview,
    heroRally: customImages.heroRally || campaignMediaConfig.heroRally || CAMPAIGN_IMAGES.heroRally,
    grassroots: customImages.grassroots || campaignMediaConfig.grassroots || CAMPAIGN_IMAGES.grassroots,
    merchandise: customImages.merchandise || campaignMediaConfig.merchandise || CAMPAIGN_IMAGES.merchandise,
    civicBg: customImages.civicBg || campaignMediaConfig.civicBg || CAMPAIGN_IMAGES.civicBg,
  };

  const isCustom = (slot: ImageSlot): boolean => {
    return Boolean(customImages[slot] || campaignMediaConfig[slot]);
  };

  const uploadImage = (slot: ImageSlot, file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        reject(new Error('Please select an image file (PNG, JPG, WEBP, or SVG).'));
        return;
      }

      // Max size: 15MB
      if (file.size > 15 * 1024 * 1024) {
        reject(new Error('Image is too large. Please select an image under 15MB.'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          setCustomImages((prev) => ({
            ...prev,
            [slot]: result,
          }));
          const slotMeta = IMAGE_SLOTS_CONFIG[slot];
          setLastUpdatedNotice(
            `✨ Success! ${slotMeta.label} updated with your authentic photograph. AI conversion is disabled; original visual fidelity preserved.`
          );
          resolve(result);
        } else {
          reject(new Error('Could not read image file.'));
        }
      };
      reader.onerror = () => {
        reject(new Error('Failed to load image file.'));
      };
      reader.readAsDataURL(file);
    });
  };

  const setImageDataUrl = (slot: ImageSlot, dataUrl: string) => {
    setCustomImages((prev) => ({
      ...prev,
      [slot]: dataUrl,
    }));
    const slotMeta = IMAGE_SLOTS_CONFIG[slot];
    setLastUpdatedNotice(
      `✨ Success! ${slotMeta.label} updated with your uploaded photo. Authentic look preserved without AI conversion.`
    );
  };

  const resetSlot = (slot: ImageSlot) => {
    setCustomImages((prev) => {
      const updated = { ...prev };
      delete updated[slot];
      return updated;
    });
    const slotMeta = IMAGE_SLOTS_CONFIG[slot];
    setLastUpdatedNotice(`Reset ${slotMeta.label} to default system asset.`);
  };

  const resetAllSlots = () => {
    setCustomImages({});
    setLastUpdatedNotice('Reset all campaign images to initial system assets.');
  };

  const openMediaManagerForSlot = (slot?: ImageSlot) => {
    if (slot) {
      setActiveSlotToEdit(slot);
    }
    setIsMediaManagerOpen(true);
  };

  const dismissNotice = () => {
    setLastUpdatedNotice(null);
  };

  const exportGitConfigJson = (): string => {
    const configToExport: Record<string, string> = {
      candidate: customImages.candidate || campaignMediaConfig.candidate || '',
      interview: customImages.interview || campaignMediaConfig.interview || '',
      heroRally: customImages.heroRally || campaignMediaConfig.heroRally || '',
      grassroots: customImages.grassroots || campaignMediaConfig.grassroots || '',
      merchandise: customImages.merchandise || campaignMediaConfig.merchandise || '',
      civicBg: customImages.civicBg || campaignMediaConfig.civicBg || '',
    };
    return JSON.stringify(configToExport, null, 2);
  };

  const downloadGitConfigFile = () => {
    const jsonStr = exportGitConfigJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'campaignMediaConfig.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setLastUpdatedNotice('📥 Downloaded campaignMediaConfig.json! Place this file into src/data/ and commit to Git.');
  };

  return (
    <CampaignMediaContext.Provider
      value={{
        images,
        customImages,
        isCustom,
        uploadImage,
        setImageDataUrl,
        resetSlot,
        resetAllSlots,
        isMediaManagerOpen,
        setIsMediaManagerOpen,
        activeSlotToEdit,
        openMediaManagerForSlot,
        lastUpdatedNotice,
        dismissNotice,
        exportGitConfigJson,
        downloadGitConfigFile,
      }}
    >
      {children}
    </CampaignMediaContext.Provider>
  );
};

export const useCampaignMedia = () => {
  const context = useContext(CampaignMediaContext);
  if (!context) {
    throw new Error('useCampaignMedia must be used within a CampaignMediaProvider');
  }
  return context;
};
