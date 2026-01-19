import { Link } from 'react-router-dom';
import {
  ShieldCheckIcon,
  CogIcon,
  ChartBarIcon,
  ClockIcon,
  ChevronRightIcon
} from '../components/ui/Icons';

const platformFeatures = [
  {
    icon: CogIcon,
    title: 'D365 Native Integration',
    description: 'Deep integration with Dynamics 365 Commerce, Supply Chain, and Finance. Uses your existing security model and data governance.',
    details: ['Real-time data access', 'Native workflow integration', 'Single sign-on with Azure AD', 'No middleware required']
  },
  {
    icon: ShieldCheckIcon,
    title: 'Human-in-the-Loop Governance',
    description: 'Every critical decision requires human approval. AI recommends, humans decide. Complete audit trails for compliance.',
    details: ['Approval workflows', 'Role-based permissions', 'Complete audit logs', 'Compliance-ready']
  },
  {
    icon: ChartBarIcon,
    title: 'Azure AI Foundry',
    description: 'Built on Microsoft Azure AI Foundry for enterprise-grade performance, security, and reliability at scale.',
    details: ['Enterprise security', 'Global availability', 'Auto-scaling', 'SOC 2 compliant']
  },
  {
    icon: ClockIcon,
    title: 'Rapid Deployment',
    description: 'Pre-built agents deploy in 30 days with configuration, not custom development. See ROI within the first month.',
    details: ['30-day deployment', 'Pre-configured workflows', 'Minimal IT overhead', 'Immediate value']
  }
];


export function Platform() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-brand-subtle rounded-full blur-3xl opacity-60" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white shadow-soft border border-neutral-200 mb-6">
              <span className="text-sm font-medium text-neutral-700">
                Enterprise-Ready Platform
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
              The Platform Behind{' '}
              <span className="bg-gradient-brand bg-clip-text text-transparent">
                Intelligent Retail
              </span>
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed mb-8">
              Built on Microsoft Azure AI Foundry with native D365 integration.
              Enterprise security, human governance, and rapid deployment—all in one platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/demo"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-cta rounded-xl shadow-button hover:shadow-button-hover hover:scale-[1.02] transition-all duration-200"
              >
                See It In Action
                <ChevronRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/governance"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-neutral-700 bg-white border border-neutral-300 rounded-xl hover:border-neutral-400 transition-all"
              >
                Governance Details
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Platform Architecture
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              A layered approach that separates concerns while maintaining seamless integration.
            </p>
          </div>

          {/* Architecture Infographic */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-neutral-50 rounded-2xl p-8 border border-neutral-100">
              <img
                src="/images/architecture-diagram.svg"
                alt="Fusion5 Platform Architecture - Four-layer stack showing Agent Layer, Orchestration Layer, Integration Layer, and Azure AI Foundry Foundation"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {platformFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-neutral-50 rounded-2xl p-8 border border-neutral-100 hover:shadow-card-hover transition-shadow"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-brand-subtle flex items-center justify-center mb-6">
                    <IconComponent className="h-7 w-7 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  <ul className="grid grid-cols-2 gap-2">
                    {feature.details.map((detail, i) => (
                      <li key={i} className="flex items-center text-sm text-neutral-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-500 mr-2" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 lg:py-28 bg-gradient-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
                Native D365{' '}
                <span className="bg-gradient-brand bg-clip-text text-transparent">
                  Integration
                </span>
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                Unlike point solutions that require middleware and data synchronization,
                the Fusion5 platform integrates directly with your D365 environment.
              </p>
              <ul className="space-y-4">
                {[
                  'Dynamics 365 Commerce',
                  'Dynamics 365 Supply Chain Management',
                  'Dynamics 365 Finance',
                  'Dynamics 365 Customer Service'
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-neutral-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-card border border-neutral-200">
              <div className="text-center mb-6">
                <img
                  src="/images/Fusion_logo+tagline_coral_RGB.jpg"
                  alt="Fusion5"
                  className="h-12 mx-auto mb-4"
                />
                <h3 className="font-semibold text-neutral-900">Retail Agent Platform</h3>
              </div>
              <div className="flex justify-center mb-6">
                <div className="w-px h-8 bg-neutral-300" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'Commerce', icon: '/images/d365-commerce.svg' },
                  { name: 'Supply Chain', icon: '/images/d365-scm.svg' },
                  { name: 'Finance', icon: '/images/d365-finance.svg' },
                  { name: 'Customer Service', icon: '/images/d365-customer-service.svg' }
                ].map((app) => (
                  <div key={app.name} className="bg-neutral-50 rounded-xl p-4 flex flex-col items-center gap-2 border border-neutral-100">
                    <img src={app.icon} alt={`D365 ${app.name}`} className="h-10 w-10" />
                    <span className="text-xs font-medium text-neutral-600 text-center">{app.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-purple relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to See the Platform?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Book a demo to see how the Fusion5 platform integrates with your D365 environment.
          </p>
          <Link
            to="/demo"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-800 bg-white rounded-xl shadow-button hover:shadow-button-hover hover:scale-[1.02] transition-all duration-200"
          >
            Book a Demo
            <ChevronRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Platform;
