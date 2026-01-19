// Trust Section with animated counters
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { Shield, Award, CheckCircle, Lock } from 'lucide-react';

const stats = [
  { value: 99.9, suffix: '%', label: 'Uptime SLA', prefix: '' },
  { value: 150, suffix: '+', label: 'Enterprise Clients', prefix: '' },
  { value: 2.5, suffix: 'B+', label: 'Decisions/Month', prefix: '' },
  { value: 45, suffix: '%', label: 'Avg. ROI Increase', prefix: '' },
];

const certifications = [
  { icon: Shield, label: 'SOC 2 Type II', description: 'Certified' },
  { icon: Lock, label: 'ISO 27001', description: 'Compliant' },
  { icon: Award, label: 'Microsoft Partner', description: 'Gold' },
  { icon: CheckCircle, label: 'GDPR', description: 'Compliant' },
];

export function TrustSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-5"
        style={{ backgroundImage: 'url(/images/stock/security-technology.jpg)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-800" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-green-500/10 text-green-400 text-sm font-medium rounded-full mb-4">
            Enterprise-Grade Security
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Built on Microsoft Azure with enterprise security, compliance, and reliability at its core.
          </p>
        </div>

        {/* Stats grid with animated counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600 transition-all duration-300"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
                <AnimatedCounter
                  from={0}
                  to={stat.value}
                  duration={2000}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="flex flex-wrap justify-center gap-4">
          {certifications.map(({ icon: Icon, label, description }) => (
            <div
              key={label}
              className="flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-800/70 border border-slate-700/50 hover:border-green-500/30 hover:bg-slate-800 transition-all duration-300 group"
            >
              <div className="p-2 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
                <Icon className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <div className="text-white font-medium text-sm">{label}</div>
                <div className="text-slate-500 text-xs">{description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustSection;