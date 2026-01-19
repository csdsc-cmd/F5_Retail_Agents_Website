
import { Link } from 'react-router-dom';
import {
  ShieldCheckIcon,
  CogIcon,
  ClockIcon,
  ScaleIcon,
  UserGroupIcon,
  DocumentCheckIcon,
  ChevronRightIcon
} from '../ui/Icons';

const benefits = [
  {
    icon: ShieldCheckIcon,
    title: 'Governed by Design',
    description: 'Built-in human approval workflows, audit trails, and compliance controls.',
    color: 'bg-primary-50',
    iconColor: 'text-primary-600'
  },
  {
    icon: CogIcon,
    title: 'D365 Native Integration',
    description: 'Deep integration with Dynamics 365. No middleware, no sync issues.',
    color: 'bg-accent-50',
    iconColor: 'text-accent-600'
  },
  {
    icon: ClockIcon,
    title: '30-Day Time to Value',
    description: 'Pre-built agents deploy quickly. Results in weeks, not months.',
    color: 'bg-green-50',
    iconColor: 'text-green-600'
  },
  {
    icon: ScaleIcon,
    title: 'Enterprise Scale',
    description: 'Built on Azure AI Foundry for enterprise performance and security.',
    color: 'bg-blue-50',
    iconColor: 'text-blue-600'
  },
  {
    icon: UserGroupIcon,
    title: 'Safer Than In-House',
    description: 'Battle-tested agents with collective learnings from multiple retailers.',
    color: 'bg-amber-50',
    iconColor: 'text-amber-600'
  },
  {
    icon: DocumentCheckIcon,
    title: 'Lower Total Cost',
    description: 'Subscription model eliminates upfront costs. Predictable pricing.',
    color: 'bg-purple-50',
    iconColor: 'text-purple-600'
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
  return (
    <section className="py-24 lg:py-32 bg-neutral-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-white to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white shadow-soft border border-neutral-200 mb-6">
            <span className="text-sm font-medium text-neutral-700">
              Platform vs. In-House
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            Why the Platform{' '}
            <span className="bg-gradient-brand bg-clip-text text-transparent">
              Approach Wins
            </span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Building AI agents in-house is risky, expensive, and slow.
            Fusion5 delivers proven agents with enterprise governance from day one.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-card border border-neutral-100 hover:shadow-card-hover transition-shadow"
              >
                <div className={`w-12 h-12 rounded-xl ${benefit.color} flex items-center justify-center mb-4`}>
                  <IconComponent className={`h-6 w-6 ${benefit.iconColor}`} />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-card border border-neutral-100">
          <div className="text-center mb-10">
            <h3 className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-3">
              The Build vs. Buy Reality
            </h3>
            <p className="text-neutral-600">
              See the clear advantage of a platform approach
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* In-House Column */}
            <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-neutral-900">Building In-House</h4>
              </div>
              <ul className="space-y-4">
                {comparisonData.inHouse.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </span>
                    <span className="text-neutral-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Platform Column */}
            <div className="bg-gradient-brand-subtle rounded-xl p-6 border border-primary-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-neutral-900">Fusion5 Platform</h4>
              </div>
              <ul className="space-y-4">
                {comparisonData.platform.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-neutral-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-10 text-center">
            <Link
              to="/platform"
              className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors group"
            >
              Learn more about our platform
              <ChevronRightIcon className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PlatformBenefits;
