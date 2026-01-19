
import { Link } from 'react-router-dom';
import { ChevronRightIcon, ShieldCheckIcon } from '../ui/Icons';

export function HomeCTA() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background with brand gradient */}
      <div className="absolute inset-0 bg-gradient-purple" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your{' '}
            <span className="text-accent-400">Retail Operations?</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Join forward-thinking retailers who are reducing costs, improving efficiency,
            and maintaining control with governed AI agents.
          </p>
        </div>

        {/* CTA Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto mb-12">
          {/* Primary CTA */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center hover:bg-white/15 transition-colors">
            <div className="w-14 h-14 mx-auto mb-6 rounded-xl bg-accent-500/20 flex items-center justify-center">
              <svg className="w-7 h-7 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              See the Platform in Action
            </h3>
            <p className="text-white/70 mb-6 leading-relaxed">
              Book a personalized demo to see how our agents integrate with your D365 environment.
            </p>
            <Link
              to="/demo"
              className="group inline-flex items-center justify-center w-full px-6 py-3.5 text-base font-semibold text-primary-800 bg-white rounded-xl hover:bg-neutral-100 shadow-button hover:shadow-button-hover transition-all duration-200"
            >
              Book a Demo
              <ChevronRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Secondary CTA */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center hover:bg-white/15 transition-colors">
            <div className="w-14 h-14 mx-auto mb-6 rounded-xl bg-white/10 flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Calculate Your ROI
            </h3>
            <p className="text-white/70 mb-6 leading-relaxed">
              Use our assessment tool to estimate time savings and cost reductions for your business.
            </p>
            <Link
              to="/roi"
              className="group inline-flex items-center justify-center w-full px-6 py-3.5 text-base font-semibold text-white bg-white/10 border border-white/30 rounded-xl hover:bg-white/20 transition-all duration-200"
            >
              ROI Assessment
              <ChevronRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Additional Trust Signal */}
        <div className="text-center">
          <Link
            to="/governance"
            className="inline-flex items-center text-white/70 hover:text-white transition-colors group"
          >
            <ShieldCheckIcon className="w-5 h-5 mr-2" />
            <span>Learn about our governance framework</span>
            <ChevronRightIcon className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HomeCTA;
