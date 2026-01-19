
import { HeroSection } from '../components/home/HeroSection';
import { CustomerLogos } from '../components/home/CustomerLogos';
import { AgentsOverview } from '../components/home/AgentsOverview';
import { PlatformBenefits } from '../components/home/PlatformBenefits';
import { TrustSection } from '../components/home/TrustSection';
import { HomeCTA } from '../components/home/HomeCTA';

export function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CustomerLogos />
      <AgentsOverview />
      <PlatformBenefits />
      <TrustSection />
      <HomeCTA />
    </div>
  );
}

export default Home;