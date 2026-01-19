
import { ShieldCheckIcon, CogIcon, ClipboardDocumentCheckIcon, UserGroupIcon } from '../ui/Icons';

const trustMetrics = [
  {
    value: '99.9%',
    label: 'Uptime SLA',
    description: 'Enterprise-grade reliability'
  },
  {
    value: '60%',
    label: 'Faster to Value',
    description: 'vs building in-house'
  },
  {
    value: '100%',
    label: 'Human Oversight',
    description: 'For critical decisions'
  },
  {
    value: '30',
    label: 'Days to ROI',
    description: 'Typical implementation*'
  }
];

const securityFeatures = [
  {
    title: 'Azure Native Security',
    description: 'Built on Microsoft Azure with enterprise-grade security controls, encryption, and compliance frameworks.',
    icon: ShieldCheckIcon,
    color: 'bg-primary-50',
    iconColor: 'text-primary-600'
  },
  {
    title: 'D365 Native Integration',
    description: 'Uses your existing D365 security model, permissions, and data governance—no separate system to manage.',
    icon: CogIcon,
    color: 'bg-accent-50',
    iconColor: 'text-accent-600'
  },
  {
    title: 'Audit-Ready Governance',
    description: 'Complete activity logs, approval workflows, and audit trails for compliance and accountability.',
    icon: ClipboardDocumentCheckIcon,
    color: 'bg-green-50',
    iconColor: 'text-green-600'
  },
  {
    title: 'Human-in-the-Loop',
    description: 'Critical decisions always require human approval. AI recommends, humans decide.',
    icon: UserGroupIcon,
    color: 'bg-blue-50',
    iconColor: 'text-blue-600'
  }
];

const certifications = [
  { name: 'Microsoft', subtitle: 'Gold Partner' },
  { name: 'Azure', subtitle: 'Solutions Partner' },
  { name: 'D365', subtitle: 'Expertise' },
  { name: 'Enterprise', subtitle: 'Ready' }
];

export function TrustSection() {
  return (
    <section className="py-24 lg:py-32 bg-gradient-section relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-brand-subtle opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white shadow-soft border border-neutral-200 mb-6">
            <ShieldCheckIcon className="h-4 w-4 text-primary-600 mr-2" />
            <span className="text-sm font-medium text-neutral-700">
              Enterprise-Ready Security
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            Built for Enterprise{' '}
            <span className="bg-gradient-brand bg-clip-text text-transparent">
              Trust & Compliance
            </span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            The security, governance, and reliability standards that enterprise retailers require—without the complexity.
          </p>
        </div>

        {/* Trust Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
          {trustMetrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 text-center shadow-card border border-neutral-100"
            >
              <div className="text-4xl lg:text-5xl font-bold bg-gradient-brand bg-clip-text text-transparent mb-2">
                {metric.value}
              </div>
              <div className="font-semibold text-neutral-900 mb-1">
                {metric.label}
              </div>
              <div className="text-sm text-neutral-500">
                {metric.description}
              </div>
            </div>
          ))}
        </div>

        {/* Security Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {securityFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-card border border-neutral-100 hover:shadow-card-hover transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center flex-shrink-0`}>
                    <IconComponent className={`h-6 w-6 ${feature.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 text-lg mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-2xl p-8 shadow-card border border-neutral-100">
          <div className="text-center mb-8">
            <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
              Certified & Compliant
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-neutral-50 border border-neutral-100"
              >
                <span className="text-lg font-bold text-neutral-900">{cert.name}</span>
                <span className="text-sm text-neutral-500">{cert.subtitle}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-neutral-400 mt-4">
            Fusion5 is a Microsoft Gold Partner. Certifications verified on request.
          </p>
        </div>

        {/* Footnote */}
        <p className="text-center text-xs text-neutral-400 mt-8">
          *Typical implementation timeline based on customer deployments. Actual results may vary based on scope and requirements.
        </p>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-white rounded-2xl p-8 shadow-card border border-neutral-100 max-w-2xl">
            <h3 className="text-xl font-bold text-neutral-900 mb-3">
              Join Leading D365 Retailers
            </h3>
            <p className="text-neutral-600 mb-6">
              See how enterprise retailers are achieving measurable ROI with governed AI agents.
            </p>
            <a
              href="/demo"
              className="inline-flex items-center px-6 py-3 text-base font-semibold text-white bg-gradient-cta rounded-xl shadow-button hover:shadow-button-hover hover:scale-[1.02] transition-all duration-200"
            >
              Request Case Studies
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustSection;
