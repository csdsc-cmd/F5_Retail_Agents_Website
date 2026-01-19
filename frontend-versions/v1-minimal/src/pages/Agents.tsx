import { Link } from 'react-router-dom';
import { agents } from '../data/agents';
import { ChevronRightIcon } from '../components/ui/Icons';

const agentIconMap: Record<string, string> = {
  inventory: '/images/agent-inventory.svg',
  pricing: '/images/agent-pricing.svg',
  store: '/images/agent-store-ops.svg',
  customer: '/images/agent-customer-service.svg',
  security: '/images/agent-loss-prevention.svg',
  insights: '/images/agent-executive.svg'
};

const colorMap: Record<string, { bg: string; border: string; gradient: string }> = {
  operations: { bg: 'bg-accent-50', border: 'border-accent-200', gradient: 'from-accent-500 to-accent-600' },
  finance: { bg: 'bg-primary-50', border: 'border-primary-200', gradient: 'from-primary-500 to-primary-600' },
  customer: { bg: 'bg-blue-50', border: 'border-blue-200', gradient: 'from-blue-500 to-blue-600' },
  analytics: { bg: 'bg-green-50', border: 'border-green-200', gradient: 'from-green-500 to-green-600' }
};

export function Agents() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-brand-subtle rounded-full blur-3xl opacity-60" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white shadow-soft border border-neutral-200 mb-6">
              <span className="text-sm font-medium text-neutral-700">
                6 Purpose-Built Agents
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
              AI Agents Built for{' '}
              <span className="bg-gradient-brand bg-clip-text text-transparent">
                Retail Excellence
              </span>
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed">
              Each agent is purpose-built for specific retail workflows, with human-in-the-loop
              governance and native D365 integration.
            </p>
          </div>
        </div>
      </section>

      {/* Agents Grid */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {agents.map((agent) => {
              const iconSrc = agentIconMap[agent.icon] || agentIconMap.inventory;
              const colors = colorMap[agent.category] || colorMap.operations;

              return (
                <Link
                  key={agent.id}
                  to={agent.route}
                  className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:border-neutral-300 hover:shadow-card-hover transition-all duration-300"
                >
                  {/* Gradient accent bar */}
                  <div className={`h-1.5 bg-gradient-to-r ${colors.gradient}`} />

                  <div className="p-8">
                    <div className="flex items-start gap-6">
                      {/* Custom SVG Icon */}
                      <div className={`w-20 h-20 rounded-2xl ${colors.bg} ${colors.border} border flex items-center justify-center flex-shrink-0 p-3`}>
                        <img
                          src={iconSrc}
                          alt={`${agent.name} icon`}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${colors.bg} text-neutral-700`}>
                            {agent.category.charAt(0).toUpperCase() + agent.category.slice(1)}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-neutral-900 mb-2 group-hover:text-primary-700 transition-colors">
                          {agent.name}
                        </h3>
                        <p className="text-neutral-600 leading-relaxed mb-4">
                          {agent.description}
                        </p>

                        {/* Benefits preview */}
                        <div className="space-y-2 mb-4">
                          {agent.benefits.slice(0, 2).map((benefit, index) => (
                            <div key={index} className="flex items-center text-sm text-neutral-500">
                              <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {benefit}
                            </div>
                          ))}
                        </div>

                        {/* Learn more link */}
                        <div className="flex items-center text-sm font-semibold text-primary-600 group-hover:text-primary-700">
                          <span>View Agent Details</span>
                          <ChevronRightIcon className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-purple relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            See Our Agents in Action
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Book a demo to see how our agents can transform your retail operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/demo"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-800 bg-white rounded-xl shadow-button hover:shadow-button-hover hover:scale-[1.02] transition-all duration-200"
            >
              Book a Demo
              <ChevronRightIcon className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/roi"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-white/10 border border-white/30 rounded-xl hover:bg-white/20 transition-all duration-200"
            >
              Calculate ROI
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Agents;
