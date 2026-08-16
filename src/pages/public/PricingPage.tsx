import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  PhoneCall, 
  Lock, 
  CreditCard, 
  Database,
  HelpCircle,
  Users,
  Award,
  Zap,
  Check
} from 'lucide-react';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { getPricingPlans, DEFAULT_PLANS } from '../../lib/firestoreService';
import { PricingPlan } from '../../types';
import pricingHeroImg from '../../assets/images/pricing_peace_mind_1786863627905.jpg';

interface PricingPageProps {
  navigate: (route: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ navigate }) => {
  const { speakText } = useAccessibility();
  const [plans, setPlans] = useState<PricingPlan[]>(DEFAULT_PLANS);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiveFromFirestore, setIsLiveFromFirestore] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchPlans = async () => {
      try {
        const fetched = await getPricingPlans();
        if (isMounted) {
          setPlans(fetched);
          setIsLiveFromFirestore(true);
        }
      } catch (err) {
        console.warn('Using default fallback plans:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    fetchPlans();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSelectPlan = (planId: string, planName: string, price: number) => {
    speakText(`Selecting ${planName} plan at £${price} per month. Proceeding to sign up.`);
    navigate(`/auth?plan=${planId}&mode=signup`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900" id="public-pricing-page">
      {/* =========================================================================
          HERO SECTION: PRICING
          ========================================================================= */}
      <section className="bg-gradient-to-b from-[#064e3b] via-[#043d2f] to-[#0f172a] text-white py-14 sm:py-20 lg:py-24 px-4 relative overflow-hidden" id="pricing-hero">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="w-full max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 border border-teal-500/40 px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold shadow-sm">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-teal-300 shrink-0" />
              <span>Transparent UK Monthly SaaS Pricing</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Simple, honest plans with <span className="text-teal-300 underline decoration-teal-500/50 underline-offset-8">no hidden fees</span>.
            </h1>

            <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed max-w-2xl">
              Rolling monthly subscriptions backed by the UK Direct Debit Guarantee scheme. Cancel or change your membership whenever you wish.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                type="button"
                id="btn-pricing-join-now"
                onClick={() => {
                  speakText('Navigating to join Complete plan');
                  navigate('/auth?plan=complete&mode=signup');
                }}
                className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 rounded-xl font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer border-0"
              >
                <Sparkles className="w-5 h-5 text-slate-950" />
                <span>Join Most Popular (£55/mo)</span>
                <ArrowRight className="w-5 h-5 text-slate-950" />
              </button>

              <button
                type="button"
                id="btn-pricing-freephone"
                onClick={() => {
                  speakText('Calling EverEase freephone helpline');
                  window.location.href = 'tel:08008882026';
                }}
                className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-xl font-semibold text-sm sm:text-base transition-all flex items-center justify-center gap-2 cursor-pointer border-0"
              >
                <PhoneCall className="w-5 h-5 text-teal-400" />
                <span>Call: 0800 888 2026</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-4 border-teal-500/30 shadow-2xl bg-slate-800">
              <img
                src={pricingHeroImg}
                alt="Retired British couple enjoying peace of mind at home with tablet in hand"
                className="w-full h-80 sm:h-96 lg:h-[420px] object-cover hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 text-slate-900 shadow-lg flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700 shrink-0">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-black text-sm sm:text-base text-slate-900">
                    Direct Debit Guarantee
                  </h3>
                  <p className="text-xs text-slate-600 font-medium">
                    Protected by the UK banking guarantee scheme via Stripe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Pricing Cards Container */}
      <div className="w-full max-w-[1500px] mx-auto px-4 py-16 sm:py-20 space-y-16">
        {/* Tier Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const isComplete = plan.id === 'complete' || plan.isPopular;
            return (
              <div
                key={plan.id}
                id={`pricing-card-${plan.id}`}
                className={`bg-white rounded-3xl p-8 border-2 transition-all flex flex-col justify-between relative ${
                  isComplete
                    ? 'border-teal-600 shadow-xl ring-4 ring-teal-500/20 scale-100 lg:-translate-y-2'
                    : 'border-slate-200 shadow-sm hover:border-teal-400'
                }`}
              >
                {isComplete && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-teal-700 text-white font-black text-xs uppercase tracking-wider px-4 py-1 rounded-full shadow-md">
                    Most Popular Choice
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">{plan.name}</h3>
                    <p className="text-slate-600 text-sm font-medium mt-1">{plan.tagline}</p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-black text-slate-900">£{plan.price}</span>
                      <span className="text-slate-600 font-bold text-base">/ month</span>
                    </div>
                    <p className="text-xs text-teal-800 font-bold mt-1">
                      Rolling monthly subscription • Cancel anytime
                    </p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-black uppercase tracking-wider text-slate-500">
                      Included in this plan:
                    </p>
                    <ul className="space-y-3">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                          <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8 mt-6 border-t border-slate-100">
                  <button
                    type="button"
                    id={`btn-select-plan-${plan.id}`}
                    onClick={() => handleSelectPlan(plan.id, plan.name, plan.price)}
                    className={`w-full py-4 rounded-2xl font-black text-base sm:text-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isComplete
                        ? 'bg-teal-700 hover:bg-teal-800 text-white shadow-teal-700/20'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <span>Choose {plan.name}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <p className="text-center text-xs text-slate-500 font-semibold mt-2.5">
                    UK Direct Debit via Stripe • No Card Checkout on Site
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Payment Safety & Direct Debit Guarantee Banner */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-teal-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="p-3 bg-teal-50 rounded-2xl text-teal-700">
              <Lock className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900">
                UK Direct Debit Guarantee &amp; Safe Stripe Billing
              </h3>
              <p className="text-sm font-bold text-teal-800">
                The highest standard of banking protection in the United Kingdom
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-700 text-sm leading-relaxed font-medium">
            <div className="space-y-2 bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <h4 className="font-black text-slate-900 text-base">Direct Debit Guarantee</h4>
              <p>
                All payments are protected by the Direct Debit Guarantee scheme. If an error is made, you are entitled to a full and immediate refund from your bank.
              </p>
            </div>

            <div className="space-y-2 bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <h4 className="font-black text-slate-900 text-base">No Direct Card Checkout on Site</h4>
              <p>
                We never store or prompt for sensitive debit/credit card numbers directly on this website. Official invoices are dispatched via Stripe's encrypted infrastructure.
              </p>
            </div>

            <div className="space-y-2 bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <h4 className="font-black text-slate-900 text-base">Cancel or Pause Anytime</h4>
              <p>
                There are no 12-month lock-ins or cancellation penalties. You can cancel with a single click inside your portal or by calling our Freephone number.
              </p>
            </div>
          </div>
        </div>

        {/* Freephone Help Bar */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Have questions about which plan is right for you?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base font-medium">
              Call our friendly British support desk on Freephone <strong className="text-teal-300 font-black">0800 888 2026</strong> (8am–8pm daily).
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              speakText('Calling EverEase freephone');
              window.location.href = 'tel:08008882026';
            }}
            className="px-6 py-3.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black rounded-xl text-base shrink-0 shadow-lg cursor-pointer transition-all flex items-center gap-2"
          >
            <PhoneCall className="w-5 h-5" />
            <span>Call 0800 888 2026</span>
          </button>
        </div>
      </div>
    </div>
  );
};
