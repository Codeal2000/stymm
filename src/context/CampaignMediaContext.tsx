import React, { createContext, useContext, useEffect, useState } from 'react';
import { CAMPAIGN_IMAGES } from '../data/campaignData';

export type ImageSlot = 'candidate' | 'interview' | 'heroRally' | 'grassroots' | 'merchandise' | 'civicBg';

export interface ImageSlotMeta {
  key: ImageSlot;
  label: string;
  description: string;
  recommendedAspect: string;
  defaultSrc: string;
}

export const IMAGE_SLOTS_CONFIG: Record<ImageSlot, ImageSlotMeta> = {
  candidate: {
    key: 'candidate',
    label: 'Candidate Spotlight (Seyi Tinubu)',
    description: 'The official portrait of Seyi Tinubu featured prominently on the Home spotlight and About Us leadership sections.',
    recommendedAspect: '4:3 or Portrait 3:4 / 1:1',
    defaultSrc: CAMPAIGN_IMAGES.candidate,
  },
  interview: {
    key: 'interview',
    label: 'Candid Interview ("Why So Serious?")',
    description: 'Seyi Tinubu in conversational dialogue wearing his "Why So Serious?" cap, sharing the grassroots youth vision.',
    recommendedAspect: '16:9 or 4:3 Landscape',
    defaultSrc: CAMPAIGN_IMAGES.candidate,
  },
  heroRally: {
    key: 'heroRally',
    label: 'Youth Mobilization Hero Rally',
    description: 'The energetic youth rally banner showcased in the hero section on the campaign homepage.',
    recommendedAspect: '16:9 Landscape',
    defaultSrc: CAMPAIGN_IMAGES.heroRally,
  },
  grassroots: {
    key: 'grassroots',
    label: 'Grassroots Fieldwork & Canvassing',
    description: 'Field volunteers and grassroots mobilization image in the Polling Unit engagement showcase.',
    recommendedAspect: '4:3 or 16:9',
    defaultSrc: CAMPAIGN_IMAGES.grassroots,
  },
  merchandise: {
    key: 'merchandise',
    label: 'Official Campaign Store Merchandise',
    description: 'Apparel, caps, and campaign collateral banner displayed in the official movement store.',
    recommendedAspect: '16:9 or 4:3',
    defaultSrc: CAMPAIGN_IMAGES.merchandise,
  },
  civicBg: {
    key: 'civicBg',
    label: 'Civic Ambient Background Pattern',
    description: 'The subtle textured atmospheric background pattern layered behind the entire application.',
    recommendedAspect: 'Full HD Wallpaper / Pattern',
    defaultSrc: CAMPAIGN_IMAGES.civicBg,
  },
};

const STORAGE_KEY = 'stymm_custom_images';

interface CampaignMediaContextType {
  images: Record<ImageSlot, string>;
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

  // Compute effective images
  const images: Record<ImageSlot, string> = {
    candidate: customImages.candidate || CAMPAIGN_IMAGES.candidate,
    interview: customImages.interview || customImages.candidate || CAMPAIGN_IMAGES.candidate,
    heroRally: customImages.heroRally || CAMPAIGN_IMAGES.heroRally,
    grassroots: customImages.grassroots || CAMPAIGN_IMAGES.grassroots,
    merchandise: customImages.merchandise || CAMPAIGN_IMAGES.merchandise,
    civicBg: customImages.civicBg || CAMPAIGN_IMAGES.civicBg,
  };

  const isCustom = (slot: ImageSlot): boolean => {
    return Boolean(customImages[slot]);
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
            `✨ Success! ${slotMeta.label} updated with your authentic photograph. AI conversion is disabled — original visual fidelity preserved.`
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

  return (
    <CampaignMediaContext.Provider
      value={{
        images,
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
