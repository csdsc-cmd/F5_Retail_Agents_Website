import { Link } from 'react-router-dom';
import {
  ShieldCheckIcon,
  ChevronRightIcon,
  ClockIcon,
  ChartBarIcon
} from '../components/ui/Icons';

const governanceFeatures = [
  {
    icon: ShieldCheckIcon,
    title: 'Human-in-the-Loop Control',
    description: 'Every critical decision requires human approval before execution. AI recommends actions, but humans make the final call.',
    details: [
      'Configurable approval thresholds',
      'Role-based approval workflows',
      'Mobile notifications for urgent decisions',
      'Escalation paths for time-sensitive actions'
    ]
  },
  {
    icon: ClockIcon,
    title: 'Complete Audit Trail',
    description: 'Every action, recommendation, and decision is logged with full context for compliance and analysis.',
    details: [
      'Immutable audit logs',
      'User attribution tracking',
      'Decision rationale capture',
      'Exportable compliance reports'
    ]
  },
  {
    icon: ChartBarIcon,
    title: 'Explainable AI',
    description: 'Understand why agents make specific recommendations with transparent reasoning and data citations.',
    details: [
      'Clear recommendation rationale',
      'Data source citations',
      'Confidence scoring',
      'Alternative options presented'
    ]
  }
];

const complianceStandards = [
  {
    name: 'SOC 2 Type II',
    description: 'Annual audit of security controls'
  },
  {
    name: 'ISO 27001',
    description: 'Information security management'
  },
  {
    name: 'GDPR Ready',
    description: 'EU data protection compliance'
  },
  {
    name: 'Azure Secured',
    description: 'Microsoft cloud security'
  }
];

const approvalWorkflow = [
  {
    step: 1,
    title: 'Agent Analysis',
    description: 'AI agent analyzes data and identifies opportunity or issue',
    color: 'bg-blue-500'
  },
  {
    step: 2,
    title: 'Recommendation',
    description: 'Agent generates recommendation with supporting rationale',
    color: 'bg-purple-500'
  },
  {
    step: 3,
    title: 'Human Review',
    description: 'Authorized user reviews recommendation and context',
    color: 'bg-accent-500'
  },
  {
    step: 4,
    title: 'Approval/Reject',
    description: 'Human approves, modifies, or rejects the action',
    color: 'bg-green-500'
  },
  {
    step: 5,
    title: 'Execution & Audit',
    description: 'Action executed in D365 with full audit trail',
    color: 'bg-primary-600'
  }
];

export function Governance() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-brand-subtle rounded-full blur-3xl opacity-60" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white shadow-soft border border-neutral-200 mb-6">
              <ShieldCheckIcon className="h-5 w-5 text-primary-600 mr-2" />
              <span className="text-sm font-medium text-neutral-700">
                Enterprise-Grade Governance
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
              AI That Humans{' '}
              <span className="bg-gradient-brand bg-clip-text text-transparent">
                Control
              </span>
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed mb-8">
              Every critical decision requires human approval. Complete audit trails,
              explainable AI, and compliance-ready controls built into every agent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/demo"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-cta rounded-xl shadow-button hover:shadow-button-hover hover:scale-[1.02] transition-all duration-200"
              >
                See Governance in Action
                <ChevronRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/platform"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-neutral-700 bg-white border border-neutral-300 rounded-xl hover:border-neutral-400 transition-all"
              >
                Platform Overview
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Human-in-the-Loop Workflow */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Human-in-the-Loop Workflow
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              AI recommends, humans decide. Every critical action follows this approval workflow.
            </p>
          </div>

          {/* Workflow Steps */}
          <div className="relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-1 bg-neutral-200 z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
              {approvalWorkflow.map((step, index) => (
                <div key={step.step} className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg`}>
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-neutral-600">
                    {step.description}
                  </p>
                  {index < approvalWorkflow.length - 1 && (
                    <div className="lg:hidden mt-4 mb-2">
                      <svg className="w-6 h-6 text-neutral-400 rotate-90 lg:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Example Notification Card */}
          <div className="mt-16 max-w-2xl mx-auto">
            <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-neutral-900">Approval Required</h4>
                    <span className="text-xs text-neutral-500">Just now</span>
                  </div>
                  <p className="text-sm text-neutral-600 mb-3">
                    <strong>Inventory Agent</strong> recommends transferring 200 units of SKU-4521 from Warehouse A to Store #42 based on predicted stockout in 3 days.
                  </p>
                  <div className="flex items-center gap-3">
                    <button className="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
                      Approve
                    </button>
                    <button className="px-4 py-2 text-sm font-semibold text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors">
                      Review Details
                    </button>
                    <button className="px-4 py-2 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors">
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center text-sm text-neutral-500 mt-4">
              Example approval notification from the Inventory Intelligence Agent
            </p>
          </div>
        </div>
      </section>

      {/* Governance Features */}
      <section className="py-20 lg:py-28 bg-gradient-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Built-In Governance Controls
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Enterprise-ready controls that give you confidence in AI-assisted decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {governanceFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 border border-neutral-200 hover:shadow-card-hover transition-shadow"
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
                  <ul className="space-y-2">
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

      {/* Compliance Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Compliance & Security
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Built on Microsoft Azure with enterprise-grade security certifications.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceStandards.map((standard) => (
              <div
                key={standard.name}
                className="bg-neutral-50 rounded-xl p-6 border border-neutral-100 text-center hover:shadow-card transition-shadow"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white shadow-soft flex items-center justify-center">
                  <ShieldCheckIcon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="font-semibold text-neutral-900 mb-1">
                  {standard.name}
                </h3>
                <p className="text-sm text-neutral-500">
                  {standard.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-purple relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to See Governance in Action?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Book a demo to see how human-in-the-loop governance keeps you in control.
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

export default Governance;
