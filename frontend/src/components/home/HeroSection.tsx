import { Link } from 'react-router-dom';
import { ChevronRightIcon, ShieldCheckIcon, CogIcon } from '../ui/Icons';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-hero">
        {/* Abstract geometric shapes - animated */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-brand-subtle rounded-full blur-3xl opacity-60 blob-animate" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-brand-subtle rounded-full blur-3xl opacity-40 blob-animate" style={{ animationDelay: '-4s' }} />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-accent-100 rounded-full blur-3xl opacity-30 blob-animate" style={{ animationDelay: '-2s' }} />

        {/* Decorative grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #3B1D4E 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-left">
            {/* Eyebrow with D365 branding */}
            <div
              className="inline-flex items-center px-4 py-2.5 rounded-full bg-white/90 backdrop-blur-sm shadow-soft border border-neutral-200/80 mb-8 opacity-0 animate-fade-in"
              style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
            >
              <img src="/images/d365-logo.svg" alt="Dynamics 365" className="h-5 w-5 mr-2.5" />
              <span className="text-sm font-semibold text-neutral-700 tracking-wide">
                AI Agents for Dynamics 365
              </span>
            </div>

            {/* Main Headline - Fusion5 Style */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-neutral-900 tracking-tight mb-6 leading-[1.05] opacity-0 animate-fade-in-up"
              style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
            >
              Make more possible.
              <span className="block mt-4 bg-gradient-brand bg-clip-text text-transparent">
                Go beyond.
              </span>
            </h1>

            {/* Description - improved readability */}
            <p
              className="text-lg sm:text-xl text-neutral-600 leading-relaxed mb-10 max-w-xl opacity-0 animate-fade-in-up"
              style={{ animationDelay: '300ms', animationFillMode: 'forwards', lineHeight: '1.8' }}
            >
              Production-ready AI agents for <strong className="text-neutral-800">Dynamics 365</strong> retail operations.
              Governed, compliant, and delivering ROI in 30 days—not 18 months.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row gap-4 mb-10 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
            >
              <Link
                to="/demo"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-cta rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 glow-hover"
              >
                Book a Demo
                <ChevronRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                to="/roi"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-neutral-700 bg-white border-2 border-neutral-200 rounded-xl hover:border-primary-300 hover:bg-primary-50/50 transition-all duration-300"
              >
                Calculate Your ROI
              </Link>
            </div>

            {/* Trust Indicators */}
            <div
              className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-neutral-600 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}
            >
              <div className="flex items-center group">
                <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center mr-2.5 group-hover:bg-primary-100 transition-colors">
                  <ShieldCheckIcon className="h-4 w-4 text-primary-600" />
                </div>
                <span className="font-medium">Human-in-the-loop governance</span>
              </div>
              <div className="flex items-center group">
                <div className="w-8 h-8 rounded-lg bg-accent-50 flex items-center justify-center mr-2.5 group-hover:bg-accent-100 transition-colors">
                  <CogIcon className="h-4 w-4 text-accent-600" />
                </div>
                <span className="font-medium">D365 native integration</span>
              </div>
              <div className="flex items-center">
                <span className="font-bold text-accent-500 text-base">30-day</span>
                <span className="ml-1.5 font-medium">time to value</span>
              </div>
            </div>
          </div>

          {/* Right Content - Product Dashboard Screenshot */}
          <div
            className="relative lg:pl-6 opacity-0 animate-fade-in"
            style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
          >
            {/* Dashboard Screenshot with Browser Frame */}
            <div className="relative transform hover:scale-[1.01] transition-transform duration-500">
              {/* Browser-style frame */}
              <div className="bg-neutral-800 rounded-t-2xl px-4 py-3.5 flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer" />
                  <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-neutral-700/80 rounded-lg px-4 py-1.5 text-xs text-neutral-400 max-w-[220px] flex items-center">
                    <svg className="w-3 h-3 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    portal.fusion5agents.com
                  </div>
                </div>
              </div>

              {/* Dashboard Mockup Image */}
              <div className="rounded-b-2xl overflow-hidden shadow-2xl border border-neutral-200 border-t-0 bg-white">
                <img
                  src="/images/dashboard-mockup.svg"
                  alt="Fusion5 Retail Agent Platform - Agent Command Center showing all 6 AI agents monitoring retail operations"
                  className="w-full h-auto"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-cta text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg animate-pulse-slow">
                Live Demo
              </div>
            </div>

            {/* Floating notification card - enhanced */}
            <div
              className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-xl p-5 border border-neutral-100 max-w-[280px] z-10 opacity-0 animate-slide-up"
              style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-900">Stock transfer approved</p>
                  <p className="text-xs text-neutral-500 mt-1.5">Human-in-the-loop • Just now</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-semibold">200 units</span>
                    <span className="text-xs text-neutral-400">Store #42</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional floating element */}
            <div
              className="absolute top-1/4 -right-6 bg-white rounded-xl shadow-lg p-3 border border-neutral-100 z-10 opacity-0 animate-fade-in float"
              style={{ animationDelay: '1000ms', animationFillMode: 'forwards' }}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-900">+12%</p>
                  <p className="text-[10px] text-neutral-500">This week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}

export default HeroSection;
