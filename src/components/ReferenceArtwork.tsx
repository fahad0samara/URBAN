import React from 'react';

const HERO_IMAGE_RTL = '/src/assets/images/hero_rtl_hd_1795003351773.jpg';
const APPROACH_IMAGES = [
  '/src/assets/images/approach_1_hd_1795003354358.jpg',
  '/src/assets/images/approach_2_hd_1795003355389.jpg',
  '/src/assets/images/approach_3_hd_1795003357038.jpg',
  '/src/assets/images/approach_4_hd_1795003358215.jpg',
];
const QUARTER_CITY_IMAGE_RTL = '/src/assets/images/quarter_rtl_seamless_hd_1795003398383.jpg';
const NEWS_IMAGES = [
  '/src/assets/images/news_1_hd_1795003399164.jpg',
  '/src/assets/images/news_2_hd_1795003401437.jpg',
  '/src/assets/images/news_3_hd_1795003401562.jpg',
];

/**
 * Brand 4-petal geometric clover mark matching the top-left "URBAN NOVA" logo in the reference image
 */
export const UrbanNovaLogoMark: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 36 36" fill="none" className={className} aria-hidden="true">
    <path
      d="M5 10C5 7.23858 7.23858 5 10 5H14C15.6569 5 17 6.34315 17 8V17H10C7.23858 17 5 14.7614 5 12V10Z"
      stroke="url(#nova_grad)"
      strokeWidth="2.2"
    />
    <path
      d="M19 8C19 6.34315 20.3431 5 22 5H26C28.7614 5 31 7.23858 31 10V12C31 14.7614 28.7614 17 26 17H19V8Z"
      stroke="url(#nova_grad)"
      strokeWidth="2.2"
    />
    <path
      d="M5 24C5 21.2386 7.23858 19 10 19H17V28C17 29.6569 15.6569 31 14 31H10C7.23858 31 5 28.7614 5 26V24Z"
      stroke="url(#nova_grad)"
      strokeWidth="2.2"
    />
    <path
      d="M19 19H26C28.7614 19 31 21.2386 31 24V26C31 28.7614 28.7614 31 26 31H22C20.3431 31 19 29.6569 19 28V19Z"
      stroke="url(#nova_grad)"
      strokeWidth="2.2"
    />
    <defs>
      <linearGradient id="nova_grad" x1="5" y1="5" x2="31" y2="31" gradientUnits="userSpaceOnUse">
        <stop stopColor="#A78BFA" />
        <stop offset="1" stopColor="#7C3AED" />
      </linearGradient>
    </defs>
  </svg>
);

/**
 * Custom purple line icons matching the 4 "Our Approach" cards in the reference image
 */
export const ApproachCardIcon: React.FC<{ index: number; className?: string }> = ({
  index,
  className = 'w-6 h-6',
}) => {
  switch (index) {
    case 0: // Smart Home
      return (
        <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true">
          <path
            d="M4.5 12.2L14 4.5L23.5 12.2V22.5C23.5 23.3284 22.8284 24 22 24H6C5.17157 24 4.5 23.3284 4.5 22.5V12.2Z"
            stroke="#8B5CF6"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 11.5C14 11.5 17 14.7 17 16.8C17 18.4569 15.6569 19.8 14 19.8C12.3431 19.8 11 18.4569 11 16.8C11 14.7 14 11.5 14 11.5Z"
            stroke="#8B5CF6"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 1: // Car-Free Courtyard
      return (
        <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true">
          <path
            d="M6.5 14L8.5 8.5C8.8 7.6 9.6 7 10.6 7H17.4C18.4 7 19.2 7.6 19.5 8.5L21.5 14"
            stroke="#8B5CF6"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <rect
            x="5"
            y="14"
            width="18"
            height="6.5"
            rx="2.5"
            stroke="#8B5CF6"
            strokeWidth="1.8"
          />
          <path
            d="M7 20.5V22.5M21 20.5V22.5"
            stroke="#8B5CF6"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="9" cy="17.2" r="1" fill="#8B5CF6" />
          <circle cx="19" cy="17.2" r="1" fill="#8B5CF6" />
          <path d="M6 6L22 22" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 2: // Designer Lobby
      return (
        <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true">
          <path
            d="M7.5 13V9.5C7.5 7.567 9.067 6 11 6H17C18.933 6 20.5 7.567 20.5 9.5V13"
            stroke="#8B5CF6"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M5 14.5C5 13.3954 5.89543 12.5 7 12.5C8.10457 12.5 9 13.3954 9 14.5V17H19V14.5C19 13.3954 19.8954 12.5 21 12.5C22.1046 12.5 23 13.3954 23 14.5V18.5C23 19.6046 22.1046 20.5 21 20.5H7C5.89543 20.5 5 19.6046 5 18.5V14.5Z"
            stroke="#8B5CF6"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M8.5 20.5V23M19.5 20.5V23"
            stroke="#8B5CF6"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    default: // Community Spaces
      return (
        <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true">
          <circle cx="14" cy="9.5" r="2.8" stroke="#8B5CF6" strokeWidth="1.8" />
          <circle cx="8.2" cy="11.5" r="2.2" stroke="#A78BFA" strokeWidth="1.6" />
          <circle cx="19.8" cy="11.5" r="2.2" stroke="#A78BFA" strokeWidth="1.6" />
          <path
            d="M9.5 21C9.5 18.2386 11.5147 16 14 16C16.4853 16 18.5 18.2386 18.5 21"
            stroke="#8B5CF6"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M4.8 21C4.8 18.9 6.2 17.2 8.1 17"
            stroke="#A78BFA"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M23.2 21C23.2 18.9 21.8 17.2 19.9 17"
            stroke="#A78BFA"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
  }
};

/**
 * Seamless Full-Banner RTL 4K Hero Artwork (Diagonal Twilight Sky, Glass Towers, 3D Purple Ring & Iridescent Flowers)
 */
export const HeroTowersArtwork: React.FC<{ className?: string; mobileMode?: boolean }> = ({
  className = '',
  mobileMode = false,
}) => (
  <div className={`relative w-full h-full overflow-hidden bg-[#FBF9FF] ${className}`}>
    <img
      src={HERO_IMAGE_RTL}
      alt="أبراج أوربان نوفا السكنية الحديثة"
      referrerPolicy="no-referrer"
      className={`w-full h-full select-none pointer-events-none ${
        mobileMode
          ? 'object-cover object-left-bottom'
          : 'object-cover object-left-bottom'
      }`}
    />
    {/* Seamless right-edge blend on desktop so artwork never collides with RTL text column */}
    {!mobileMode && (
      <div
        aria-hidden="true"
        className="hidden lg:block absolute inset-y-0 right-0 w-24 xl:w-32 bg-gradient-to-l from-[#FBF9FF] via-[#FBF9FF]/85 to-transparent pointer-events-none"
      />
    )}
    {/* Seamless top-edge blend on mobile & tablet */}
    {mobileMode && (
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#FBF9FF] to-transparent pointer-events-none"
      />
    )}
  </div>
);

/**
 * Crisp Vector Overlapping Family Avatars Cluster (100% free of any screenshot artifacts)
 */
export const HeroFamilyAvatars: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center -space-x-2.5 space-x-reverse ${className}`} aria-label="سكان وعائلات أوربان نوفا">
    {[
      { bg: 'from-[#DDD6FE] to-[#A78BFA]', skin: '#F3D2C1', hair: '#27272A', shirt: '#7C3AED' },
      { bg: 'from-[#E0E7FF] to-[#818CF8]', skin: '#EBC3B0', hair: '#451A03', shirt: '#4F46E5' },
      { bg: 'from-[#FCE7F3] to-[#F472B6]', skin: '#F5D6C6', hair: '#18181B', shirt: '#9333EA' },
      { bg: 'from-[#CCFBF1] to-[#2DD4BF]', skin: '#E5B8A2', hair: '#3F3F46', shirt: '#0D9488' },
    ].map((av, idx) => (
      <div
        key={idx}
        className={`w-9 h-9 rounded-full ring-2 ring-white bg-gradient-to-br ${av.bg} overflow-hidden flex items-end justify-center shadow-xs shrink-0`}
      >
        <svg viewBox="0 0 36 36" className="w-full h-full" aria-hidden="true">
          <path d="M6 36C6 28.5 11.2 24 18 24C24.8 24 30 28.5 30 36H6Z" fill={av.shirt} />
          <circle cx="18" cy="14.5" r="6.2" fill={av.skin} />
          <path
            d="M11.5 13.5C11.5 9.5 14.2 7.2 18 7.2C21.8 7.2 24.5 9.5 24.5 13.5C23 11.2 20.5 10.5 18 10.5C15.5 10.5 13 11.2 11.5 13.5Z"
            fill={av.hair}
          />
        </svg>
      </div>
    ))}
  </div>
);

/**
 * Ultra-Sharp 4K 3D Isometric Illustrations for the 4 "Our Approach" cards (RTL oriented)
 */
export const Approach3DIllustration: React.FC<{ index: number; className?: string }> = ({
  index,
  className = '',
}) => {
  const src = APPROACH_IMAGES[index] || APPROACH_IMAGES[0];
  return (
    <div className={`w-full h-full flex items-end justify-center bg-white ${className}`}>
      <img
        src={src}
        alt=""
        referrerPolicy="no-referrer"
        className="w-full h-full object-contain object-bottom select-none pointer-events-none"
      />
    </div>
  );
};

/**
 * Seamless Full-Banner RTL 4K 3D Purple Architectural City Skyline backdrop
 */
export const Quarter3DCityBackdrop: React.FC<{ className?: string; mobileMode?: boolean }> = ({
  className = '',
  mobileMode = false,
}) => (
  <div className={`w-full h-full overflow-hidden bg-[#F7F5FD] ${className}`}>
    <img
      src={QUARTER_CITY_IMAGE_RTL}
      alt=""
      referrerPolicy="no-referrer"
      className={`w-full h-full select-none pointer-events-none ${
        mobileMode
          ? 'object-cover object-left scale-[1.25] origin-bottom-left'
          : 'object-cover object-left'
      }`}
    />
  </div>
);

/**
 * High-Resolution News Card Photographs (1: Towers, 2: Showroom, 3: Construction)
 */
export const NewsCardPhoto: React.FC<{ index: number; className?: string }> = ({
  index,
  className = '',
}) => {
  const src = NEWS_IMAGES[index] || NEWS_IMAGES[0];
  return (
    <div className={`w-full h-full overflow-hidden bg-[#EDE9FE] ${className}`}>
      <img
        src={src}
        alt=""
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover object-center select-none pointer-events-none"
      />
    </div>
  );
};
