import { useParams, Navigate, Link } from 'react-router-dom';
import { agents } from '../data/agents';
import { ChevronRightIcon, ShieldCheckIcon, CogIcon, ChartBarIcon } from '../components/ui/Icons';

const agentIconMap: Record<string, string> = {
  inventory: '/images/agent-inventory.svg',
  pricing: '/images/agent-pricing.svg',
  store: '/images/agent-store-ops.svg',
  customer: '/images/agent-customer-service.svg',
  security: '/images/agent-loss-prevention.svg',
  insights: '/images/agent-executive.svg'
};

const categoryInfo: Record<string, { label: string; color: string; bgColor: string }> = {
  operations: { label: 'Operations', color: 'text-accent-700', bgColor: 'bg-accent-100' },
  finance: { label: 'Finance', color: 'text-primary-700', bgColor: 'bg-primary-100' },
  customer: { label: 'Customer', color: 'text-blue-700', bgColor: 'bg-blue-100' },
  analytics: { label: 'Analytics', color: 'text-green-700', bgColor: 'bg-green-100' }
};

export function AgentDetail() {
  const { agentSlug } = useParams<{ agentSlug: string }>();
  const agent = agents.find((a) => a.id === agentSlug);

  if (!agent) {
    return <Navigate to="/agents" replace />;
  }

  const iconSrc = agentIconMap[agent.icon] || agentIconMap.inventory;
  const category = categoryInfo[agent.category] || categoryInfo.operations;

  // Find related agents (same category, excluding current)
  const relatedAgents = agents.filter(a => a.category === agent.category && a.id !== agent.id).slice(0, 2);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-brand-subtle rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-brand-subtle rounded-full blur-3xl opacity-40" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              {/* Breadcrumb */}
              <nav className="flex items-center text-sm text-neutral-500 mb-6">
                <Link to="/agents" className="hover:text-neutral-700 transition-colors">
                  Agents
                </Link>
                <ChevronRightIcon className="h-4 w-4 mx-2" />
                <span className="text-neutral-900 font-medium">{agent.shortName}</span>
              </nav>

              {/* Category Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white shadow-soft border border-neutral-200 mb-6">
                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${category.bgColor} ${category.color} mr-2`}>
                  {category.label}
                </span>
                <span className="text-sm font-medium text-neutral-700">
                  AI Agent
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
                {agent.name}
              </h1>
              <p className="text-xl text-neutral-600 leading-relaxed mb-8">
                {agent.description}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/demo"
                  className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-cta rounded-xl shadow-button hover:shadow-button-hover hover:scale-[1.02] transition-all duration-200"
                >
                  Book a Demo
                  <ChevronRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/roi"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-neutral-700 bg-white border border-neutral-300 rounded-xl hover:border-neutral-400 transition-all"
                >
                  Calculate ROI
                </Link>
              </div>
            </div>

            {/* Right - Agent Icon */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-3xl bg-white shadow-card border border-neutral-200 flex items-center justify-center p-8">
                  <img
                    src={iconSrc}
                    alt={`${agent.name} icon`}
                    className="w-full h-full object-contain"
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-4 bg-gradient-cta text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-lg">
                  D365 Native
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Key Benefits
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              What this agent delivers for your retail operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {agent.benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-neutral-50 rounded-xl p-6 border border-neutral-100"
              >
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-neutral-700 font-medium">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 lg:py-28 bg-gradient-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
                Common Use Cases
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
                See how retail teams use this agent to automate critical workflows and improve operations.
              </p>
              <ul className="space-y-4">
                {agent.useCases.map((useCase, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-accent-600 text-sm font-bold">{index + 1}</span>
                    </div>
                    <span className="text-neutral-700">{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mock UI Card */}
            <div className="bg-white rounded-2xl shadow-card border border-neutral-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-brand-subtle flex items-center justify-center">
                  <img src={iconSrc} alt="" className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900">{agent.shortName}</h4>
                  <p className="text-xs text-neutral-500">Active • Last updated 2 min ago</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-neutral-700">Tasks Completed Today</span>
                    <span className="text-lg font-bold text-green-600">47</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }} />
                  </div>
                </div>

                <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-neutral-700">Pending Approvals</span>
                    <span className="text-lg font-bold text-accent-600">3</span>
                  </div>
                  <p className="text-xs text-neutral-500">Requires human review</p>
                </div>

                <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-neutral-700">Efficiency Gain</span>
                    <span className="text-lg font-bold text-primary-600">+42%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unique Selling Points */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              What Makes This Agent{' '}
              <span className="bg-gradient-brand bg-clip-text text-transparent">Different</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Built specifically for D365 retail with enterprise governance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {agent.uniqueSellingPoints.map((usp, index) => (
              <div
                key={index}
                className="bg-gradient-brand-subtle rounded-xl p-6 border border-primary-100"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center flex-shrink-0">
                    {index === 0 && <CogIcon className="w-5 h-5 text-primary-600" />}
                    {index === 1 && <ShieldCheckIcon className="w-5 h-5 text-primary-600" />}
                    {index === 2 && <ChartBarIcon className="w-5 h-5 text-primary-600" />}
                    {index === 3 && <CogIcon className="w-5 h-5 text-primary-600" />}
                  </div>
                  <p className="text-neutral-700 font-medium">{usp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Agents */}
      {relatedAgents.length > 0 && (
        <section className="py-20 lg:py-28 bg-gradient-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
                Related Agents
              </h2>
              <p className="text-xl text-neutral-600">
                Explore other agents in the {category.label.toLowerCase()} category.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {relatedAgents.map((relatedAgent) => {
                const relatedIconSrc = agentIconMap[relatedAgent.icon] || agentIconMap.inventory;
                return (
                  <Link
                    key={relatedAgent.id}
                    to={relatedAgent.route}
                    className="bg-white rounded-2xl border border-neutral-200 p-6 hover:shadow-card-hover transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center p-2">
                        <img src={relatedIconSrc} alt="" className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary-700 transition-colors">
                          {relatedAgent.name}
                        </h3>
                        <p className="text-sm text-neutral-600 line-clamp-2">
                          {relatedAgent.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="text-center mt-8">
              <Link
                to="/agents"
                className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700"
              >
                View All Agents
                <ChevronRightIcon className="ml-1 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-purple relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to See {agent.shortName} in Action?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Book a personalized demo to see how this agent can transform your operations.
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

export default AgentDetail;
