import { ShieldCheckIcon, CogIcon, ClipboardDocumentCheckIcon, UserGroupIcon } from '../ui/Icons';
import { useScrollAnimation, useCountUp } from '../../hooks/useScrollAnimation';

const trustMetrics = [
  {
    value: 99.9,
    suffix: '%',
    label: 'Uptime SLA',
    description: 'Enterprise-grade reliability'
  },
  {
    value: 60,
    suffix: '%',
    label: 'Faster to Value',
    description: 'vs building in-house'
  },
  {
    value: 100,
    suffix: '%',
    label: 'Human Oversight',
    description: 'For critical decisions'
  },
  {
    value: 30,
    suffix: '',
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
    iconColor: 'text-primary-600',
    borderColor: 'border-primary-100'
  },
  {
    title: 'D365 Native Integration',
    description: 'Uses your existing D365 security model, permissions, and data governance—no separate system to manage.',
    icon: CogIcon,
    color: 'bg-accent-50',
    iconColor: 'text-accent-600',
    borderColor: 'border-accent-100'
  },
  {
    title: 'Audit-Ready Governance',
    description: 'Complete activity logs, approval workflows, and audit trails for compliance and accountability.',
    icon: ClipboardDocumentCheckIcon,
    color: 'bg-green-50',
    iconColor: 'text-green-600',
    borderColor: 'border-green-100'
  },
  {
    title: 'Human-in-the-Loop',
    description: 'Critical decisions always require human approval. AI recommends, humans decide.',
    icon: UserGroupIcon,
    color: 'bg-blue-50',
    iconColor: 'text-blue-600',
    borderColor: 'border-blue-100'
  }
];

const certifications = [
  { name: 'Microsoft', subtitle: 'Gold Partner', color: 'bg-blue-50' },
  { name: 'Azure', subtitle: 'Solutions Partner', color: 'bg-sky-50' },
  { name: 'D365', subtitle: 'Expertise', color: 'bg-purple-50' },
  { name: 'Enterprise', subtitle: 'Ready', color: 'bg-green-50' }
];

function AnimatedMetric({ value, suffix, isVisible }: { value: number; suffix: string; isVisible: boolean }) {
  const count = useCountUp(value, 2000, isVisible);
  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export function TrustSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: metricsRef, isVisible: metricsVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: certsRef, isVisible: certsVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="py-28 lg:py-36 bg-gradient-section relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-brand-subtle opacity-40" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-accent-100/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative">
        {/* Section Header */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-20 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-white shadow-soft border border-neutral-200 mb-8">
            <ShieldCheckIcon className="h-4 w-4 text-primary-600 mr-2.5" />
            <span className="text-sm font-semibold text-neutral-700 tracking-wide">
              Enterprise-Ready Security
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-8 tracking-tight">
            Built for Enterprise{' '}
            <span className="bg-gradient-brand bg-clip-text text-transparent">
              Trust & Compliance
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            The security, governance, and reliability standards that enterprise retailers require—without the complexity.
          </p>
        </div>

        {/* Trust Metrics */}
        <div
          ref={metricsRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-24"
        >
          {trustMetrics.map((metric, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-8 text-center shadow-lg border border-neutral-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ${
                metricsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: metricsVisible ? `${index * 100}ms` : '0ms' }}
            >
              <div className="text-4xl lg:text-5xl font-bold bg-gradient-brand bg-clip-text text-transparent mb-3">
                <AnimatedMetric value={metric.value} suffix={metric.suffix} isVisible={metricsVisible} />
              </div>
              <div className="font-bold text-neutral-900 mb-2 text-lg">
                {metric.label}
              </div>
              <div className="text-sm text-neutral-500">
                {metric.description}
              </div>
            </div>
          ))}
        </div>

        {/* Security Features Grid */}
        <div
          ref={featuresRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-20"
        >
          {securityFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className={`group bg-white rounded-2xl p-8 shadow-lg border ${feature.borderColor} hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ${
                  featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: featuresVisible ? `${index * 100}ms` : '0ms' }}
              >
                <div className="flex items-start gap-5">
                  <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`h-7 w-7 ${feature.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 text-xl mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed text-base">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Certifications */}
        <div
          ref={certsRef as React.RefObject<HTMLDivElement>}
          className={`bg-white rounded-2xl p-10 shadow-lg border border-neutral-100 transition-all duration-700 ${
            certsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">
              Certified & Compliant
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className={`flex flex-col items-center justify-center p-6 rounded-xl ${cert.color} border border-neutral-100 hover:scale-105 transition-transform duration-300`}
              >
                <span className="text-xl font-bold text-neutral-900">{cert.name}</span>
                <span className="text-sm text-neutral-500 mt-1">{cert.subtitle}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-neutral-400 mt-8">
            Fusion5 is a Microsoft Gold Partner. Certifications verified on request.
          </p>
        </div>

        {/* Footnote */}
        <p className="text-center text-xs text-neutral-400 mt-10">
          *Typical implementation timeline based on customer deployments. Actual results may vary based on scope and requirements.
        </p>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="inline-block bg-white rounded-2xl p-10 shadow-xl border border-neutral-100 max-w-2xl">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">
              Join Leading D365 Retailers
            </h3>
            <p className="text-neutral-600 mb-8 text-lg leading-relaxed">
              See how enterprise retailers are achieving measurable ROI with governed AI agents.
            </p>
            <a
              href="/demo"
              className="group inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-cta rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 glow-hover"
            >
              Request Case Studies
              <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
