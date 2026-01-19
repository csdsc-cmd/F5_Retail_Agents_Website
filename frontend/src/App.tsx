// BUILD_COMPLETE - WOW Factor Enhancement v1.0


import { HeroSection } from './components/home/HeroSection';
import { AgentsOverview } from './components/home/AgentsOverview';
import { CustomerLogos } from './components/home/CustomerLogos';
import { PlatformBenefits } from './components/home/PlatformBenefits';
import { TrustSection } from './components/home/TrustSection';
import { HomeCTA } from './components/home/HomeCTA';

function App() {
  return (
    <div className="min-h-screen bg-gray-950">
      <HeroSection />
      <CustomerLogos />
      <AgentsOverview />
      <PlatformBenefits />
      <TrustSection />
      <HomeCTA />
    </div>
  );
}

export default App;