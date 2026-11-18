import React, { useState } from 'react';
import { X, Check, ArrowUpLeft, Calculator, ArrowLeftRight, Sparkles } from 'lucide-react';
import {
  FLOOR_PLANS,
  NEWS_ARTICLES,
  ApproachFeature,
  FloorPlanItem,
  NewsArticle,
} from '../data/urbanNovaData';
import { InteractiveFloorPlanDiagram } from './InteractiveFloorPlanDiagram';

interface FloorPlansModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectForInquiry: (planTitle: string) => void;
}

export const FloorPlansModal: React.FC<FloorPlansModalProps> = ({
  isOpen,
  onClose,
  onSelectForInquiry,
}) => {
  const [filter, setFilter] = useState<'all' | 'studio' | '1br' | '2br' | '3br'>('all');
  const [selectedPlan, setSelectedPlan] = useState<FloorPlanItem>(FLOOR_PLANS[1]);

  if (!isOpen) return null;

  const filteredPlans =
    filter === 'all' ? FLOOR_PLANS : FLOOR_PLANS.filter((p) => p.roomsType === filter);

  const activePlan =
    filteredPlans.find((p) => p.id === selectedPlan.id) || filteredPlans[0] || FLOOR_PLANS[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="مخططات الشقق السكنية"
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-[28px] p-6 md:p-8 shadow-2xl border border-[#EDE9FE] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <p className="text-xs font-semibold text-[#8B5CF6] mb-1">مخططات أوربان نوفا الهندسية</p>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900">
              اختر تخطيط منزلك المستقبلي
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Interactive segmented filter */}
        <div className="flex flex-wrap items-center gap-2 my-5 p-1.5 bg-[#F6F5FA] rounded-2xl w-fit">
          {[
            { id: 'all', label: 'جميع الوحدات' },
            { id: 'studio', label: 'استوديو' },
            { id: '1br', label: 'غرفة وصالة' },
            { id: '2br', label: 'غرفتين وصالة' },
            { id: '3br', label: '3 غرف وصالة' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                const nextFilter = tab.id as typeof filter;
                setFilter(nextFilter);
                const matches =
                  nextFilter === 'all'
                    ? FLOOR_PLANS
                    : FLOOR_PLANS.filter((p) => p.roomsType === nextFilter);
                if (matches[0]) setSelectedPlan(matches[0]);
              }}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                filter === tab.id
                  ? 'bg-[#8B5CF6] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Plan selector list */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {filteredPlans.map((plan) => {
              const isSelected = plan.id === activePlan.id;
              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setSelectedPlan(plan)}
                  className={`text-right p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#8B5CF6] bg-[#F8F5FF]'
                      : 'border-slate-200/80 bg-white hover:border-[#C4B5FD]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-bold text-slate-900 text-sm md:text-base">
                      {plan.title}
                    </span>
                    <span className="text-xs font-semibold text-[#7C3AED] tabular-nums">
                      {plan.areaSqm} م²
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 tabular-nums">
                    <span>{plan.building}</span>
                    <span aria-hidden="true">·</span>
                    <span>{plan.floorRange}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-slate-800">
                      {plan.priceSar.toLocaleString('en-US')} ر.س
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Architectural schematic & details */}
          <div className="lg:col-span-7 bg-[#FAF8FF] rounded-2xl p-5 md:p-6 border border-[#EDE9FE] flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <h4 className="text-lg font-bold text-slate-900">{activePlan.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {activePlan.building} · {activePlan.viewType} · التسليم: {activePlan.completion}
                  </p>
                </div>
                <div className="text-left">
                  <div className="text-lg font-extrabold text-[#7C3AED] tabular-nums">
                    {activePlan.priceSar.toLocaleString('en-US')} ر.س
                  </div>
                  <div className="text-[11px] text-slate-500 tabular-nums">
                    المساحة الإجمالية: {activePlan.areaSqm} م²
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <InteractiveFloorPlanDiagram plan={activePlan} finishStyle="scandi" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-5">
                {activePlan.features.map((feat, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-xs text-slate-700 bg-white px-3 py-2 rounded-xl border border-slate-100"
                  >
                    <span className="w-4 h-4 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#EDE9FE]">
              <div className="text-xs text-slate-500">
                متاح للحجز الفوري أو جدولة زيارة لصالة العرض
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSelectForInquiry(activePlan.title);
                }}
                className="inline-flex items-center gap-2.5 bg-[#9F7AEA] hover:bg-[#8B5CF6] text-white text-xs md:text-sm font-semibold px-5 py-2.5 rounded-full transition-colors cursor-pointer"
              >
                <span>احجز استشارة لهذه الوحدة</span>
                <span className="w-6 h-6 rounded-full bg-white text-[#7C3AED] flex items-center justify-center">
                  <ArrowUpLeft className="w-3.5 h-3.5" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface MortgageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyMortgage: (summary: string) => void;
}

export const MortgageModal: React.FC<MortgageModalProps> = ({
  isOpen,
  onClose,
  onApplyMortgage,
}) => {
  const [price, setPrice] = useState(1150000);
  const [downPaymentPct, setDownPaymentPct] = useState(15);
  const [years, setYears] = useState(20);
  const annualRate = 4.15;

  if (!isOpen) return null;

  const downPaymentAmount = Math.round((price * downPaymentPct) / 100);
  const loanPrincipal = price - downPaymentAmount;
  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = years * 12;
  const monthlyPayment = Math.round(
    (loanPrincipal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="حاسبة التمويل العقاري"
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-[28px] p-6 md:p-8 shadow-2xl border border-[#EDE9FE]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F3E8FF] text-[#7C3AED] flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">حاسبة التمويل العقاري</h3>
              <p className="text-xs text-slate-500">خطط تمويلية مرنة بالتعاون مع البنوك الشريكة</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6 items-center">
          <div className="md:col-span-7 space-y-5">
            <div>
              <div className="flex justify-between text-xs md:text-sm mb-2">
                <span className="text-slate-600 font-medium">قيمة الوحدة السكنية</span>
                <span className="font-bold text-slate-900 tabular-nums">
                  {price.toLocaleString('en-US')} ر.س
                </span>
              </div>
              <input
                type="range"
                min={600000}
                max={2500000}
                step={25000}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full accent-[#8B5CF6] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs md:text-sm mb-2">
                <span className="text-slate-600 font-medium">الدفعة الأولى ({downPaymentPct}%)</span>
                <span className="font-bold text-slate-900 tabular-nums">
                  {downPaymentAmount.toLocaleString('en-US')} ر.س
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={50}
                step={5}
                value={downPaymentPct}
                onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                className="w-full accent-[#8B5CF6] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs md:text-sm mb-2">
                <span className="text-slate-600 font-medium">مدة التمويل</span>
                <span className="font-bold text-slate-900 tabular-nums">{years} سنة</span>
              </div>
              <input
                type="range"
                min={5}
                max={30}
                step={1}
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full accent-[#8B5CF6] cursor-pointer"
              />
            </div>
          </div>

          <div className="md:col-span-5 bg-gradient-to-br from-[#9F7AEA] to-[#7C3AED] text-white rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <p className="text-xs text-white/80 mb-1">القسط الشهري التقديري</p>
              <div className="text-2xl md:text-3xl font-extrabold tabular-nums mb-4">
                {monthlyPayment.toLocaleString('en-US')} ر.س
              </div>
              <div className="space-y-2 text-xs text-white/90 border-t border-white/20 pt-3 tabular-nums">
                <div className="flex justify-between">
                  <span>مبلغ التمويل:</span>
                  <span className="font-semibold">{loanPrincipal.toLocaleString('en-US')} ر.س</span>
                </div>
                <div className="flex justify-between">
                  <span>نسبة المرابحة السنوية:</span>
                  <span className="font-semibold">{annualRate}%</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onApplyMortgage(
                  `طلب تمويل عقاري — قسط شهري ${monthlyPayment.toLocaleString('en-US')} ر.س لمدة ${years} سنة`
                );
              }}
              className="mt-6 w-full py-2.5 px-4 rounded-full bg-white text-[#6D28D9] font-bold text-xs md:text-sm hover:bg-slate-50 transition-colors cursor-pointer"
            >
              تقديم طلب موافقة مبدئية
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSubject?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  initialSubject = '',
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState(initialSubject);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    setNotes(initialSubject);
    setSubmitted(false);
    setError('');
  }, [initialSubject, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName.trim().length < 2) {
      setError('يرجى إدخال الاسم الكامل بشكل صحيح.');
      return;
    }
    if (phone.trim().length < 8) {
      setError('يرجى إدخال رقم هاتف صحيح للتواصل.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="تقديم طلب استشارة"
    >
      <div
        className="relative w-full max-w-md bg-white rounded-[28px] p-6 md:p-8 shadow-2xl border border-[#EDE9FE]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 mb-5">
          <div>
            <p className="text-xs font-semibold text-[#8B5CF6]">تواصل مباشر مع مستشار المبيعات</p>
            <h3 className="text-xl font-bold text-slate-900 mt-0.5">قدّم طلبك الآن</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Check className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">تم استلام طلبك بنجاح!</h4>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              شكراً لك <span className="font-semibold text-slate-900">{fullName}</span>. سيتواصل معك
              فريق مبيعات أوربان نوفا على الرقم{' '}
              <span className="font-semibold tabular-nums" dir="ltr">
                {phone}
              </span>{' '}
              خلال 15 دقيقة.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 px-6 py-2.5 rounded-full bg-[#8B5CF6] text-white text-xs font-semibold hover:bg-[#7C3AED] transition-colors cursor-pointer"
            >
              العودة إلى الصفحة الرئيسية
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                الاسم الكامل *
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="مثال: فهد العتيبي"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#8B5CF6]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                رقم الجوال *
              </label>
              <input
                type="tel"
                dir="ltr"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+966 50 000 0000"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-right focus:outline-none focus:border-[#8B5CF6] tabular-nums"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                البريد الإلكتروني (اختياري)
              </label>
              <input
                type="email"
                dir="ltr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-right focus:outline-none focus:border-[#8B5CF6]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                الوحدة أو الاستفسار المطلوب
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="استفسار عن الشقق، الأسعار، أو موعد زيارة..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#8B5CF6]"
              />
            </div>

            {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#9F7AEA] hover:bg-[#8B5CF6] text-white font-bold text-sm transition-colors cursor-pointer shadow-sm"
            >
              إرسال الطلب الآن
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

interface FeatureDetailModalProps {
  feature: ApproachFeature | null;
  onClose: () => void;
  onRequestTour: (subject: string) => void;
}

export const FeatureDetailModal: React.FC<FeatureDetailModalProps> = ({
  feature,
  onClose,
  onRequestTour,
}) => {
  if (!feature) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-[28px] p-6 md:p-8 shadow-2xl border border-[#EDE9FE]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="text-xs font-semibold text-[#8B5CF6] mb-1">منهجية أوربان نوفا</p>
            <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed mb-5">{feature.fullDesc}</p>

        <div className="bg-[#FAF8FF] border border-[#EDE9FE] rounded-2xl p-4 mb-5 space-y-2.5">
          {feature.highlights.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-700">
              <span className="w-4 h-4 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-2.5 h-2.5" />
              </span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4 pt-3 border-t border-slate-100">
          <div>
            <div className="text-xs text-slate-500">{feature.statsLabel}</div>
            <div className="text-lg font-extrabold text-[#7C3AED] tabular-nums">
              {feature.statsValue}
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              onClose();
              onRequestTour(`جولة تعريفية: ${feature.title}`);
            }}
            className="px-5 py-2.5 rounded-full bg-[#9F7AEA] hover:bg-[#8B5CF6] text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            احجز جولة لتجربة الميزة
          </button>
        </div>
      </div>
    </div>
  );
};

interface NewsDetailModalProps {
  article: NewsArticle | null;
  onClose: () => void;
  onSelectArticle: (article: NewsArticle) => void;
}

export const NewsDetailModal: React.FC<NewsDetailModalProps> = ({
  article,
  onClose,
  onSelectArticle,
}) => {
  if (!article) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-[28px] p-6 md:p-8 shadow-2xl border border-[#EDE9FE] max-h-[88vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#7C3AED] font-semibold mb-1">
              <span>{article.category}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">
                {article.day} {article.month}
              </span>
              <span aria-hidden="true">·</span>
              <span>{article.buildingPhase}</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">{article.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3.5 text-sm text-slate-600 leading-relaxed mb-6">
          {article.fullContent.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className="border-t border-slate-100 pt-4">
          <p className="text-xs font-semibold text-slate-500 mb-2.5">أخبار أخرى من المشروع:</p>
          <div className="flex flex-wrap gap-2">
            {NEWS_ARTICLES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectArticle(item)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  item.id === article.id
                    ? 'bg-[#8B5CF6] text-white'
                    : 'bg-[#F6F5FA] text-slate-700 hover:bg-[#EDE9FE]'
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ComparePlansModalProps {
  isOpen: boolean;
  planIds: string[];
  onClose: () => void;
  onChangePlanSlot: (slotIndex: 0 | 1, newPlanId: string) => void;
  onSelectForInquiry: (subject: string) => void;
}

export const ComparePlansModal: React.FC<ComparePlansModalProps> = ({
  isOpen,
  planIds,
  onClose,
  onChangePlanSlot,
  onSelectForInquiry,
}) => {
  if (!isOpen) return null;

  const planA = FLOOR_PLANS.find((p) => p.id === planIds[0]) || FLOOR_PLANS[0];
  const planB =
    FLOOR_PLANS.find((p) => p.id === planIds[1]) ||
    FLOOR_PLANS.find((p) => p.id !== planA.id) ||
    FLOOR_PLANS[1];

  const areaDiff = Number(Math.abs(planA.areaSqm - planB.areaSqm).toFixed(1));
  const largerPlan =
    planA.areaSqm > planB.areaSqm ? planA : planB.areaSqm > planA.areaSqm ? planB : null;

  const priceDiff = Math.abs(planA.priceSar - planB.priceSar);
  const cheaperPlan =
    planA.priceSar < planB.priceSar ? planA : planB.priceSar < planA.priceSar ? planB : null;

  const monthlyDiff = Math.abs(planA.monthlyFromSar - planB.monthlyFromSar);

  const pricePerSqmA = Math.round(planA.priceSar / planA.areaSqm);
  const pricePerSqmB = Math.round(planB.priceSar / planB.areaSqm);
  const pricePerSqmDiff = Math.abs(pricePerSqmA - pricePerSqmB);

  const pairPlans = [planA, planB] as const;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-3 sm:p-5"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="مقارنة المخططات السكنية جنباً إلى جنب"
    >
      <div
        className="relative w-full max-w-5xl bg-white rounded-[28px] sm:rounded-[32px] p-5 sm:p-8 shadow-2xl border border-[#EDE9FE] max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#EDE9FA]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#F3E8FF] text-[#7C3AED] flex items-center justify-center shrink-0">
              <ArrowLeftRight className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#8B5CF6]">أداة المقارنة الذكية للوحدات</p>
              <h3 className="text-xl sm:text-2xl font-bold text-[#18181B]">
                مقارنة الشقتين جنباً إلى جنب
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
            aria-label="إغلاق نافذة المقارنة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Direct Differences Summary Strip (فرق المساحة والسعر والقسط) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 my-6">
          <div className="rounded-2xl bg-[#FAF8FF] border border-[#EDE9FA] p-4">
            <div className="text-xs font-semibold text-[#71717A]">فرق المساحة الإجمالية</div>
            <div dir="ltr" className="text-xl font-extrabold text-[#7C3AED] tabular-nums text-right mt-1">
              {areaDiff} م²
            </div>
            <div className="text-[11px] text-[#52525B] mt-1">
              {largerPlan
                ? `${largerPlan.title} (${largerPlan.code}) أكبر مساحة`
                : 'الشقتان بنفس المساحة تماماً'}
            </div>
          </div>

          <div className="rounded-2xl bg-[#FAF8FF] border border-[#EDE9FA] p-4">
            <div className="text-xs font-semibold text-[#71717A]">فرق السعر الإجمالي</div>
            <div className="text-xl font-extrabold text-[#18181B] tabular-nums mt-1">
              {priceDiff.toLocaleString('en-US')} ر.س
            </div>
            <div className="text-[11px] text-emerald-700 font-medium mt-1">
              {cheaperPlan
                ? `وفّر مع ${cheaperPlan.title} (${cheaperPlan.code})`
                : 'الشقتان بنفس السعر الإجمالي'}
            </div>
          </div>

          <div className="rounded-2xl bg-[#FAF8FF] border border-[#EDE9FA] p-4">
            <div className="text-xs font-semibold text-[#71717A]">فرق القسط الشهري</div>
            <div className="text-xl font-extrabold text-[#7C3AED] tabular-nums mt-1">
              {monthlyDiff.toLocaleString('en-US')} ر.س
            </div>
            <div className="text-[11px] text-[#52525B] mt-1">
              فرق الالتزام الشهري التقديري
            </div>
          </div>

          <div className="rounded-2xl bg-[#FAF8FF] border border-[#EDE9FA] p-4">
            <div className="text-xs font-semibold text-[#71717A]">فرق سعر المتر المربع</div>
            <div className="text-xl font-extrabold text-[#18181B] tabular-nums mt-1">
              {pricePerSqmDiff.toLocaleString('en-US')} ر.س/م²
            </div>
            <div className="text-[11px] text-[#52525B] mt-1">
              مقارنة القيمة الاستثمارية للمتر
            </div>
          </div>
        </div>

        {/* Side-by-Side Comparison Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {pairPlans.map((plan, idx) => {
            const otherPlan = idx === 0 ? planB : planA;
            const isLarger = plan.areaSqm > otherPlan.areaSqm;
            const isCheaper = plan.priceSar < otherPlan.priceSar;
            const pricePerSqm = idx === 0 ? pricePerSqmA : pricePerSqmB;
            const slotIndex = idx as 0 | 1;

            return (
              <div
                key={`${plan.id}-${idx}`}
                className="rounded-[24px] bg-[#FAF8FF] border border-[#E9E3FA] p-5 sm:p-6 flex flex-col justify-between shadow-xs"
              >
                <div>
                  {/* Unit Switcher Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#EDE9FA]">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#8B5CF6] text-white text-xs font-bold flex items-center justify-center tabular-nums">
                        {idx + 1}
                      </span>
                      <span className="font-latin text-xs font-bold text-[#7C3AED] bg-[#F3E8FF] px-2.5 py-1 rounded-lg tabular-nums">
                        {plan.code}
                      </span>
                      {isLarger && (
                        <span className="text-[11px] font-semibold bg-purple-100 text-[#6D28D9] px-2.5 py-0.5 rounded-full">
                          الأوسع مساحة
                        </span>
                      )}
                      {isCheaper && (
                        <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full">
                          الأوفر سعراً
                        </span>
                      )}
                    </div>

                    <select
                      aria-label={`تغيير الشقة رقم ${idx + 1} في المقارنة`}
                      value={plan.id}
                      onChange={(e) => onChangePlanSlot(slotIndex, e.target.value)}
                      className="text-xs font-semibold text-[#3F3F46] bg-white border border-[#EDE9FA] rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#8B5CF6] cursor-pointer"
                    >
                      {FLOOR_PLANS.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.title} ({option.code}) — {option.areaSqm} م²
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Title & Key Price/Area Metrics */}
                  <div className="flex flex-wrap items-start justify-between gap-3 my-4">
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-[#18181B]">{plan.title}</h4>
                      <p className="text-xs text-[#71717A] mt-0.5">
                        {plan.building} · {plan.floorRange}
                      </p>
                    </div>
                    <div className="text-left">
                      <div className="text-xl font-extrabold text-[#7C3AED] tabular-nums">
                        {plan.priceSar.toLocaleString('en-US')} ر.س
                      </div>
                      <div className="text-[11px] text-[#71717A] tabular-nums">
                        قسط يبدأ من {plan.monthlyFromSar.toLocaleString('en-US')} ر.س / شهرياً
                      </div>
                    </div>
                  </div>

                  {/* Interactive Floor Plan Diagram */}
                  <div className="my-3">
                    <InteractiveFloorPlanDiagram plan={plan} finishStyle="scandi" />
                  </div>

                  {/* Detailed Comparison Rows */}
                  <div className="mt-4 bg-white rounded-2xl border border-[#EDE9FA] divide-y divide-slate-100 text-xs">
                    <div className="flex items-center justify-between px-4 py-2.5">
                      <span className="text-[#71717A]">المساحة الإجمالية</span>
                      <span dir="ltr" className="font-bold text-[#18181B] tabular-nums">
                        {plan.areaSqm} م²
                        {isLarger && (
                          <span className="text-[#7C3AED] mr-1.5 font-semibold">
                            (+{areaDiff} م²)
                          </span>
                        )}
                      </span>
                    </div>

                    <div className="flex items-center justify-between px-4 py-2.5">
                      <span className="text-[#71717A]">سعر المتر المربع</span>
                      <span className="font-bold text-[#18181B] tabular-nums">
                        {pricePerSqm.toLocaleString('en-US')} ر.س / م²
                      </span>
                    </div>

                    <div className="flex items-center justify-between px-4 py-2.5">
                      <span className="text-[#71717A]">الإطلالة وموعد التسليم</span>
                      <span className="font-semibold text-[#3F3F46]">
                        {plan.viewType} · {plan.completion}
                      </span>
                    </div>

                    <div className="flex items-center justify-between px-4 py-2.5">
                      <span className="text-[#71717A]">تصنيف الغرف والتشطيب</span>
                      <span className="font-bold text-[#18181B]">
                        {plan.roomsLabel} · {plan.finishStyle}
                      </span>
                    </div>
                  </div>

                  {/* Room Dimensions Breakdown Pills */}
                  <div className="mt-4">
                    <div className="text-xs font-bold text-[#3F3F46] mb-2">
                      توزيع مساحات الغرف:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { label: 'صالة المعيشة', val: plan.dimensions.living },
                        { label: 'غرفة النوم 1', val: plan.dimensions.bedroom1 },
                        ...(plan.dimensions.bedroom2
                          ? [{ label: 'غرفة النوم 2', val: plan.dimensions.bedroom2 }]
                          : []),
                        { label: 'المطبخ', val: plan.dimensions.kitchen },
                        { label: 'الشرفة', val: plan.dimensions.balcony },
                      ].map((rm, rIdx) => (
                        <span
                          key={rIdx}
                          className="text-[11px] bg-white border border-[#EDE9FA] text-[#3F3F46] px-2.5 py-1 rounded-lg tabular-nums"
                        >
                          {rm.label}: <strong className="text-[#7C3AED]">{rm.val}</strong>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Architectural Features List */}
                  <div className="mt-4">
                    <div className="text-xs font-bold text-[#3F3F46] mb-2">
                      المميزات والتجهيزات:
                    </div>
                    <div className="space-y-2">
                      {plan.features.map((feat, fIdx) => {
                        const isUnique = !otherPlan.features.includes(feat);
                        return (
                          <div
                            key={fIdx}
                            className="flex items-center justify-between gap-2 text-xs bg-white px-3.5 py-2 rounded-xl border border-[#EDE9FA]"
                          >
                            <div className="flex items-center gap-2 text-[#27272A]">
                              <span className="w-4 h-4 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center shrink-0">
                                <Check className="w-2.5 h-2.5" />
                              </span>
                              <span>{feat}</span>
                            </div>
                            {isUnique && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#7C3AED] bg-[#F3E8FF] px-2 py-0.5 rounded-full shrink-0">
                                <Sparkles className="w-2.5 h-2.5" />
                                ميزة حصرية
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Individual Unit CTA */}
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onSelectForInquiry(
                      `حجز وحدة بعد المقارنة: ${plan.title} (${plan.code}) - ${plan.priceSar.toLocaleString('en-US')} ر.س`
                    );
                  }}
                  className="mt-5 w-full py-3 px-4 rounded-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>اختيار وحجز {plan.title}</span>
                  <ArrowUpLeft className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer Joint Consultation CTA */}
        <div className="mt-6 pt-5 border-t border-[#EDE9FA] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-[#52525B]">
            هل ترغب في الحصول على جدول مالي تفصيلي يقارن بين{' '}
            <strong className="text-[#18181B]">{planA.title}</strong> و{' '}
            <strong className="text-[#18181B]">{planB.title}</strong>؟
          </p>
          <button
            type="button"
            onClick={() => {
              onClose();
              onSelectForInquiry(
                `طلب مقارنة تفصيلية بين وحدتين: ${planA.title} (${planA.code}) و ${planB.title} (${planB.code})`
              );
            }}
            className="px-6 py-2.5 rounded-full bg-[#FAF8FF] hover:bg-[#F3E8FF] border border-[#C4B5FD] text-[#6D28D9] text-xs sm:text-sm font-bold transition-colors cursor-pointer whitespace-nowrap"
          >
            اطلب استشارة مقارنة للوحدتين
          </button>
        </div>
      </div>
    </div>
  );
};
