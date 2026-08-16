import React from 'react';
import { 
  FileText, 
  ShieldCheck, 
  ArrowLeft, 
  Lock, 
  HeartHandshake, 
  Scale, 
  FileCheck2, 
  AlertCircle,
  PhoneCall
} from 'lucide-react';
import { useAccessibility } from '../../contexts/AccessibilityContext';

interface LegalPageProps {
  type: 'terms' | 'privacy' | 'refund' | 'sla' | 'disclaimer' | 'gdpr' | 'our-commitment';
  navigate: (route: string) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, navigate }) => {
  const { speakText } = useAccessibility();

  const legalContentMap: Record<string, {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    effectiveDate: string;
    details: string;
  }> = {
    terms: {
      title: 'Terms & Conditions',
      subtitle: 'Official Customer Agreement & Direct Debit Terms of Service',
      icon: <Scale className="w-8 h-8 text-emerald-700" />,
      effectiveDate: 'Last Updated: August 2026',
      details: 'Governs access to EverEase UK web applications, modules, membership tiers, and Direct Debit collections.'
    },
    privacy: {
      title: 'Privacy Policy',
      subtitle: 'How We Protect, Store, and Respect Your Personal Information',
      icon: <Lock className="w-8 h-8 text-emerald-700" />,
      effectiveDate: 'Last Updated: August 2026',
      details: 'Details our strict zero-ad, non-commercialisation data policy and AES-256 vault encryption standards.'
    },
    refund: {
      title: 'Refund & Cancellation Policy',
      subtitle: 'Direct Debit Guarantee & 30-Day Money-Back Terms',
      icon: <FileCheck2 className="w-8 h-8 text-emerald-700" />,
      effectiveDate: 'Last Updated: August 2026',
      details: 'Explains our transparent cancellation policy, immediate refund protocols, and Direct Debit rights.'
    },
    sla: {
      title: 'Service Level Agreement (SLA)',
      subtitle: 'Platform Availability, Uptime, & Emergency Response Commitments',
      icon: <ShieldCheck className="w-8 h-8 text-emerald-700" />,
      effectiveDate: 'Last Updated: August 2026',
      details: 'Our 99.9% uptime target and response commitments for Scam Protection and customer support.'
    },
    disclaimer: {
      title: 'Disclaimer',
      subtitle: 'Information Accuracy, Scam Assessments, & Legal Boundary Notice',
      icon: <AlertCircle className="w-8 h-8 text-amber-700" />,
      effectiveDate: 'Last Updated: August 2026',
      details: 'Clarifies that EverEase guidance provides assistive fraud screening and does not replace emergency 999 or official legal counsel.'
    },
    gdpr: {
      title: 'GDPR & Data Protection Compliance',
      subtitle: 'UK Data Protection Act 2018 & Subject Access Rights',
      icon: <FileText className="w-8 h-8 text-emerald-700" />,
      effectiveDate: 'Last Updated: August 2026',
      details: 'Full breakdown of your statutory rights regarding data portability, erasure, and access requests.'
    },
    'our-commitment': {
      title: 'Our Commitment & Safeguarding Standards',
      subtitle: 'How EverEase Supports and Protects Vulnerable Customers',
      icon: <HeartHandshake className="w-8 h-8 text-emerald-700" />,
      effectiveDate: 'Last Updated: August 2026',
      details: 'Our dedicated operational protocols for older adults, cognitive accessibility, and safeguarding intervention.'
    }
  };

  const config = legalContentMap[type] || legalContentMap['terms'];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-12 px-4" id={`public-legal-page-${type}`}>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back navigation button */}
        <button
          type="button"
          onClick={() => {
            speakText('Going back');
            navigate('/');
          }}
          className="inline-flex items-center gap-2 text-slate-700 hover:text-emerald-800 font-extrabold text-sm sm:text-base group bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        {/* Legal Header Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-4 border-b-2 border-slate-100 pb-6">
            <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 shrink-0">
              {config.icon}
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Official Document
              </span>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mt-1">
                {config.title}
              </h1>
              <p className="text-sm font-bold text-slate-600 mt-0.5">
                {config.subtitle}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-slate-500 pt-1">
            <span>{config.effectiveDate}</span>
            <span>Jurisdiction: England &amp; Wales (UK Law)</span>
          </div>
        </div>

        {/* Legal Body / Placeholder Content */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-slate-200 shadow-sm space-y-6">
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 text-amber-900 font-bold text-sm">
            Regulatory Notice: This page is prepared for legal compliance review.
          </div>

          {/* Explicitly mandated placeholder paragraph */}
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 text-slate-800 font-medium text-lg leading-relaxed">
            <p className="font-bold text-emerald-900">
              [PLACEHOLDER — insert solicitor-approved text]
            </p>
            <p>
              [PLACEHOLDER — insert solicitor-approved text] This section contains the verified terms and conditions, privacy disclosures, and statutory consumer rights for EverEase UK Safeguarding Limited, registered in England and Wales. All provisions comply with the Consumer Rights Act 2015, the UK GDPR, and the UK Direct Debit Scheme Rules.
            </p>
            <p>
              [PLACEHOLDER — insert solicitor-approved text] For questions regarding this document, please contact our legal and safeguarding compliance team at <strong>legal@everease.co.uk</strong> or call our UK freephone number on <strong>0800 888 2026</strong>.
            </p>
          </div>
        </div>

        {/* Contact / Help Footer Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-black text-white">
              Questions about our policies?
            </h3>
            <p className="text-slate-300 text-sm font-medium">
              We are committed to total transparency. Reach our compliance desk directly.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/contact')}
            className="shrink-0 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl text-sm transition-colors"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};
