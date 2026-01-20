import { Link } from 'react-router-dom';
import {
  ShieldCheckIcon,
  CogIcon,
  ClockIcon,
  ScaleIcon,
  UserGroupIcon,
  DocumentCheckIcon,
  ChevronRightIcon
} from '../../ui/Icons';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

const benefits = [
  {
    icon: ShieldCheckIcon,
    title: 'Governed by Design',
    description: 'Built-in human approval workflows, audit trails, and compliance controls.',
    color: 'bg-primary-50',
    iconColor: 'text-primary-600',
    borderColor: 'border-primary-100'
  },
  {
    icon: CogIcon,
    title: 'D365 Native Integration',
    description: 'Deep integration with Dynamics 365. No middleware, no sync issues.',
    color: 'bg-accent-50',
    iconColor: 'text-accent-600',
    borderColor: 'border-accent-100'
  },
  {
    icon: ClockIcon,
    title: '30-Day Time to Value',
    description: 'Pre-built agents deploy quickly. Results in weeks, not months.',
    color: 'bg-green-50',
    iconColor: 'text-green-600',
    borderColor: 'border-green-100'
  },
  {
    icon: ScaleIcon,
    title: 'Enterprise Scale',
    description: 'Built on Azure AI Foundry for enterprise performance and security.',
    color: 'bg-blue-50',
    iconColor: 'text-blue-600',
    borderColor: 'border-blue-100'
  },
  {
    icon: UserGroupIcon,
    title: 'Safer Than In-House',
    description: 'Battle-tested agents with collective learnings from multiple retailers.',
    color: 'bg-amber-50',
    iconColor: 'text-amber-600',
    borderColor: 'border-amber-100'
  },
  {
    icon: DocumentCheckIcon,
    title: 'Lower Total Cost',
    description: 'Subscription model eliminates upfront costs. Predictable pricing.',
    color: 'bg-purple-50',
    iconColor: 'text-purple-600',
    borderColor: 'border-purple-100'
  }
];

const comparisonData = {
  inHouse: [
    '6-18 month development cycles',
    '$500K-2M+ upfront investment',
    'Ongoing maintenance burden',
    'Unproven in production',
    'Governance to be built'
  ],
  platform: [
    '30-day deployment',
    'Predictable SaaS pricing',
    'Continuous improvements included',
    'Battle-tested across retailers',
    'Governance built-in'
  ]
};

export function PlatformBenefits() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: comparisonRef, isVisible: comparisonVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="py-28 lg:py-36 bg-neutral-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-white to-transparent" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-50/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative">
        {/* Section Header */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-20 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-white shadow-soft border border-neutral-200 mb-8">
            <span className="text-sm font-semibold text-neutral-700 tracking-wide">
              Platform vs. In-House
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-8 tracking-tight">
            Why the Platform{' '}
            <span className="bg-gradient-brand bg-clip-text text-transparent">
              Approach Wins
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Building AI agents in-house is risky, expensive, and slow.
            Fusion5 delivers proven agents with enterprise governance from day one.
          </p>
        </div>

        {/* Benefits Grid */}
        <div
          ref={gridRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24"
        >
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={index}
                className={`group bg-white rounded-2xl p-8 shadow-lg border ${benefit.borderColor} hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ${
                  gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: gridVisible ? `${index * 80}ms` : '0ms' }}
              >
                <div className={`w-14 h-14 rounded-xl ${benefit.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`h-7 w-7 ${benefit.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed text-base">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Comparison Table */}
        <div
          ref={comparisonRef as React.RefObject<HTMLDivElement>}
          className={`bg-white rounded-3xl p-10 lg:p-14 shadow-xl border border-neutral-100 transition-all duration-700 ${
            comparisonVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-4">
              The Build vs. Buy Reality
            </h3>
            <p className="text-neutral-600 text-lg">
              See the clear advantage of a platform approach
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
            {/* In-House Column */}
            <div className="bg-neutral-50 rounded-2xl p-8 border-2 border-neutral-200">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-neutral-900">Building In-House</h4>
              </div>
              <ul className="space-y-5">
                {comparisonData.inHouse.map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </span>
                    <span className="text-neutral-600 text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Platform Column */}
            <div className="bg-gradient-brand-subtle rounded-2xl p-8 border-2 border-primary-200">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-neutral-900">Fusion5 Platform</h4>
              </div>
              <ul className="space-y-5">
                {comparisonData.platform.map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-neutral-800 font-medium text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <Link
              to="/platform"
              className="group inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors text-lg"
            >
              Learn more about our platform
              <ChevronRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PlatformBenefits;
