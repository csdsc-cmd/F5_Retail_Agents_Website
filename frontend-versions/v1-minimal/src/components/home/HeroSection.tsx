
import { Link } from 'react-router-dom';
import { ChevronRightIcon, ShieldCheckIcon, CogIcon } from '../ui/Icons';

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-hero">
        {/* Abstract geometric shapes */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-brand-subtle rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-brand-subtle rounded-full blur-3xl opacity-40" />

        {/* Decorative grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #3B1D4E 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-left">
            {/* Eyebrow with D365 branding */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white shadow-soft border border-neutral-200 mb-6">
              <img src="/images/d365-logo.svg" alt="Dynamics 365" className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium text-neutral-700">
                AI Agents for Dynamics 365
              </span>
            </div>

            {/* Main Headline - Fusion5 Style */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight mb-5 leading-[1.1]">
              Make more possible.
              <span className="block mt-3 bg-gradient-brand bg-clip-text text-transparent animate-fade-in">
                Go beyond.
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl text-neutral-600 leading-relaxed mb-8 max-w-xl">
              Production-ready AI agents for <strong>Dynamics 365</strong> retail operations.
              Governed, compliant, and delivering ROI in 30 days—not 18 months.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                to="/demo"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-cta rounded-xl shadow-button hover:shadow-button-hover hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                Book a Demo
                <ChevronRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/roi"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-neutral-700 bg-white border border-neutral-300 rounded-xl hover:border-neutral-400 hover:bg-neutral-50 transition-all duration-200"
              >
                Calculate Your ROI
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-neutral-500">
              <div className="flex items-center">
                <ShieldCheckIcon className="h-5 w-5 text-primary-600 mr-2" />
                <span>Human-in-the-loop governance</span>
              </div>
              <div className="flex items-center">
                <CogIcon className="h-5 w-5 text-primary-600 mr-2" />
                <span>D365 native integration</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-accent-500">30-day</span>
                <span className="ml-1">time to value</span>
              </div>
            </div>
          </div>

          {/* Right Content - Product Dashboard Screenshot */}
          <div className="relative lg:pl-4">
            {/* Dashboard Screenshot with Browser Frame */}
            <div className="relative transform hover:scale-[1.01] transition-transform duration-500">
              {/* Browser-style frame */}
              <div className="bg-neutral-800 rounded-t-xl px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-neutral-700 rounded-md px-3 py-1 text-xs text-neutral-400 max-w-[200px]">
                    portal.fusion5agents.com
                  </div>
                </div>
              </div>

              {/* Dashboard Mockup Image */}
              <div className="rounded-b-xl overflow-hidden shadow-2xl border border-neutral-200 border-t-0">
                <img
                  src="/images/dashboard-mockup.svg"
                  alt="Fusion5 Retail Agent Platform - Agent Command Center showing all 6 AI agents monitoring retail operations"
                  className="w-full h-auto"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -top-3 -right-3 bg-gradient-cta text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                Live Demo
              </div>
            </div>

            {/* Floating notification card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-card-hover p-4 border border-neutral-200 max-w-[260px] animate-fade-in-up z-10">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900">Stock transfer approved</p>
                  <p className="text-xs text-neutral-500 mt-1">Human-in-the-loop • Just now</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">200 units</span>
                    <span className="text-xs text-neutral-400">Store #42</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}

export default HeroSection;
