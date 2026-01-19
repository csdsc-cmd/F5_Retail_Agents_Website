import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '../ui/Icons';

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
    href: '/agents/loss-prevention'
  },
  {
    id: 'executive-insights',
    name: 'Executive Insights',
    description: 'Answers executive questions about retail performance with context and actions.',
    metric: '80%',
    metricLabel: 'less analyst time',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    href: '/agents/executive-insights'
  }
];

export function AgentsOverview() {
  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-neutral-50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-50 border border-primary-100 mb-6">
            <span className="text-sm font-medium text-primary-700">
              Purpose-Built for Retail
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            Six Agents.{' '}
            <span className="bg-gradient-brand bg-clip-text text-transparent">
              Infinite Possibilities.
            </span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Each agent is purpose-built for specific retail workflows, with human-in-the-loop
            governance and D365 native integration.
          </p>
        </div>

        {/* Agent Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {agents.map((agent) => {
            const iconSrc = agentIconMap[agent.id];
            return (
              <Link
                key={agent.id}
                to={agent.href}
                className="group relative bg-white rounded-2xl border border-neutral-200 p-6 hover:border-neutral-300 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
              >
                {/* Gradient accent on hover */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${agent.color} rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />

                {/* Custom SVG Icon */}
                <div className={`w-16 h-16 rounded-xl ${agent.bgColor} ${agent.borderColor} border flex items-center justify-center mb-5 p-3`}>
                  <img
                    src={iconSrc}
                    alt={`${agent.name} icon`}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary-700 transition-colors">
                  {agent.name}
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed mb-5">
                  {agent.description}
                </p>

                {/* Metric highlight */}
                <div className="flex items-baseline gap-2 mb-4 pb-4 border-b border-neutral-100">
                  <span className={`text-2xl font-bold bg-gradient-to-r ${agent.color} bg-clip-text text-transparent`}>
                    {agent.metric}
                  </span>
                  <span className="text-sm text-neutral-500">{agent.metricLabel}</span>
                </div>

                {/* Learn more link */}
                <div className="flex items-center text-sm font-medium text-primary-600 group-hover:text-primary-700">
                  <span>Learn more</span>
                  <ChevronRightIcon className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Link
            to="/agents"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-purple rounded-xl shadow-button hover:shadow-button-hover hover:scale-[1.02] transition-all duration-200"
          >
            Explore All Agents
            <ChevronRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AgentsOverview;
