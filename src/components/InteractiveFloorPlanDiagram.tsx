import React, { useState } from 'react';
import { FloorPlanItem } from '../data/urbanNovaData';

interface InteractiveFloorPlanDiagramProps {
  plan: FloorPlanItem;
  finishStyle: 'scandi' | 'warm' | 'neoclassic';
}

export const InteractiveFloorPlanDiagram: React.FC<InteractiveFloorPlanDiagramProps> = ({
  plan,
  finishStyle,
}) => {
  const [selectedRoom, setSelectedRoom] = useState<'living' | 'bedroom1' | 'kitchen' | 'balcony' | 'extra'>('living');

  const surfaceTheme =
    finishStyle === 'scandi'
      ? 'bg-[#FCFaff] border-[#8B5CF6]'
      : finishStyle === 'warm'
      ? 'bg-[#FFFDF9] border-[#7C3AED]'
      : 'bg-[#F8FAFC] border-[#6D28D9]';

  const roomDetails: Record<
    typeof selectedRoom,
    { label: string; area: string; desc: string }
  > = {
    living: {
      label: 'صالة المعيشة والاستقبال',
      area: plan.dimensions.living,
      desc: 'نوافذ بانورامية ممتدة للأرض، إضاءة مخفية ذكية، وتكييف مخفي مستقل.',
    },
    bedroom1: {
      label: 'غرفة النوم الرئيسية',
      area: plan.dimensions.bedroom1,
      desc: 'مساحة خزائن حائط مدمجة، زجاج عازل للصوت والحرارة، وتحكم مناخي ذكي.',
    },
    kitchen: {
      label: 'المطبخ المفتوح ومنطقة الطعام',
      area: plan.dimensions.kitchen,
      desc: 'تجهيزات متكاملة مع جزيرة وسطية، تهوية مركزية، وحساسات أمان ذكية.',
    },
    balcony: {
      label: 'الشرفة البانورامية',
      area: plan.dimensions.balcony,
      desc: 'درابزين زجاجي آمن وإطلالة مفتوحة على المساحات الخضراء والممشى المائي.',
    },
    extra: {
      label: plan.dimensions.bedroom2 ? 'غرف النوم الإضافية والحمامات' : 'المدخل الرئيسي والحمام',
      area: plan.dimensions.bedroom2 || '6.2 م²',
      desc: 'أرضيات بورسلان فاخرة، أطقم صحية معلقة، وقفل باب ذكي ببصمة الوجه.',
    },
  };

  const activeInfo = roomDetails[selectedRoom];

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E9D5FF] shadow-2xs">
      <div className="flex items-center justify-between gap-2 mb-3 text-xs text-[#71717A]">
        <span className="font-semibold text-[#52525B]">
          مخطط هندسي تفاعلي (انقر على أي غرفة لعرض تفاصيلها)
        </span>
        <span className="font-latin font-bold text-[#7C3AED] tabular-nums" dir="ltr">
          {plan.code} · {plan.areaSqm} m²
        </span>
      </div>

      {/* Architectural Outer Wall Frame */}
      <div
        className={`rounded-2xl border-[3px] p-2.5 sm:p-3.5 transition-colors ${surfaceTheme}`}
      >
        <div className="grid grid-cols-12 gap-2 sm:gap-2.5 min-h-[210px] sm:min-h-[230px]">
          {/* Right Zone in RTL: Living Room + Kitchen + Extra Room */}
          <div className="col-span-12 sm:col-span-8 flex flex-col gap-2 sm:gap-2.5">
            {/* Living Room */}
            <button
              type="button"
              onClick={() => setSelectedRoom('living')}
              className={`flex-1 rounded-xl border-2 p-3 sm:p-4 text-right transition-all flex flex-col justify-between cursor-pointer ${
                selectedRoom === 'living'
                  ? 'border-[#7C3AED] bg-[#F3E8FF]/80 shadow-xs'
                  : 'border-[#C4B5FD] bg-[#FAF5FF]/70 hover:border-[#8B5CF6]'
              }`}
            >
              <div className="flex items-center justify-between gap-2 w-full">
                <span className="text-xs sm:text-sm font-bold text-[#1E1B4B]">
                  صالة المعيشة والاستقبال
                </span>
                <span
                  dir="ltr"
                  className="text-xs font-extrabold text-[#6D28D9] bg-white/90 px-2 py-0.5 rounded-md tabular-nums"
                >
                  {plan.dimensions.living}
                </span>
              </div>
              <div className="text-[11px] text-[#6D28D9]/80 mt-2">
                واجهات زجاجية بانورامية · إضاءة ذكية
              </div>
            </button>

            {/* Bottom Row: Open Kitchen + Extra Bedroom/Bath */}
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedRoom('kitchen')}
                className={`rounded-xl border-2 p-3 text-right transition-all flex flex-col justify-between cursor-pointer ${
                  selectedRoom === 'kitchen'
                    ? 'border-[#0D9488] bg-[#CCFBF1]/60 shadow-xs'
                    : 'border-[#99F6E4] bg-[#F0FDFA] hover:border-[#14B8A6]'
                }`}
              >
                <div className="text-xs font-bold text-[#134E4A]">المطبخ المفتوح</div>
                <div dir="ltr" className="text-xs font-extrabold text-[#0F766E] mt-1 tabular-nums">
                  {plan.dimensions.kitchen}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRoom('extra')}
                className={`rounded-xl border-2 p-3 text-right transition-all flex flex-col justify-between cursor-pointer ${
                  selectedRoom === 'extra'
                    ? 'border-[#7C3AED] bg-[#EDE9FE] shadow-xs'
                    : 'border-[#DDD6FE] bg-[#F5F3FF] hover:border-[#8B5CF6]'
                }`}
              >
                <div className="text-xs font-bold text-[#1E1B4B]">
                  {plan.dimensions.bedroom2 ? 'غرف النوم الإضافية' : 'المدخل والحمامات'}
                </div>
                <div dir="ltr" className="text-xs font-extrabold text-[#6D28D9] mt-1 tabular-nums">
                  {plan.dimensions.bedroom2 || '6.2 م²'}
                </div>
              </button>
            </div>
          </div>

          {/* Left Zone in RTL: Balcony + Master Bedroom */}
          <div className="col-span-12 sm:col-span-4 flex sm:flex-col gap-2 sm:gap-2.5">
            {/* Balcony */}
            <button
              type="button"
              onClick={() => setSelectedRoom('balcony')}
              className={`flex-1 sm:flex-none sm:h-20 rounded-xl border-2 border-dashed p-2.5 sm:p-3 text-right transition-all flex flex-col justify-between cursor-pointer ${
                selectedRoom === 'balcony'
                  ? 'border-[#7C3AED] bg-[#F3E8FF] shadow-xs'
                  : 'border-[#A78BFA] bg-[#FAF5FF] hover:border-[#7C3AED]'
              }`}
            >
              <div className="text-xs font-bold text-[#581C87]">شرفة بانورامية</div>
              <div dir="ltr" className="text-xs font-extrabold text-[#7E22CE] tabular-nums">
                {plan.dimensions.balcony}
              </div>
            </button>

            {/* Master Bedroom */}
            <button
              type="button"
              onClick={() => setSelectedRoom('bedroom1')}
              className={`flex-1 rounded-xl border-2 p-3 text-right transition-all flex flex-col justify-between cursor-pointer ${
                selectedRoom === 'bedroom1'
                  ? 'border-[#4F46E5] bg-[#E0E7FF]/80 shadow-xs'
                  : 'border-[#C7D2FE] bg-[#EEF2FF] hover:border-[#6366F1]'
              }`}
            >
              <div className="text-xs sm:text-sm font-bold text-[#1E1B4B]">
                غرفة النوم الرئيسية
              </div>
              <div dir="ltr" className="text-xs font-extrabold text-[#4338CA] mt-2 tabular-nums">
                {plan.dimensions.bedroom1}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Selected Room Detail Strip */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#7C3AED]">{activeInfo.label}:</span>
          <span className="text-[#52525B]">{activeInfo.desc}</span>
        </div>
        <span dir="ltr" className="font-bold text-[#18181B] bg-[#F6F4FC] px-2.5 py-1 rounded-lg tabular-nums">
          {activeInfo.area}
        </span>
      </div>
    </div>
  );
};
