import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-fusion-deepPurple text-white">
      {/* Gradient accent line at top */}
      <div className="h-1 bg-gradient-brand-horizontal" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            {/* Logo for dark background */}
            <div className="mb-6">
              <Link to="/" className="inline-flex items-center gap-3 group">
                <img
                  src="/images/Fusion5_Logo_White.svg"
                  alt="Fusion5"
                  className="h-10 w-auto"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <span className="hidden text-2xl font-bold bg-gradient-to-r from-accent-400 to-accent-500 bg-clip-text text-transparent">
                  Fusion5
                </span>
                <span className="text-sm text-primary-300 font-medium border-l border-primary-700 pl-3">
                  Retail Agents
                </span>
              </Link>
            </div>
            <p className="text-primary-200 mb-6 max-w-md leading-relaxed">
              Governed AI agents for Dynamics 365 retail operations.
              Safer, faster, and more economical than building in-house.
            </p>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <img src="/images/d365-logo.svg" alt="Microsoft Dynamics 365" className="h-6 w-6" />
                <span className="text-sm text-primary-300">D365 Partner</span>
              </div>
              <span className="text-primary-700">|</span>
              <span className="text-sm text-primary-300">Azure Verified</span>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/fusion5"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-300 mb-4">Platform</h3>
            <ul className="space-y-3">
              {[
                { name: 'Overview', href: '/platform' },
                { name: 'All Agents', href: '/agents' },
                { name: 'Governance & Security', href: '/governance' },
                { name: 'ROI Assessment', href: '/roi' }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-primary-200 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Agents Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-300 mb-4">Agents</h3>
            <ul className="space-y-3">
              {[
                { name: 'Inventory Intelligence', href: '/agents/inventory' },
                { name: 'Pricing & Promotions', href: '/agents/pricing' },
                { name: 'Store Operations', href: '/agents/store-operations' },
                { name: 'Customer Service', href: '/agents/customer-service' },
                { name: 'Loss Prevention', href: '/agents/loss-prevention' },
                { name: 'Executive Insights', href: '/agents/executive-insights' }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-primary-200 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary-700/50 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-primary-300 text-sm">
            © {new Date().getFullYear()} Fusion5. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <a
              href="https://www.fusion5.com/nz/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-white transition-colors text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="https://www.fusion5.com/nz/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-white transition-colors text-sm"
            >
              Terms of Service
            </a>
            <Link
              to="/demo"
              className="group inline-flex items-center text-accent-400 hover:text-accent-300 transition-colors text-sm font-semibold"
            >
              Book a Demo
              <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
