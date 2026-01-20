const agents = [
  {
    name: 'Pricing Agent',
    slug: 'pricing',
    description: 'Dynamic pricing optimization powered by real-time market analysis and competitor monitoring.',
    icon: '💰',
    features: ['Real-time price optimization', 'Competitor analysis', 'Demand forecasting'],
    color: 'cyan',
  },
  {
    name: 'Inventory Agent',
    slug: 'inventory',
    description: 'Intelligent inventory management with predictive restocking and demand forecasting.',
    icon: '📦',
    features: ['Stock level optimization', 'Demand prediction', 'Automated reordering'],
    color: 'blue',
  },
  {
    name: 'Customer Agent',
    slug: 'customer',
    description: 'Personalized customer experiences through AI-driven insights and recommendations.',
    icon: '👥',
    features: ['Personalization at scale', 'Behavior analysis', 'Churn prediction'],
    color: 'purple',
  },
  {
    name: 'Analytics Agent',
    slug: 'analytics',
    description: 'Deep business intelligence with automated reporting and actionable insights.',
    icon: '📊',
    features: ['Automated reporting', 'Trend analysis', 'KPI monitoring'],
    color: 'green',
  },
  {
    name: 'Supply Chain Agent',
    slug: 'supply-chain',
    description: 'End-to-end supply chain visibility and optimization with predictive logistics.',
    icon: '🚚',
    features: ['Route optimization', 'Supplier management', 'Risk assessment'],
    color: 'orange',
  },
  {
    name: 'Compliance Agent',
    slug: 'compliance',
    description: 'Automated regulatory compliance monitoring and audit trail management.',
    icon: '🛡️',
    features: ['Policy enforcement', 'Audit logging', 'Risk monitoring'],
    color: 'red',
  },
];

const colorMap: Record<string, string> = {
  cyan: 'from-cyan-500 to-cyan-600',
  blue: 'from-blue-500 to-blue-600',
  purple: 'from-purple-500 to-purple-600',
  green: 'from-green-500 to-green-600',
  orange: 'from-orange-500 to-orange-600',
  red: 'from-red-500 to-red-600',
};

const borderColorMap: Record<string, string> = {
  cyan: 'hover:border-cyan-500/50',
  blue: 'hover:border-blue-500/50',
  purple: 'hover:border-purple-500/50',
  green: 'hover:border-green-500/50',
  orange: 'hover:border-orange-500/50',
  red: 'hover:border-red-500/50',
};

export default function AgentsOverview() {
  return (
    <section id="agents" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 text-sm font-medium text-cyan-400 bg-cyan-400/10 rounded-full mb-4">
            AI Agent Suite
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Six Specialized Agents,
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              One Unified Platform
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Each agent is purpose-built for specific retail operations, working together
            seamlessly to optimize your entire business.
          </p>
        </div>

        {/* Agents Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <a
              key={agent.slug}
              href={`/agents/${agent.slug}`}
              className={`group relative p-6 bg-slate-800/50 border border-slate-700/50 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${borderColorMap[agent.color]} focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900`}
            >
              {/* Gradient Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${colorMap[agent.color]} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity`} />

              {/* Icon */}
              <div className="text-4xl mb-4">{agent.icon}</div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                {agent.name}
              </h3>
              <p className="text-slate-400 text-sm mb-4">{agent.description}</p>

              {/* Features */}
              <ul className="space-y-2">
                {agent.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-slate-500">
                    <svg className="w-4 h-4 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Arrow */}
              <div className="absolute bottom-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-slate-700/50 text-slate-400 group-hover:bg-cyan-500 group-hover:text-white transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}