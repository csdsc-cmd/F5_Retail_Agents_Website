import { Link } from 'react-router-dom';
import { ChevronRightIcon, ShieldCheckIcon } from '../../ui/Icons';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

export function HomeCTA() {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-28 lg:py-36 overflow-hidden"
    >
      {/* Background with brand gradient */}
      <div className="absolute inset-0 bg-gradient-purple" />

      {/* Decorative elements - animated */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 blob-animate" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 blob-animate" style={{ animationDelay: '-4s' }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 blob-animate" style={{ animationDelay: '-2s' }} />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 tracking-tight">
            Ready to Transform Your{' '}
            <span className="text-accent-400">Retail Operations?</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Join forward-thinking retailers who are reducing costs, improving efficiency,
            and maintaining control with governed AI agents.
          </p>
        </div>

        {/* CTA Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto mb-16">
          {/* Primary CTA */}
          <div
            className={`group bg-white/10 backdrop-blur-sm rounded-2xl p-10 border border-white/20 text-center hover:bg-white/15 hover:border-white/30 hover:-translate-y-1 transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: isVisible ? '100ms' : '0ms' }}
          >
            <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-accent-500/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-accent-500/30 transition-all duration-300">
              <svg className="w-8 h-8 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              See the Platform in Action
            </h3>
            <p className="text-white/70 mb-8 leading-relaxed text-lg">
              Book a personalized demo to see how our agents integrate with your D365 environment.
            </p>
            <Link
              to="/demo"
              className="group/btn inline-flex items-center justify-center w-full px-8 py-4 text-lg font-semibold text-primary-800 bg-white rounded-xl hover:bg-neutral-100 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Book a Demo
              <ChevronRightIcon className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Secondary CTA */}
          <div
            className={`group bg-white/10 backdrop-blur-sm rounded-2xl p-10 border border-white/20 text-center hover:bg-white/15 hover:border-white/30 hover:-translate-y-1 transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: isVisible ? '200ms' : '0ms' }}
          >
            <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Calculate Your ROI
            </h3>
            <p className="text-white/70 mb-8 leading-relaxed text-lg">
              Use our assessment tool to estimate time savings and cost reductions for your business.
            </p>
            <Link
              to="/roi"
              className="group/btn inline-flex items-center justify-center w-full px-8 py-4 text-lg font-semibold text-white bg-white/10 border-2 border-white/30 rounded-xl hover:bg-white/20 hover:border-white/50 transition-all duration-300"
            >
              ROI Assessment
              <ChevronRightIcon className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Additional Trust Signal */}
        <div
          className={`text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: isVisible ? '300ms' : '0ms' }}
        >
          <Link
            to="/governance"
            className="inline-flex items-center text-white/70 hover:text-white transition-colors group text-lg"
          >
            <ShieldCheckIcon className="w-5 h-5 mr-2.5" />
            <span>Learn about our governance framework</span>
            <ChevronRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HomeCTA;
