import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { VersionProvider, useVersion } from './contexts/VersionContext';

// Layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ModernHeader from './components/layout/ModernHeader';
import ModernFooter from './components/layout/ModernFooter';

// Traditional page components
import TraditionalHeroSection from './components/home/traditional/HeroSection';
import TraditionalAgentsOverview from './components/home/traditional/AgentsOverview';
import TraditionalPlatformBenefits from './components/home/traditional/PlatformBenefits';
import TraditionalTrustSection from './components/home/traditional/TrustSection';
import TraditionalHomeCTA from './components/home/traditional/HomeCTA';
import CustomerLogos from './components/home/traditional/CustomerLogos';

// Modern page components
import ModernHeroSection from './components/home/modern/HeroSection';
import ModernAgentsOverview from './components/home/modern/AgentsOverview';
import ModernPlatformBenefits from './components/home/modern/PlatformBenefits';

// Shared pages
import Demo from './pages/Demo';
import ROICalculator from './pages/ROICalculator';
import Privacy from './pages/Privacy';

// UI Components
import VersionToggle from './components/ui/VersionToggle';

// BUILD_COMPLETE - Unified Improvements v2.0

function TraditionalHome() {
  return (
    <main>
      <TraditionalHeroSection />
      <CustomerLogos />
      <TraditionalAgentsOverview />
      <TraditionalPlatformBenefits />
      <TraditionalTrustSection />
      <TraditionalHomeCTA />
    </main>
  );
}

function TraditionalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}

function TraditionalVersion() {
  return (
    <BrowserRouter>
      <TraditionalLayout>
        <Routes>
          <Route path="/" element={<TraditionalHome />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/roi" element={<ROICalculator />} />
          <Route path="/platform" element={<TraditionalPlatformBenefits />} />
          <Route path="/agents" element={<TraditionalAgentsOverview />} />
          <Route path="/agents/:agentSlug" element={<AgentDetail />} />
          <Route path="/governance" element={<GovernancePage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </TraditionalLayout>
      <VersionToggle />
    </BrowserRouter>
  );
}

function ModernHome() {
  return (
    <main>
      <section id="hero">
        <ModernHeroSection />
      </section>
      <section id="agents">
        <ModernAgentsOverview />
      </section>
      <section id="benefits">
        <ModernPlatformBenefits />
      </section>
      <section id="trust">
        <ModernTrustSection />
      </section>
      <section id="cta">
        <ModernCTA />
      </section>
    </main>
  );
}

function ModernVersion() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-950 text-white">
        <ModernHeader />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<ModernHome />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/roi" element={<ROICalculator />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </div>
        <ModernFooter />
      </div>
      <VersionToggle />
    </BrowserRouter>
  );
}

// Placeholder components for missing pages
function AgentDetail() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-4">Agent Details</h1>
      <p>Agent detail page content coming soon.</p>
    </div>
  );
}

function GovernancePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-4">AI Governance</h1>
      <p>Our approach to responsible AI and governance frameworks.</p>
    </div>
  );
}

function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-4">Resources</h1>
      <p>Whitepapers, case studies, and documentation.</p>
    </div>
  );
}

function ModernTrustSection() {
  return (
    <div className="py-20 bg-slate-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Enterprise-Grade Security & Trust</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold mb-2">SOC 2 Type II</h3>
            <p className="text-slate-400">Certified security controls and processes</p>
          </div>
          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="text-xl font-semibold mb-2">GDPR Compliant</h3>
            <p className="text-slate-400">Full data privacy compliance</p>
          </div>
          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
            <div className="text-4xl mb-4">☁️</div>
            <h3 className="text-xl font-semibold mb-2">Azure Native</h3>
            <p className="text-slate-400">Built on Microsoft Azure AI Foundry</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModernCTA() {
  return (
    <div className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Retail Operations?</h2>
        <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
          Join leading retailers who are already seeing 40%+ efficiency gains with AI agents.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/demo"
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold text-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            Start Free Trial
          </a>
          <a
            href="/roi"
            className="px-8 py-4 bg-slate-800 border border-slate-600 rounded-lg font-semibold text-lg hover:bg-slate-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            Calculate Your ROI
          </a>
        </div>
      </div>
    </div>
  );
}

function AppContent() {
  const { version } = useVersion();
  
  return version === 'traditional' ? <TraditionalVersion /> : <ModernVersion />;
}

function App() {
  return (
    <VersionProvider>
      <AppContent />
    </VersionProvider>
  );
}

export default App;