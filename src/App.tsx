/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PortalSection, PublicNav, MemberNav, AdminRole, CartItem, StoreItem, CanvassRecord } from './types';
import { INITIAL_CANVASS_RECORDS } from './data/campaignData';
import { useTheme } from './context/ThemeContext';
import { useCampaignMedia } from './context/CampaignMediaContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { CartModal } from './components/common/CartModal';
import { MediaManagerModal } from './components/common/MediaManagerModal';
import { CheckCircle2, X } from 'lucide-react';

// Public views
import { PublicHome } from './components/public/PublicHome';
import { PublicAbout } from './components/public/PublicAbout';
import { PublicMovement } from './components/public/PublicMovement';
import { PublicAchievements } from './components/public/PublicAchievements';
import { PublicJoin } from './components/public/PublicJoin';
import { PublicNews } from './components/public/PublicNews';
import { PublicEvents } from './components/public/PublicEvents';
import { PublicResources } from './components/public/PublicResources';
import { PublicDonate } from './components/public/PublicDonate';
import { PublicStore } from './components/public/PublicStore';
import { PublicContact } from './components/public/PublicContact';
import { PublicAuth } from './components/public/PublicAuth';

// Member & Admin views
import { MemberPortalView } from './components/member/MemberPortalView';
import { AdminDashboards } from './components/admin/AdminDashboards';
import { MobileAndSpecializedPreview } from './components/mobile_preview/MobileAndSpecializedPreview';

export default function App() {
  const { theme } = useTheme();
  const { images, lastUpdatedNotice, dismissNotice } = useCampaignMedia();
  const [portal, setPortal] = useState<PortalSection>('public');
  const [publicNav, setPublicNav] = useState<PublicNav>('home');
  const [memberNav, setMemberNav] = useState<MemberNav>('dashboard');
  const [adminRole, setAdminRole] = useState<AdminRole>('national');

  // Shared state
  const [canvassRecords, setCanvassRecords] = useState<CanvassRecord[]>(INITIAL_CANVASS_RECORDS);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleSelectPortal = (newPortal: PortalSection, role?: AdminRole) => {
    if (role) {
      setAdminRole(role);
    }
    setPortal(newPortal);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPublicNav = (nav: PublicNav) => {
    setPublicNav(nav);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectMemberNav = (nav: MemberNav) => {
    setMemberNav(nav);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (item: StoreItem, size?: string) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id && ci.size === size);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id && ci.size === size
            ? { ...ci, quantity: ci.quantity + 1 }
            : ci
        );
      }
      return [...prev, { item, quantity: 1, size }];
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.item.id !== id));
  };

  const handleUpdateQuantity = (id: string, qty: number) => {
    setCartItems((prev) =>
      prev.map((ci) => (ci.item.id === id ? { ...ci, quantity: qty } : ci))
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleAddCanvassRecord = (record: CanvassRecord) => {
    setCanvassRecords((prev) => [record, ...prev]);
  };

  const handleLoginSuccess = (targetPortal: PortalSection, role?: AdminRole) => {
    if (role) {
      setAdminRole(role);
    }
    setPortal(targetPortal);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 relative ${
      theme === 'dark'
        ? 'bg-black text-neutral-100 selection:bg-emerald-500 selection:text-black'
        : 'bg-[#f8faf9] text-slate-900 selection:bg-emerald-600 selection:text-white'
    }`}>
      {/* Cinematic Civic Campaign Background Image */}
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-cover bg-center bg-fixed transition-opacity duration-500"
        style={{
          backgroundImage: `url(${images.civicBg})`,
          opacity: theme === 'dark' ? 0.16 : 0.08,
        }}
        aria-hidden="true"
      />

      {/* Layered Blurred Ambient Elements in Background so it never looks plain */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Top-Right Glowing Emerald Mesh Orb */}
        <div className={`absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full blur-[140px] transition-all duration-700 animate-float-slow ${
          theme === 'dark' ? 'bg-emerald-500/25' : 'bg-emerald-500/20'
        }`} />

        {/* Mid-Left Deep Emerald Ambient Cloud */}
        <div className={`absolute top-1/4 -left-44 w-[650px] h-[650px] rounded-full blur-[160px] transition-all duration-700 animate-float-reverse ${
          theme === 'dark' ? 'bg-emerald-700/30' : 'bg-emerald-400/18'
        }`} />

        {/* Center Golden/Lime Civic Energy Spot */}
        <div className={`absolute top-1/2 left-1/3 w-[450px] h-[450px] rounded-full blur-[150px] transition-all duration-700 animate-pulse-glow ${
          theme === 'dark' ? 'bg-emerald-400/15' : 'bg-emerald-300/20'
        }`} />

        {/* Bottom-Right Forest Accent Glow */}
        <div className={`absolute -bottom-40 right-4 w-[550px] h-[550px] rounded-full blur-[140px] transition-all duration-700 animate-float-slow ${
          theme === 'dark' ? 'bg-emerald-600/20' : 'bg-emerald-400/18'
        }`} />

        {/* Bottom-Left Subtle Deep Ring */}
        <div className={`absolute -bottom-20 left-10 w-[420px] h-[420px] rounded-full blur-[130px] transition-all duration-700 animate-float-reverse ${
          theme === 'dark' ? 'bg-emerald-800/25' : 'bg-emerald-200/25'
        }`} />

        {/* Floating Blurred Bokeh Lights */}
        <div className={`absolute top-1/6 left-1/4 w-32 h-32 rounded-full blur-2xl animate-float-slow ${
          theme === 'dark' ? 'bg-emerald-400/20' : 'bg-emerald-500/15'
        }`} />
        <div className={`absolute top-3/5 right-1/4 w-40 h-40 rounded-full blur-3xl animate-float-reverse ${
          theme === 'dark' ? 'bg-emerald-500/20' : 'bg-emerald-400/15'
        }`} />
        <div className={`absolute top-4/5 left-1/3 w-28 h-28 rounded-full blur-xl animate-pulse-glow ${
          theme === 'dark' ? 'bg-emerald-300/15' : 'bg-emerald-600/10'
        }`} />

        {/* Floating Blurred Civic Rings & Badges */}
        <div className={`absolute top-1/4 right-[12%] w-80 h-80 border-2 rounded-full blur-[3px] transition-opacity duration-700 animate-float-slow ${
          theme === 'dark' ? 'border-emerald-500/20' : 'border-emerald-500/12'
        }`} />
        <div className={`absolute bottom-1/4 left-[8%] w-[420px] h-[420px] border border-dashed rounded-full blur-[2px] transition-opacity duration-700 animate-float-reverse ${
          theme === 'dark' ? 'border-emerald-400/18' : 'border-emerald-600/12'
        }`} />
        <div className={`absolute top-2/3 right-[30%] w-48 h-48 border rounded-3xl rotate-12 blur-[2.5px] transition-opacity duration-700 animate-float-slow ${
          theme === 'dark' ? 'border-emerald-300/15' : 'border-emerald-500/10'
        }`} />
      </div>

      {/* Universal Top Bar */}
      <div className="relative z-10">
        <Header
          portal={portal}
          onSelectPortal={handleSelectPortal}
          publicNav={publicNav}
          onSelectPublicNav={handleSelectPublicNav}
          cartCount={totalCartCount}
          onOpenCart={() => setIsCartOpen(true)}
        />
      </div>

      {/* Main Dynamic View Area */}
      <main className="flex-1 relative z-10">
        {portal === 'public' && (
          <>
            {publicNav === 'home' && (
              <PublicHome
                onSelectNav={handleSelectPublicNav}
                onSelectPortal={handleSelectPortal}
              />
            )}
            {publicNav === 'about' && <PublicAbout />}
            {publicNav === 'movement' && <PublicMovement />}
            {publicNav === 'achievements' && <PublicAchievements />}
            {publicNav === 'join' && <PublicJoin onSuccessNavigate={() => handleSelectPortal('member')} />}
            {publicNav === 'news' && <PublicNews />}
            {publicNav === 'events' && <PublicEvents />}
            {publicNav === 'resources' && <PublicResources />}
            {publicNav === 'donate' && <PublicDonate />}
            {publicNav === 'store' && <PublicStore onAddToCart={handleAddToCart} />}
            {publicNav === 'contact' && <PublicContact />}
            {publicNav === 'login' && <PublicAuth onLoginSuccess={handleLoginSuccess} />}
          </>
        )}

        {portal === 'member' && (
          <MemberPortalView
            memberNav={memberNav}
            onSelectMemberNav={handleSelectMemberNav}
            canvassRecords={canvassRecords}
            onAddCanvassRecord={handleAddCanvassRecord}
            onAddToCart={handleAddToCart}
          />
        )}

        {portal === 'admin' && (
          <AdminDashboards initialRole={adminRole} onBackToPublic={() => handleSelectPortal('public')} />
        )}

        {portal === 'mobile_preview' && (
          <MobileAndSpecializedPreview />
        )}
      </main>

      {/* Universal Footer */}
      <Footer
        onSelectPublicNav={handleSelectPublicNav}
        onSelectPortal={handleSelectPortal}
      />

      {/* Cart Drawer / Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />

      {/* Campaign Media & Photo Replacer Modal */}
      <MediaManagerModal />

      {/* Floating Notification Toast for Image Updates */}
      {lastUpdatedNotice && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md animate-fade-in shadow-2xl rounded-2xl p-4 border bg-neutral-900/95 border-emerald-500/40 text-white backdrop-blur-md flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="flex-1 text-xs leading-relaxed text-neutral-200">
            {lastUpdatedNotice}
          </div>
          <button
            onClick={dismissNotice}
            aria-label="Dismiss notification"
            className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
