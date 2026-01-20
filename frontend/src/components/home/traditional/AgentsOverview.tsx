import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '../../ui/Icons';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

// Map to custom SVG icons (matching the Agents page)
const agentIconMap: Record<string, string> = {
  inventory: '/images/agent-inventory.svg',
  pricing: '/images/agent-pricing.svg',
  'store-operations': '/images/agent-store-ops.svg',
  'customer-service': '/images/agent-customer-service.svg',
  'loss-prevention': '/images/agent-loss-prevention.svg',
  'executive-insights': '/images/agent-executive.svg'
};

const agents = [
  {
    id: 'inventory',
    name: 'Inventory Intelligence',
    description: 'Automates detection, analysis, and handling of inventory exceptions across stores and channels.',
    metric: '35%',
    metricLabel: 'stockout reduction',
    color: 'from-accent-500 to-accent-600',
    bgColor: 'bg-accent-50',
    borderColor: 'border-accent-200',
    hoverBorder: 'hover:border-accent-300',
    href: '/agents/inventory'
  },
  {
    id: 'pricing',
    name: 'Pricing & Promotions',
    description: 'Monitors promotion performance, explains margin impact, and flags corrective actions.',
    metric: '$24K',
    metricLabel: 'avg margin protected/month',
    color: 'from-primary-500 to-primary-600',
    bgColor: 'bg-primary-50',
    borderColor: 'border-primary-200',
    hoverBorder: 'hover:border-primary-300',
    href: '/agents/pricing'
  },
  {
    id: 'store-operations',
    name: 'Store Operations',
    description: 'Automates store task execution monitoring and exception escalation.',
    metric: '98%',
    metricLabel: 'task compliance',
    color: 'from-fusion-magenta to-fusion-purple',
    bgColor: 'bg-primary-50',
    borderColor: 'border-primary-200',
    hoverBorder: 'hover:border-primary-300',
    href: '/agents/store-operations'
  },
  {
    id: 'customer-service',
    name: 'Customer Service & Returns',
    description: 'Handles repetitive retail enquiries and triages returns before human involvement.',
    metric: '60%',
    metricLabel: 'faster resolution',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    hoverBorder: 'hover:border-blue-300',
    href: '/agents/customer-service'
  },
  {
    id: 'loss-prevention',
    name: 'Loss Prevention Intelligence',
    description: 'Identifies anomalous inventory and financial patterns linked to shrinkage.',
    metric: '2x',
    metricLabel: 'faster detection',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    hoverBorder: 'hover:border-green-300',
    href: '/agents/loss-prevention'
  },
  {
    id: 'executive-insights',
    name: 'Executive Insights',
    description: 'Answers executive questions about retail performance with context and actions.',
    metric: '80%',
    metricLabel: 'less analyst time',
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    hoverBorder: 'hover:border-emerald-300',
    href: '/agents/executive-insights'
  }
];

export function AgentsOverview() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section className="py-28 lg:py-36 bg-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-neutral-50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-50/30 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative">
        {/* Section Header */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-20 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-primary-50 border border-primary-100 mb-8">
            <span className="text-sm font-semibold text-primary-700 tracking-wide">
              Purpose-Built for Retail
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-8 tracking-tight">
            Six Agents.{' '}
            <span className="bg-gradient-brand bg-clip-text text-transparent">
              Infinite Possibilities.
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Each agent is purpose-built for specific retail workflows, with human-in-the-loop
            governance and D365 native integration.
          </p>
        </div>

        {/* Agent Cards Grid */}
        <div
          ref={gridRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          {agents.map((agent, index) => {
            const iconSrc = agentIconMap[agent.id];
            return (
              <Link
                key={agent.id}
                to={agent.href}
                className={`group relative bg-white rounded-2xl border-2 ${agent.borderColor} ${agent.hoverBorder} p-7 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 ${
                  gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: gridVisible ? `${index * 100}ms` : '0ms' }}
              >
                {/* Gradient accent on hover */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${agent.color} rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Custom SVG Icon */}
                <div className={`w-16 h-16 rounded-xl ${agent.bgColor} ${agent.borderColor} border-2 flex items-center justify-center mb-6 p-3 group-hover:scale-110 transition-transform duration-300`}>
                  <img
                    src={iconSrc}
                    alt={`${agent.name} icon`}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary-700 transition-colors duration-300">
                  {agent.name}
                </h3>
                <p className="text-neutral-600 text-base leading-relaxed mb-6">
                  {agent.description}
                </p>

                {/* Metric highlight */}
                <div className="flex items-baseline gap-2 mb-5 pb-5 border-b border-neutral-100">
                  <span className={`text-3xl font-bold bg-gradient-to-r ${agent.color} bg-clip-text text-transparent`}>
                    {agent.metric}
                  </span>
                  <span className="text-sm text-neutral-500 font-medium">{agent.metricLabel}</span>
                </div>

                {/* Learn more link */}
                <div className="flex items-center text-sm font-semibold text-primary-600 group-hover:text-primary-700">
                  <span>Learn more</span>
                  <ChevronRightIcon className="ml-1.5 h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          ref={ctaRef as React.RefObject<HTMLDivElement>}
          className={`text-center mt-20 transition-all duration-700 ${
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Link
            to="/agents"
            className="group inline-flex items-center justify-center px-10 py-5 text-lg font-semibold text-white bg-gradient-purple rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            Explore All Agents
            <ChevronRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AgentsOverview;
