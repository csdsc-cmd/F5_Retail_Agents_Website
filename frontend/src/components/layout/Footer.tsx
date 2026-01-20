import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Fusion5</h3>
            <p className="text-gray-400 text-sm">
              AI-powered retail solutions built on Microsoft Azure AI Foundry.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link to="/agents" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
                  AI Agents
                </Link>
              </li>
              <li>
                <Link to="/platform" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
                  Platform
                </Link>
              </li>
              <li>
                <Link to="/governance" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
                  Governance
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link to="/demo" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
                  Book a Demo
                </Link>
              </li>
              <li>
                <Link to="/roi" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
                  ROI Calculator
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a href="mailto:contact@fusion5.com" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© {currentYear} Fusion5. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}