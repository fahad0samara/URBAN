/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpLeft, Check, Menu, X, Calculator, MapPin, ArrowLeftRight } from 'lucide-react';
import {
  UrbanNovaLogoMark,
  ApproachCardIcon,
  HeroTowersArtwork,
  HeroFamilyAvatars,
  Approach3DIllustration,
  Quarter3DCityBackdrop,
  NewsCardPhoto,
} from './components/ReferenceArtwork';
import {
  APPROACH_FEATURES,
  QUARTER_HIGHLIGHTS,
  QUARTER_STATS,
  NEWS_ARTICLES,
  FLOOR_PLANS,
  MASTERPLAN_HOTSPOTS,
  ApproachFeature,
  NewsArticle,
  FloorPlanItem,
  MasterplanHotspot,
} from './data/urbanNovaData';
import {
  FloorPlansModal,
  MortgageModal,
  InquiryModal,
  FeatureDetailModal,
  NewsDetailModal,
  ComparePlansModal,
} from './components/InteractiveModals';
import { InteractiveFloorPlanDiagram } from './components/InteractiveFloorPlanDiagram';

export default function App() {
  // Modal states
  const [isFloorPlansOpen, setIsFloorPlansOpen] = useState(false);
  const [isMortgageOpen, setIsMortgageOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquirySubject, setInquirySubject] = useState('');
  const [activeFeature, setActiveFeature] = useState<ApproachFeature | null>(null);
  const [activeNews, setActiveNews] = useState<NewsArticle | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [routeToast, setRouteToast] = useState(false);

  // On-page Interactive Floor Plan Explorer state
  const [roomFilter, setRoomFilter] = useState<'all' | 'studio' | '1br' | '2br' | '3br'>('all');
  const [selectedPlan, setSelectedPlan] = useState<FloorPlanItem>(FLOOR_PLANS[1]);
  const [selectedFinish, setSelectedFinish] = useState<'scandi' | 'warm' | 'neoclassic'>('scandi');

  // Two-Apartment Side-by-Side Comparison state
  const [comparePlanIds, setComparePlanIds] = useState<string[]>([
    FLOOR_PLANS[1].id,
    FLOOR_PLANS[3].id,
  ]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const toggleComparePlan = (planId: string) => {
    setComparePlanIds((prev) => {
      if (prev.includes(planId)) {
        return prev.filter((id) => id !== planId);
      }
      if (prev.length >= 2) {
        return [prev[1], planId];
      }
      return [...prev, planId];
    });
  };

  const handleChangeCompareSlot = (slotIndex: 0 | 1, newPlanId: string) => {
    setComparePlanIds((prev) => {
      const next = [...prev];
      next[slotIndex] = newPlanId;
      return next;
    });
  };

  // On-page Interactive Masterplan Hotspot state
  const [activeHotspot, setActiveHotspot] = useState<MasterplanHotspot>(MASTERPLAN_HOTSPOTS[0]);

  // On-page Interactive Mortgage Calculator state
  const [calcPrice, setCalcPrice] = useState<number>(1150000);
  const [calcDownPct, setCalcDownPct] = useState<number>(15);
  const [calcYears, setCalcYears] = useState<number>(20);
  const [paymentPlanType, setPaymentPlanType] = useState<'mortgage' | 'installments' | 'cash'>(
    'mortgage'
  );

  const openInquiryWithSubject = (subject: string) => {
    setInquirySubject(subject);
    setIsInquiryOpen(true);
  };

  const filteredPlans =
    roomFilter === 'all' ? FLOOR_PLANS : FLOOR_PLANS.filter((p) => p.roomsType === roomFilter);
  const currentPlan =
    filteredPlans.find((p) => p.id === selectedPlan.id) || filteredPlans[0] || FLOOR_PLANS[0];

  // Mortgage calculation math
  const effectivePrice = paymentPlanType === 'cash' ? Math.round(calcPrice * 0.94) : calcPrice;
  const downPaymentAmount = Math.round((effectivePrice * calcDownPct) / 100);
  const loanPrincipal = Math.max(0, effectivePrice - downPaymentAmount);
  const annualRate = paymentPlanType === 'installments' ? 0 : 4.15;
  const totalMonths = calcYears * 12;
  const monthlyRate = annualRate / 100 / 12;
  const monthlyPayment =
    paymentPlanType === 'cash'
      ? 0
      : annualRate === 0
      ? Math.round(loanPrincipal / Math.min(totalMonths, 36))
      : Math.round(
          (loanPrincipal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
            (Math.pow(1 + monthlyRate, totalMonths) - 1)
        );

  return (
    <div dir="rtl" lang="ar" className="w-full min-h-screen bg-white text-[#18181B] flex flex-col">
      {/* ================= 1. STICKY FULL-WIDTH TOP BAR (3-Zone Contract) ================= */}
      <header className="sticky top-0 z-40 w-full bg-white/92 backdrop-blur-md border-b border-[#F3F0FA]">
        <div className="w-full max-w-[1440px] mx-auto flex items-center justify-between gap-8 px-4 sm:px-8 lg:px-14 py-4">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#top"
            className="flex items-center gap-3 text-[#18181B] whitespace-nowrap shrink-0 group"
          >
            <UrbanNovaLogoMark className="w-8 h-8 transition-transform duration-200 group-hover:scale-105" />
            <span className="font-latin text-base sm:text-lg font-bold tracking-wider uppercase leading-none">
              URBAN NOVA
            </span>
          </a>

          {/* Zone 2: 5 Single-Line Navigation Links */}
          <nav
            aria-label="التنقل الرئيسي"
            className="hidden lg:flex items-center gap-8 text-sm font-semibold text-[#3F3F46]"
          >
            <a
              href="#about-quarter"
              className="hover:text-[#7C3AED] transition-colors whitespace-nowrap shrink-0"
            >
              عن المشروع
            </a>
            <a
              href="#apartments-explorer"
              className="hover:text-[#7C3AED] transition-colors whitespace-nowrap shrink-0"
            >
              الشقق
            </a>
            <a
              href="#our-approach"
              className="hover:text-[#7C3AED] transition-colors whitespace-nowrap shrink-0"
            >
              البنية التحتية
            </a>
            <a
              href="#mortgage-section"
              className="hover:text-[#7C3AED] transition-colors whitespace-nowrap shrink-0"
            >
              التمويل العقاري
            </a>
            <a
              href="#contacts"
              className="hover:text-[#7C3AED] transition-colors whitespace-nowrap shrink-0"
            >
              تواصل معنا
            </a>
          </nav>

          {/* Zone 3: Primary Action Button + Mobile Menu Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => openInquiryWithSubject('طلب استشارة عامة حول مشروع أوربان نوفا')}
              className="px-5 sm:px-7 py-2.5 rounded-full bg-[#6D28D9] hover:bg-[#5B21B6] active:scale-[0.98] text-white text-xs sm:text-sm font-bold transition-all shadow-[0_8px_22px_rgba(109,40,217,0.36)] ring-1 ring-[#5B21B6]/20 whitespace-nowrap shrink-0 cursor-pointer"
            >
              قدّم طلباً
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="lg:hidden w-10 h-10 rounded-full bg-[#F3E8FF] text-[#4C1D95] hover:bg-[#E9D5FF] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Responsive Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="lg:hidden bg-white border-b border-[#EDE9FE] px-6 py-4 flex flex-col gap-3 text-sm font-semibold text-[#27272A]"
            >
              <a
                href="#about-quarter"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-[#7C3AED]"
              >
                عن المشروع
              </a>
              <a
                href="#apartments-explorer"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-[#7C3AED]"
              >
                الشقق والمخططات
              </a>
              <a
                href="#our-approach"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-[#7C3AED]"
              >
                البنية التحتية
              </a>
              <a
                href="#mortgage-section"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-[#7C3AED]"
              >
                التمويل العقاري
              </a>
              <a
                href="#project-news"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-[#7C3AED]"
              >
                أخبار المشروع
              </a>
              <a
                href="#contacts"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-[#7C3AED]"
              >
                تواصل معنا
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Wrapper */}
      <main className="flex-1 w-full">
        {/* ================= 2. HERO SECTION ================= */}
        <section
          id="top"
          className="scroll-mt-24 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 pt-4 sm:pt-6"
        >
          <div className="rounded-[28px] sm:rounded-[36px] bg-[#FBF9FF] relative overflow-hidden border border-[#E9E2FA] shadow-[0_14px_50px_rgba(109,40,217,0.07)]">
            {/* Desktop Artwork Stage: Confined to Left 62%-64% so Towers & Flowers Never Overlap RTL Text */}
            <div className="hidden lg:block absolute inset-y-0 left-0 w-[62%] xl:w-[64%] h-full z-0 pointer-events-none">
              <HeroTowersArtwork className="w-full h-full" />
            </div>

            <div className="flex flex-col lg:grid lg:grid-cols-12 items-stretch lg:min-h-[540px] xl:min-h-[600px] relative z-10">
              {/* Right Column in RTL (Full-Width Upper Block on Mobile & Tablet): Headline, Subtitle, High-Contrast CTAs, Social Proof */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full lg:col-span-5 z-20 flex flex-col justify-between p-6 sm:p-10 md:px-12 md:pt-12 md:pb-8 lg:py-14 lg:pr-12 xl:pr-14 lg:pl-6 bg-[#FBF9FF]/95 lg:bg-gradient-to-l lg:from-[#FBF9FF] lg:via-[#FBF9FF]/95 lg:to-transparent"
              >
                <div>
                  <h1
                    className="text-[34px] sm:text-[44px] md:text-[48px] lg:text-[44px] xl:text-[54px] font-bold text-[#18181B] leading-[1.18] tracking-tight"
                    style={{ textWrap: 'balance' }}
                  >
                    مدينة المستقبل
                    <br />
                    تبدأ
                    <br />
                    من <span className="text-[#7C3AED]">منزلك</span>
                  </h1>

                  <p className="mt-4 sm:mt-5 text-sm sm:text-base text-[#3F3F46] leading-[1.75] max-w-[440px] lg:max-w-[380px]">
                    حي سكني عصري ببنية تحتية ذكية، ساحات داخلية آمنة، وردهات استقبال بتصاميم فاخرة.
                  </p>

                  {/* High-Contrast CTA Action Buttons */}
                  <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-3.5">
                    <a
                      href="#apartments-explorer"
                      className="group inline-flex items-center gap-4 bg-gradient-to-l from-[#7C3AED] via-[#6D28D9] to-[#5B21B6] hover:from-[#6D28D9] hover:to-[#4C1D95] active:scale-[0.99] text-white rounded-full pr-7 pl-2.5 py-2.5 text-sm sm:text-[15px] font-bold ring-2 ring-[#7C3AED]/25 shadow-[0_14px_30px_-4px_rgba(109,40,217,0.45)] transition-all cursor-pointer whitespace-nowrap"
                    >
                      <span>استعرض المخططات</span>
                      <span className="w-9 h-9 rounded-full bg-white text-[#5B21B6] flex items-center justify-center shadow-xs transition-transform duration-200 group-hover:scale-105">
                        <ArrowUpLeft className="w-4 h-4 stroke-[2.5]" />
                      </span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setIsFloorPlansOpen(true)}
                      className="px-5 py-3 rounded-full bg-white hover:bg-[#F5F3FF] border-2 border-[#C4B5FD] hover:border-[#7C3AED] text-xs sm:text-sm font-bold text-[#4C1D95] shadow-[0_4px_14px_rgba(109,40,217,0.10)] transition-all cursor-pointer whitespace-nowrap"
                    >
                      عرض سريع للوحدات
                    </button>
                  </div>
                </div>

                {/* Social proof cluster with crisp vector family avatars */}
                <div className="mt-8 sm:mt-10 pt-4 border-t border-[#EDE9FA]/80 lg:border-t-0 flex items-center gap-4">
                  <HeroFamilyAvatars />
                  <div className="text-xs sm:text-sm leading-snug">
                    <div className="font-bold text-[#18181B] tabular-nums">أكثر من 2,500 عائلة</div>
                    <div className="text-[#52525B] text-xs font-medium">
                      اختارت بالفعل أوربان نوفا
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Left Column in RTL / Dedicated Non-Overlapping Artwork Stage on Mobile & Tablet */}
              <div className="w-full lg:col-span-7 relative overflow-hidden lg:pointer-events-none">
                <div className="lg:hidden w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[2/1]">
                  <HeroTowersArtwork mobileMode className="w-full h-full" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 3. OUR APPROACH ("منهجيتنا") SECTION ================= */}
        <section
          id="our-approach"
          className="scroll-mt-24 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 pt-16 sm:pt-20 pb-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45 }}
          >
            {/* Kicker with flanking lines */}
            <div className="flex items-center justify-center gap-3 text-xs font-semibold text-[#71717A] tracking-wide mb-3.5">
              <span className="w-8 h-[1px] bg-[#D4D4D8]" aria-hidden="true" />
              <span>منهجيتنا</span>
              <span className="w-8 h-[1px] bg-[#D4D4D8]" aria-hidden="true" />
            </div>

            {/* Centered Statement Headline with Teal & Purple Highlights */}
            <h2
              className="text-center text-2xl sm:text-3xl lg:text-[36px] font-semibold text-[#18181B] leading-[1.42] max-w-[820px] mx-auto"
              style={{ textWrap: 'balance' }}
            >
              <span className="font-latin font-semibold">Urban Nova</span> تبتكر مساحات سكنية، حيث
              تتناغم <span className="text-[#38B2AC]">العمارة</span>، و
              <span className="text-[#8B5CF6]">التكنولوجيا</span> والراحة معاً.
            </h2>
          </motion.div>

          {/* 4 Isometric 3D Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mt-10 sm:mt-12">
            {APPROACH_FEATURES.map((feature, index) => (
              <motion.article
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                whileHover={{ y: -5 }}
                onClick={() => setActiveFeature(feature)}
                className="group bg-white rounded-[24px] border border-[#EDE9FA] shadow-[0_8px_30px_rgba(124,58,237,0.04)] hover:border-[#C4B5FD] hover:shadow-[0_16px_40px_rgba(124,58,237,0.1)] transition-all flex flex-col justify-between overflow-hidden cursor-pointer relative"
              >
                {/* Top Text Content */}
                <div className="p-6 pb-2 z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-[#F6F3FF] flex items-center justify-center shrink-0">
                      <ApproachCardIcon index={index} className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-base text-[#18181B] leading-snug">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-[13px] text-[#71717A] leading-[1.65]">
                    {feature.shortDesc}
                  </p>
                </div>

                {/* Bottom High-Res 3D Isometric Artwork (RTL Aligned) */}
                <div className="relative h-52 sm:h-56 w-full mt-1 flex items-end justify-center overflow-hidden">
                  <Approach3DIllustration
                    index={index}
                    className="w-full h-full transition-transform duration-300 group-hover:scale-[1.03]"
                  />

                  {/* Single Clean Circular Action Button in Bottom-Left Corner */}
                  <span
                    className="absolute bottom-3.5 left-3.5 w-8 h-8 rounded-full bg-white shadow-md border border-slate-100 text-[#27272A] group-hover:bg-[#8B5CF6] group-hover:text-white flex items-center justify-center transition-colors z-20"
                    aria-hidden="true"
                  >
                    <ArrowUpLeft className="w-4 h-4" />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ================= 4. ABOUT THE QUARTER ("عن الحي السكني") SECTION ================= */}
        <section
          id="about-quarter"
          className="scroll-mt-24 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 py-8 sm:py-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="rounded-[30px] sm:rounded-[36px] bg-[#F7F5FD] border border-[#EAE4FA] overflow-hidden relative shadow-[0_14px_45px_rgba(124,58,237,0.06)]"
          >
            {/* Unified Full-Card RTL 3D Purple City Backdrop on Desktop (Zero Vertical Seam) */}
            <div className="hidden lg:block absolute inset-0 w-full h-full z-0 pointer-events-none">
              <Quarter3DCityBackdrop className="w-full h-full" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[460px] xl:min-h-[500px] relative z-10">
              {/* Right Column in RTL: Kicker, Headline, 5 Purple Checkmarks, Outlined Button */}
              <div className="lg:col-span-5 p-7 sm:p-10 lg:p-14 flex flex-col justify-between z-10 bg-gradient-to-l from-[#F7F5FD] via-[#F7F5FD]/90 to-transparent">
                <div>
                  <div className="flex items-center gap-3 text-xs font-semibold text-[#71717A] mb-3.5">
                    <span>عن الحي السكني</span>
                    <span className="w-12 h-[1px] bg-[#D4D4D8]" aria-hidden="true" />
                  </div>

                  <h2
                    className="text-2xl sm:text-3xl lg:text-[36px] font-semibold text-[#18181B] leading-[1.32]"
                    style={{ textWrap: 'balance' }}
                  >
                    حي سكني واحد —
                    <br />
                    آلاف <span className="text-[#7C3AED]">سيناريوهات الحياة</span>
                  </h2>

                  <ul className="mt-7 space-y-3.5">
                    {QUARTER_HIGHLIGHTS.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-3.5 text-xs sm:text-sm text-[#4B5563]"
                      >
                        <span className="w-5 h-5 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center shrink-0 shadow-2xs">
                          <Check className="w-3 h-3 stroke-[2.5]" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <a
                    href="#apartments-explorer"
                    className="group inline-flex items-center gap-3.5 bg-white/95 hover:bg-white border border-slate-200/90 rounded-full pr-6 pl-2 py-2 text-xs sm:text-sm font-semibold text-[#18181B] shadow-xs transition-all cursor-pointer whitespace-nowrap"
                  >
                    <span>اعرف المزيد</span>
                    <span className="w-7 h-7 rounded-full border border-slate-200 text-[#27272A] group-hover:bg-[#8B5CF6] group-hover:border-[#8B5CF6] group-hover:text-white flex items-center justify-center transition-colors">
                      <ArrowUpLeft className="w-3.5 h-3.5" />
                    </span>
                  </a>
                </div>
              </div>

              {/* Left Column in RTL: 2x2 Translucent Frosted Glass Stat Cards over 3D City */}
              <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[440px] flex items-center justify-center p-6 sm:p-10 lg:pl-14 overflow-hidden">
                {/* Mobile/Tablet Backdrop */}
                <div className="lg:hidden absolute inset-0 w-full h-full z-0 pointer-events-none">
                  <Quarter3DCityBackdrop mobileMode className="w-full h-full" />
                </div>

                {/* 2x2 Frosted Glass Stat Cards Grid */}
                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 w-full max-w-[500px]">
                  {QUARTER_STATS.map((stat, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -4, scale: 1.01 }}
                      onClick={() => setIsFloorPlansOpen(true)}
                      className="rounded-[22px] border border-white/75 bg-gradient-to-br from-[#A182F6]/76 via-[#8D68F0]/72 to-[#7C3AED]/76 hover:from-[#9571F5]/84 hover:to-[#6D28D9]/84 backdrop-blur-md p-5 sm:p-6 text-white shadow-[0_12px_32px_rgba(91,33,182,0.18)] transition-all cursor-pointer"
                    >
                      <div
                        dir="ltr"
                        className="font-latin text-2xl sm:text-3xl lg:text-[32px] font-semibold tracking-tight tabular-nums text-right leading-tight drop-shadow-2xs"
                      >
                        {stat.number}
                      </div>
                      <div className="text-sm sm:text-base font-bold mt-1.5 drop-shadow-2xs">
                        {stat.title}
                      </div>
                      <p className="text-xs text-white/95 leading-relaxed mt-2">
                        {stat.subtitle}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Interactive Masterplan Infrastructure Strip (Below Banner Card) */}
          <div className="mt-5 bg-[#FAF8FF] rounded-[22px] border border-[#EDE9FA] px-5 sm:px-8 py-4 shadow-2xs">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-[#52525B] ml-2">
                  معالم المخطط العام:
                </span>
                {MASTERPLAN_HOTSPOTS.map((hs) => {
                  const isActive = hs.id === activeHotspot.id;
                  return (
                    <button
                      key={hs.id}
                      type="button"
                      onClick={() => setActiveHotspot(hs)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                        isActive
                          ? 'bg-[#8B5CF6] text-white shadow-2xs'
                          : 'bg-white text-[#52525B] border border-[#E9E3FA] hover:border-[#8B5CF6]'
                      }`}
                    >
                      {hs.title}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between lg:justify-end gap-4 text-xs bg-white px-4 py-2.5 rounded-xl border border-[#EDE9FA]">
                <div>
                  <span className="font-bold text-[#7C3AED] ml-1.5">
                    {activeHotspot.category}:
                  </span>
                  <span className="text-[#52525B]">{activeHotspot.summary}</span>
                </div>
                <span className="font-bold text-[#18181B] bg-[#FAF8FF] px-2.5 py-1 rounded-lg border border-[#EDE9FA] whitespace-nowrap shrink-0 tabular-nums">
                  {activeHotspot.metric}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 5. INTERACTIVE APARTMENT & FLOOR PLAN EXPLORER FLOW ================= */}
        <section
          id="apartments-explorer"
          className="scroll-mt-24 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 py-12 sm:py-16"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 text-xs font-semibold text-[#71717A] mb-2.5">
                <span>مخططات الشقق والوحدات</span>
                <span className="w-10 h-[1px] bg-[#D4D4D8]" aria-hidden="true" />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#18181B]">
                اختر تخطيط شقتك المثالية
              </h2>
            </div>

            {/* Interactive Room Count Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#F6F4FC] rounded-2xl border border-[#EDE9FA]">
              {[
                { id: 'all', label: 'جميع الشقق' },
                { id: 'studio', label: 'استوديو' },
                { id: '1br', label: 'غرفة وصالة' },
                { id: '2br', label: 'غرفتين وصالة' },
                { id: '3br', label: '3 غرف وصالة' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    const next = tab.id as typeof roomFilter;
                    setRoomFilter(next);
                    const list =
                      next === 'all'
                        ? FLOOR_PLANS
                        : FLOOR_PLANS.filter((item) => item.roomsType === next);
                    if (list[0]) setSelectedPlan(list[0]);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    roomFilter === tab.id
                      ? 'bg-[#8B5CF6] text-white shadow-xs'
                      : 'text-[#52525B] hover:text-[#18181B]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Two-Apartment Comparison Selection Bar */}
          <div className="mb-6 rounded-[22px] bg-[#FAF8FF] border border-[#E9E3FA] p-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6D28D9] bg-[#F3E8FF] px-3 py-1.5 rounded-xl">
                <ArrowLeftRight className="w-3.5 h-3.5" />
                <span>مقارنة الشقق ({comparePlanIds.length}/2):</span>
              </span>

              {[0, 1].map((slotIdx) => {
                const planObj = FLOOR_PLANS.find((p) => p.id === comparePlanIds[slotIdx]);
                return planObj ? (
                  <div
                    key={planObj.id}
                    className="inline-flex items-center gap-2 bg-white border border-[#D8B4FE] text-xs font-semibold text-[#18181B] px-3 py-1.5 rounded-xl shadow-2xs"
                  >
                    <span className="font-latin text-[11px] font-bold text-[#7C3AED] bg-[#F3E8FF] px-1.5 py-0.5 rounded-md tabular-nums">
                      {planObj.code}
                    </span>
                    <span>{planObj.title}</span>
                    <span dir="ltr" className="text-[#71717A] tabular-nums">
                      ({planObj.areaSqm} م²)
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleComparePlan(planObj.id)}
                      className="text-[#A1A1AA] hover:text-rose-600 transition-colors cursor-pointer"
                      aria-label={`إزالة ${planObj.title} من المقارنة`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <span
                    key={`empty-${slotIdx}`}
                    className="inline-flex items-center text-xs text-[#71717A] border border-dashed border-[#D8B4FE] bg-white/60 px-3.5 py-1.5 rounded-xl"
                  >
                    اختر الشقة {slotIdx === 0 ? 'الأولى' : 'الثانية'} من القائمة أدناه...
                  </span>
                );
              })}
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                disabled={comparePlanIds.length < 2}
                onClick={() => setIsCompareOpen(true)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  comparePlanIds.length === 2
                    ? 'bg-[#8B5CF6] hover:bg-[#7C3AED] text-white shadow-[0_8px_20px_rgba(139,92,246,0.28)] cursor-pointer'
                    : 'bg-[#EDE9FE] text-[#A1A1AA] cursor-not-allowed'
                }`}
              >
                <ArrowLeftRight className="w-4 h-4" />
                <span>عرض المقارنة جنباً إلى جنب</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Unit List Column (Floor Plan Cards with gradual hover fade-in & compare selector) */}
            <div className="lg:col-span-5 flex flex-col gap-3.5">
              {filteredPlans.map((plan, idx) => {
                const isSelected = plan.id === currentPlan.id;
                const isCompared = comparePlanIds.includes(plan.id);
                const compareOrder = comparePlanIds.indexOf(plan.id) + 1;
                return (
                  <motion.div
                    key={plan.id}
                    role="button"
                    tabIndex={0}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isSelected ? 1 : 0.92, y: 0 }}
                    whileHover={{
                      opacity: 1,
                      y: -3,
                      x: -4,
                      transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
                    }}
                    transition={{ duration: 0.3, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => {
                      setSelectedPlan(plan);
                      setCalcPrice(plan.priceSar);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedPlan(plan);
                        setCalcPrice(plan.priceSar);
                      }
                    }}
                    className={`group relative overflow-hidden w-full text-right p-5 rounded-[22px] border transition-all duration-300 ease-out cursor-pointer ${
                      isSelected
                        ? 'border-[#8B5CF6] bg-[#FAF8FF] shadow-[0_12px_30px_rgba(139,92,246,0.12)]'
                        : isCompared
                        ? 'border-[#C4B5FD] bg-[#FDFCFF] hover:border-[#8B5CF6]'
                        : 'border-[#EDE9FA] bg-white hover:border-[#B794F6] hover:shadow-[0_14px_34px_rgba(124,58,237,0.10)]'
                    }`}
                  >
                    {/* Gradual Fade-In Ambient Gradient Overlay on Hover */}
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-l from-[#F3E8FF]/85 via-[#FAF7FF]/70 to-transparent transition-opacity duration-300 ease-out ${
                        isSelected ? 'opacity-70' : 'opacity-0 group-hover:opacity-100'
                      }`}
                    />

                    {/* Subtle Right-Edge Accent Bar with Fade-In on Hover */}
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute inset-y-3 right-0 w-1 rounded-l-full bg-gradient-to-b from-[#A78BFA] to-[#7C3AED] transition-opacity duration-300 ease-out ${
                        isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                    />

                    <div className="relative z-10 flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="font-latin text-xs font-bold text-[#7C3AED] bg-[#F3E8FF] group-hover:bg-[#8B5CF6] group-hover:text-white px-2.5 py-1 rounded-lg tabular-nums transition-colors duration-300 shrink-0">
                          {plan.code}
                        </span>
                        <span className="font-bold text-base text-[#18181B] group-hover:text-[#5B21B6] transition-colors duration-300 truncate">
                          {plan.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {/* Interactive Compare Selection Toggle Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleComparePlan(plan.id);
                          }}
                          className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border transition-all duration-200 cursor-pointer ${
                            isCompared
                              ? 'bg-[#8B5CF6] border-[#8B5CF6] text-white shadow-2xs'
                              : 'bg-white/95 border-[#E9D5FF] text-[#6D28D9] hover:bg-[#F3E8FF]'
                          }`}
                        >
                          <ArrowLeftRight className="w-3 h-3" />
                          <span>
                            {isCompared ? `للمقارنة (${compareOrder})` : '+ قارن'}
                          </span>
                        </button>

                        <span
                          dir="ltr"
                          className="text-sm font-extrabold text-[#7C3AED] tabular-nums shrink-0"
                        >
                          {plan.areaSqm} م²
                        </span>
                      </div>
                    </div>

                    <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 text-xs text-[#71717A] pt-2 border-t border-slate-100/90 group-hover:border-[#E9D5FF]/80 tabular-nums transition-colors duration-300">
                      <div className="flex items-center gap-1.5">
                        <span>{plan.building}</span>
                        <span className="mx-1" aria-hidden="true">
                          ·
                        </span>
                        <span>{plan.floorRange}</span>
                        <span
                          className="mx-1 hidden sm:inline opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          aria-hidden="true"
                        >
                          ·
                        </span>
                        <span className="hidden sm:inline text-[#7C3AED] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out">
                          {plan.viewType}
                        </span>
                      </div>
                      <div className="font-bold text-[#18181B] group-hover:text-[#6D28D9] text-sm transition-colors duration-300">
                        {plan.priceSar.toLocaleString('en-US')} ر.س
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Interactive Architectural Blueprint & Unit Configuration Column */}
            <div className="lg:col-span-7 bg-[#FAF8FF] rounded-[28px] border border-[#EDE9FA] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-[#EDE9FA]">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#7C3AED] font-semibold mb-1">
                      <span>{currentPlan.building}</span>
                      <span aria-hidden="true">·</span>
                      <span>{currentPlan.viewType}</span>
                      <span aria-hidden="true">·</span>
                      <span>التسليم: {currentPlan.completion}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#18181B]">
                      {currentPlan.title}
                    </h3>
                  </div>

                  <div className="text-left">
                    <div className="text-2xl font-extrabold text-[#7C3AED] tabular-nums">
                      {currentPlan.priceSar.toLocaleString('en-US')} ر.س
                    </div>
                    <div className="text-xs text-[#71717A] tabular-nums mt-0.5">
                      أو قسط شهري يبدأ من {currentPlan.monthlyFromSar.toLocaleString('en-US')} ر.س
                    </div>
                  </div>
                </div>

                {/* Finish Style Switcher */}
                <div className="flex flex-wrap items-center justify-between gap-3 my-4">
                  <span className="text-xs font-semibold text-[#52525B]">
                    نمط التشطيب الداخلي:
                  </span>
                  <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-[#EDE9FA]">
                    {[
                      { id: 'scandi', label: 'اسكندنافي فاتح' },
                      { id: 'warm', label: 'عصري دافئ' },
                      { id: 'neoclassic', label: 'نيو-كلاسيك فاخر' },
                    ].map((style) => (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => setSelectedFinish(style.id as typeof selectedFinish)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                          selectedFinish === style.id
                            ? 'bg-[#8B5CF6] text-white'
                            : 'text-[#52525B] hover:text-[#18181B]'
                        }`}
                      >
                        {style.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Crisp HTML/CSS Interactive Architectural Plan */}
                <div className="my-4">
                  <InteractiveFloorPlanDiagram plan={currentPlan} finishStyle={selectedFinish} />
                </div>

                {/* Unit Feature Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-4">
                  {currentPlan.features.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs text-[#3F3F46] bg-white px-3.5 py-2.5 rounded-xl border border-[#EDE9FA]"
                    >
                      <span className="w-4 h-4 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-5 mt-6 border-t border-[#EDE9FA]">
                <button
                  type="button"
                  onClick={() => {
                    setCalcPrice(currentPlan.priceSar);
                    const el = document.getElementById('mortgage-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#7C3AED] hover:text-[#5B21B6] transition-colors cursor-pointer"
                >
                  <Calculator className="w-4 h-4" />
                  <span>احسب القسط الشهري لهذه الشقة</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    openInquiryWithSubject(
                      `حجز وحدة: ${currentPlan.title} (${currentPlan.code}) - ${currentPlan.priceSar.toLocaleString('en-US')} ر.س`
                    )
                  }
                  className="inline-flex items-center gap-3 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-full shadow-[0_8px_20px_rgba(139,92,246,0.28)] transition-all cursor-pointer whitespace-nowrap"
                >
                  <span>احجز هذه الوحدة الآن</span>
                  <span className="w-6 h-6 rounded-full bg-white text-[#7C3AED] flex items-center justify-center">
                    <ArrowUpLeft className="w-3.5 h-3.5" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 6. ON-PAGE MORTGAGE & PAYMENT PLAN CALCULATOR ================= */}
        <section
          id="mortgage-section"
          className="scroll-mt-24 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 py-8"
        >
          <div className="rounded-[28px] sm:rounded-[34px] bg-[#FAF8FF] border border-[#EDE9FA] p-6 sm:p-10 lg:p-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-3 text-xs font-semibold text-[#71717A] mb-2">
                  <span>التمويل العقاري وخطط السداد</span>
                  <span className="w-10 h-[1px] bg-[#D4D4D8]" aria-hidden="true" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#18181B]">
                  حلول تملّك مرنة تناسب ميزانيتك
                </h2>
              </div>

              {/* Payment Plan Mode Selector */}
              <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white rounded-2xl border border-[#EDE9FA]">
                {[
                  { id: 'mortgage', label: 'تمويل عقاري (حتى 30 سنة)' },
                  { id: 'installments', label: 'أقساط مرحلية 0% فوائد' },
                  { id: 'cash', label: 'دفع نقدي (خصم 6%)' },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setPaymentPlanType(mode.id as typeof paymentPlanType)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      paymentPlanType === mode.id
                        ? 'bg-[#8B5CF6] text-white shadow-2xs'
                        : 'text-[#52525B] hover:text-[#18181B]'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Sliders Column */}
              <div className="lg:col-span-7 space-y-6 bg-white p-6 sm:p-8 rounded-[24px] border border-[#EDE9FA]">
                <div>
                  <div className="flex justify-between text-xs sm:text-sm mb-2.5">
                    <span className="text-[#52525B] font-semibold">سعر الوحدة السكنية</span>
                    <span className="font-bold text-[#18181B] tabular-nums text-base">
                      {calcPrice.toLocaleString('en-US')} ر.س
                    </span>
                  </div>
                  <input
                    type="range"
                    min={640000}
                    max={2200000}
                    step={20000}
                    value={calcPrice}
                    onChange={(e) => setCalcPrice(Number(e.target.value))}
                    className="w-full accent-[#8B5CF6] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-[#A1A1AA] mt-1 tabular-nums">
                    <span>640,000 ر.س</span>
                    <span>1,400,000 ر.س</span>
                    <span>2,200,000 ر.س</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs sm:text-sm mb-2.5">
                    <span className="text-[#52525B] font-semibold">
                      الدفعة الأولى ({calcDownPct}%)
                    </span>
                    <span className="font-bold text-[#18181B] tabular-nums text-base">
                      {downPaymentAmount.toLocaleString('en-US')} ر.س
                    </span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={50}
                    step={5}
                    value={calcDownPct}
                    onChange={(e) => setCalcDownPct(Number(e.target.value))}
                    className="w-full accent-[#8B5CF6] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-[#A1A1AA] mt-1 tabular-nums">
                    <span>10%</span>
                    <span>30%</span>
                    <span>50%</span>
                  </div>
                </div>

                {paymentPlanType !== 'cash' && (
                  <div>
                    <div className="flex justify-between text-xs sm:text-sm mb-2.5">
                      <span className="text-[#52525B] font-semibold">مدة السداد</span>
                      <span className="font-bold text-[#18181B] tabular-nums text-base">
                        {paymentPlanType === 'installments'
                          ? '3 سنوات (حتى التسليم)'
                          : `${calcYears} سنة`}
                      </span>
                    </div>
                    {paymentPlanType === 'mortgage' && (
                      <>
                        <input
                          type="range"
                          min={5}
                          max={30}
                          step={1}
                          value={calcYears}
                          onChange={(e) => setCalcYears(Number(e.target.value))}
                          className="w-full accent-[#8B5CF6] cursor-pointer"
                        />
                        <div className="flex justify-between text-[11px] text-[#A1A1AA] mt-1 tabular-nums">
                          <span>5 سنوات</span>
                          <span>15 سنة</span>
                          <span>30 سنة</span>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Result Summary Card */}
              <div className="lg:col-span-5 bg-gradient-to-br from-[#9F7AEA] via-[#8B5CF6] to-[#6D28D9] text-white rounded-[24px] p-7 sm:p-8 shadow-[0_14px_40px_rgba(109,40,217,0.25)] flex flex-col justify-between">
                <div>
                  <div className="text-xs font-semibold text-white/80 mb-1">
                    {paymentPlanType === 'cash'
                      ? 'إجمالي السعر بعد خصم الدفع النقدي (6%)'
                      : 'القسط الشهري التقديري'}
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold tabular-nums mb-5">
                    {paymentPlanType === 'cash'
                      ? `${effectivePrice.toLocaleString('en-US')} ر.س`
                      : `${monthlyPayment.toLocaleString('en-US')} ر.س / شهرياً`}
                  </div>

                  <div className="space-y-2.5 text-xs sm:text-sm text-white/90 border-t border-white/20 pt-4 tabular-nums">
                    <div className="flex justify-between">
                      <span>قيمة الوحدة:</span>
                      <span className="font-bold">{effectivePrice.toLocaleString('en-US')} ر.س</span>
                    </div>
                    <div className="flex justify-between">
                      <span>الدفعة المقدمة ({calcDownPct}%):</span>
                      <span className="font-bold">
                        {downPaymentAmount.toLocaleString('en-US')} ر.س
                      </span>
                    </div>
                    {paymentPlanType !== 'cash' && (
                      <div className="flex justify-between">
                        <span>مبلغ التمويل المتبقي:</span>
                        <span className="font-bold">
                          {loanPrincipal.toLocaleString('en-US')} ر.س
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>معدل المرابحة السنوي:</span>
                      <span className="font-bold">{annualRate}%</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    openInquiryWithSubject(
                      `طلب عرض تمويل عقاري — سعر الوحدة ${effectivePrice.toLocaleString('en-US')} ر.س، القسط الشهري ${monthlyPayment.toLocaleString('en-US')} ر.س`
                    )
                  }
                  className="mt-7 w-full py-3.5 px-5 rounded-full bg-white text-[#6D28D9] hover:bg-slate-50 font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-sm"
                >
                  احصل على موافقة تمويلية فورية
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 7. PROJECT NEWS ("أخبار المشروع") SECTION ================= */}
        <section
          id="project-news"
          className="scroll-mt-24 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 pt-10 pb-16 sm:pb-20"
        >
          {/* Section Header Row */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3 text-xs font-semibold text-[#71717A]">
              <span>أخبار المشروع</span>
              <span className="w-12 h-[1px] bg-[#D4D4D8]" aria-hidden="true" />
            </div>

            <button
              type="button"
              onClick={() => setActiveNews(NEWS_ARTICLES[0])}
              className="group inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#27272A] hover:text-[#7C3AED] transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>جميع الأخبار</span>
              <span className="w-7 h-7 rounded-full border border-slate-200 group-hover:border-[#8B5CF6] flex items-center justify-center">
                <ArrowUpLeft className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>

          {/* 3 News Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {NEWS_ARTICLES.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
                }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setActiveNews(article)}
                className="group bg-white rounded-[24px] border border-[#EDE9FA] shadow-[0_8px_28px_rgba(124,58,237,0.05)] hover:border-[#B794F6] hover:shadow-[0_24px_50px_-12px_rgba(109,40,217,0.24)] transition-[box-shadow,border-color] duration-200 overflow-hidden flex flex-col justify-between cursor-pointer"
              >
                {/* Top High-Res Photo with Localized Category Tag & Date Box */}
                <div className="relative h-52 sm:h-56 w-full overflow-hidden rounded-t-[23px]">
                  <NewsCardPhoto
                    index={index}
                    className="w-full h-full transition-transform duration-300 ease-out group-hover:scale-105"
                  />

                  {/* Subtle gradient overlay on hover for depth */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#1E1B4B]/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Category Badge on Top-Right */}
                  <div className="absolute top-3.5 right-3.5 z-10 bg-[#8B6BF2] group-hover:bg-[#7C3AED] text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-xs transition-colors duration-200">
                    {article.category}
                  </div>

                  {/* Date Card on Bottom-Right */}
                  <div className="absolute bottom-3.5 right-3.5 z-10 bg-white rounded-2xl px-3.5 py-2 text-center shadow-md group-hover:shadow-lg group-hover:-translate-y-0.5 transition-all duration-200 min-w-[52px]">
                    <div className="font-latin text-lg sm:text-xl font-bold text-[#18181B] group-hover:text-[#7C3AED] leading-none tabular-nums transition-colors duration-200">
                      {article.day}
                    </div>
                    <div className="text-[11px] font-semibold text-[#71717A] mt-0.5">
                      {article.month}
                    </div>
                  </div>
                </div>

                {/* Bottom Text & Circular Action Arrow */}
                <div className="p-5 sm:p-6 flex items-end justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-base sm:text-[17px] text-[#18181B] group-hover:text-[#7C3AED] transition-colors duration-200">
                      {article.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[#71717A] leading-relaxed mt-2 line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>

                  <span
                    className="w-9 h-9 rounded-full bg-[#FAF8FF] border border-[#EDE9FE] text-[#27272A] group-hover:bg-[#8B5CF6] group-hover:border-[#8B5CF6] group-hover:text-white group-hover:shadow-[0_6px_16px_rgba(139,92,246,0.35)] flex items-center justify-center shrink-0 transition-all duration-200"
                    aria-hidden="true"
                  >
                    <ArrowUpLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </main>

      {/* ================= 8. FULL-WIDTH QUIET FOOTER ================= */}
      <footer id="contacts" className="scroll-mt-24 w-full bg-[#FAF9FE] border-t border-[#EDE9FA]">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
            {/* Col 1: Brand & Copyright */}
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center gap-3">
                <UrbanNovaLogoMark className="w-7 h-7" />
                <span className="font-latin text-base font-bold tracking-wider uppercase text-[#18181B]">
                  URBAN NOVA
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#71717A] leading-relaxed max-w-[280px]">
                نبني أحياءً سكنية عصرية لحياة مريحة وسعيدة.
              </p>
              <p className="text-xs text-[#A1A1AA] pt-1">
                © 2026 Urban Nova. جميع الحقوق محفوظة.
              </p>
            </div>

            {/* Col 2: Sales Office */}
            <div className="lg:col-span-3 space-y-2 text-xs sm:text-sm">
              <div className="font-bold text-[#18181B]">مكتب المبيعات</div>
              <p className="text-[#71717A] leading-relaxed">
                الرياض، واجهة الأعمال، طريق الملك فهد،
                <br />
                برج الشاطئ، بلوك C
              </p>
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setRouteToast(true);
                    setTimeout(() => setRouteToast(false), 4000);
                  }}
                  className="text-[#8B5CF6] hover:text-[#6D28D9] font-semibold underline underline-offset-4 cursor-pointer"
                >
                  رسم المسار على الخريطة
                </button>
                {routeToast && (
                  <p className="text-xs text-emerald-600 font-medium mt-1.5">
                    الإحداثيات جاهزة: جناح مبيعات أوربان نوفا (البوابة الشمالية - موقف الزوار مجاني)
                  </p>
                )}
              </div>
            </div>

            {/* Col 3: Hours, Phone, Email */}
            <div className="lg:col-span-3 space-y-2 text-xs sm:text-sm">
              <div className="text-[#71717A]">يومياً من 9:00 صباحاً حتى 9:00 مساءً</div>
              <div>
                <a
                  href="tel:+966111202000"
                  dir="ltr"
                  className="font-latin text-base font-bold text-[#18181B] hover:text-[#7C3AED] transition-colors tabular-nums inline-block"
                >
                  +966 (11) 120-20-00
                </a>
              </div>
              <div>
                <a
                  href="mailto:info@urbannova.sa"
                  className="font-latin text-xs sm:text-sm text-[#71717A] hover:text-[#7C3AED] transition-colors"
                >
                  info@urbannova.sa
                </a>
              </div>
            </div>

            {/* Col 4: Social Networks */}
            <div className="lg:col-span-2 space-y-3 text-xs sm:text-sm">
              <div className="font-bold text-[#18181B]">نحن على شبكات التواصل</div>
              <div className="flex items-center gap-2.5">
                {[
                  {
                    label: 'X / VK',
                    icon: (
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path d="M11.3 8.9L16.5 3h-1.2l-4.5 5.1L7.2 3H3l5.5 7.8L3 17h1.2l4.8-5.4L12.8 17H17l-5.7-8.1zm-1.7 1.9l-.6-.8L4.7 3.9h1.9l3.6 5 .6.8 4.6 6.4h-1.9l-3.9-5.3z" />
                      </svg>
                    ),
                  },
                  {
                    label: 'تيليجرام',
                    icon: (
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path d="M17.2 3.6L2.9 9.1c-1 .4-1 1-.2 1.2l3.7 1.1 8.5-5.3c.4-.2.8-.1.5.2l-6.9 6.2-.3 3.8c.4 0 .6-.2.8-.4l1.9-1.8 3.9 2.9c.7.4 1.2.2 1.4-.7l2.4-11.5c.3-1-.4-1.4-1.3-1.2z" />
                      </svg>
                    ),
                  },
                  {
                    label: 'يوتيوب',
                    icon: (
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path d="M17.6 6.2c-.2-.8-.8-1.4-1.6-1.6C14.6 4.2 10 4.2 10 4.2s-4.6 0-6 .4c-.8.2-1.4.8-1.6 1.6-.4 1.4-.4 3.8-.4 3.8s0 2.4.4 3.8c.2.8.8 1.4 1.6 1.6 1.4.4 6 .4 6 .4s4.6 0 6-.4c.8-.2 1.4-.8 1.6-1.6.4-1.4.4-3.8.4-3.8s0-2.4-.4-3.8zM8.5 12.5v-5l4.2 2.5-4.2 2.5z" />
                      </svg>
                    ),
                  },
                  {
                    label: 'إنستغرام',
                    icon: (
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path d="M10 4.8c1.7 0 1.9 0 2.6.1.6 0 1 .1 1.2.2.3.1.5.3.7.5.2.2.4.4.5.7.1.2.2.6.2 1.2.1.7.1.9.1 2.6s0 1.9-.1 2.6c0 .6-.1 1-.2 1.2-.1.3-.3.5-.5.7-.2.2-.4.4-.7.5-.2.1-.6.2-1.2.2-.7.1-.9.1-2.6.1s-1.9 0-2.6-.1c-.6 0-1-.1-1.2-.2-.3-.1-.5-.3-.7-.5-.2-.2-.4-.4-.5-.7-.1-.2-.2-.6-.2-1.2-.1-.7-.1-.9-.1-2.6s0-1.9.1-2.6c0-.6.1-1 .2-1.2.1-.3.3-.5.5-.7.2-.2.4-.4.7-.5.2-.1.6-.2 1.2-.2.7-.1.9-.1 2.6-.1M10 3.5c-1.8 0-2 0-2.7.1-.7 0-1.2.1-1.6.3-.4.2-.8.4-1.2.8-.4.4-.6.8-.8 1.2-.2.4-.3.9-.3 1.6-.1.7-.1.9-.1 2.7s0 2 .1 2.7c0 .7.1 1.2.3 1.6.2.4.4.8.8 1.2.4.4.8.6 1.2.8.4.2.9.3 1.6.3.7.1.9.1 2.7.1s2 0 2.7-.1c.7 0 1.2-.1 1.6-.3.4-.2.8-.4 1.2-.8.4-.4.6-.8.8-1.2.2-.4.3-.9.3-1.6.1-.7.1-.9.1-2.7s0-2-.1-2.7c0-.7-.1-1.2-.3-1.6-.2-.4-.4-.8-.8-1.2-.4-.4-.8-.6-1.2-.8-.4-.2-.9-.3-1.6-.3-.7-.1-.9-.1-2.7-.1zm0 3.2a3.3 3.3 0 100 6.6 3.3 3.3 0 000-6.6zm0 5.4a2.1 2.1 0 110-4.2 2.1 2.1 0 010 4.2zm3.5-6.4a.8.8 0 100 1.6.8.8 0 000-1.6z" />
                      </svg>
                    ),
                  },
                ].map((social, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => openInquiryWithSubject(`التواصل عبر ${social.label}`)}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-xl bg-white border border-[#EDE9FE] text-[#7C3AED] hover:bg-[#8B5CF6] hover:text-white flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                  >
                    {social.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= INTERACTIVE MODALS ================= */}
      <FloorPlansModal
        isOpen={isFloorPlansOpen}
        onClose={() => setIsFloorPlansOpen(false)}
        onSelectForInquiry={(planTitle) =>
          openInquiryWithSubject(`طلب حجز / عرض سعر: ${planTitle}`)
        }
      />

      <MortgageModal
        isOpen={isMortgageOpen}
        onClose={() => setIsMortgageOpen(false)}
        onApplyMortgage={(summary) => openInquiryWithSubject(summary)}
      />

      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        initialSubject={inquirySubject}
      />

      <FeatureDetailModal
        feature={activeFeature}
        onClose={() => setActiveFeature(null)}
        onRequestTour={(subject) => openInquiryWithSubject(subject)}
      />

      <NewsDetailModal
        article={activeNews}
        onClose={() => setActiveNews(null)}
        onSelectArticle={(article) => setActiveNews(article)}
      />

      <ComparePlansModal
        isOpen={isCompareOpen}
        planIds={comparePlanIds}
        onClose={() => setIsCompareOpen(false)}
        onChangePlanSlot={handleChangeCompareSlot}
        onSelectForInquiry={(subject) => openInquiryWithSubject(subject)}
      />
    </div>
  );
}
