import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '../components/ui/Icons';

const resources = [
  {
    type: 'Whitepaper',
    title: 'The Enterprise Guide to AI Agents in Retail',
    description: 'Learn how leading retailers are using AI agents to transform operations while maintaining human oversight and governance.',
    readTime: '12 min read',
    category: 'strategy',
    featured: true
  },
  {
    type: 'Case Study',
    title: 'How a National Retailer Reduced Stockouts by 34%',
    description: 'A deep dive into how our Inventory Intelligence Agent helped a 200-store retailer optimize stock levels.',
    readTime: '8 min read',
    category: 'operations'
  },
  {
    type: 'Guide',
    title: 'Human-in-the-Loop AI: Best Practices',
    description: 'A comprehensive guide to implementing AI governance frameworks that keep humans in control.',
    readTime: '15 min read',
    category: 'governance'
  },
  {
    type: 'Whitepaper',
    title: 'ROI of AI Agents: A Framework for Measurement',
    description: 'How to build a business case for AI agents and measure return on investment across retail operations.',
    readTime: '10 min read',
    category: 'strategy'
  },
  {
    type: 'Case Study',
    title: 'Dynamic Pricing in Action: 22% Margin Improvement',
    description: 'See how the Pricing & Promotions Agent helped a specialty retailer optimize pricing decisions.',
    readTime: '6 min read',
    category: 'finance'
  },
  {
    type: 'Guide',
    title: 'D365 Integration: Technical Architecture',
    description: 'Technical documentation on how the platform integrates with Microsoft Dynamics 365.',
    readTime: '20 min read',
    category: 'technical'
  }
];

const categories = [
  { id: 'all', name: 'All Resources' },
  { id: 'strategy', name: 'Strategy' },
  { id: 'operations', name: 'Operations' },
  { id: 'governance', name: 'Governance' },
  { id: 'finance', name: 'Finance' },
  { id: 'technical', name: 'Technical' }
];

const typeColors: Record<string, { bg: string; text: string }> = {
  Whitepaper: { bg: 'bg-primary-100', text: 'text-primary-700' },
  'Case Study': { bg: 'bg-green-100', text: 'text-green-700' },
  Guide: { bg: 'bg-blue-100', text: 'text-blue-700' }
};

export function Resources() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredResources = resources.filter(r =>
    !r.featured && (activeCategory === 'all' || r.category === activeCategory)
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-brand-subtle rounded-full blur-3xl opacity-60" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white shadow-soft border border-neutral-200 mb-6">
              <span className="text-sm font-medium text-neutral-700">
                Learning Center
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
              Resources &{' '}
              <span className="bg-gradient-brand bg-clip-text text-transparent">
                Insights
              </span>
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed">
              Whitepapers, case studies, and guides to help you understand AI agents
              and build your business case.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Resource */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {resources.filter(r => r.featured).map((resource, index) => (
            <div key={index} className="bg-gradient-brand-subtle rounded-2xl p-8 lg:p-12 border border-primary-100">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${typeColors[resource.type].bg} ${typeColors[resource.type].text} mb-4`}>
                    Featured {resource.type}
                  </span>
                  <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-4">
                    {resource.title}
                  </h2>
                  <p className="text-neutral-600 leading-relaxed mb-6">
                    {resource.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <button
                      disabled
                      className="group inline-flex items-center px-6 py-3 text-base font-semibold text-white bg-neutral-400 rounded-xl cursor-not-allowed opacity-75"
                    >
                      Coming Soon
                      <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                    <span className="text-sm text-neutral-500">{resource.readTime}</span>
                  </div>
                </div>
                <div className="hidden lg:block">
                  <div className="bg-white rounded-xl shadow-card p-6 border border-neutral-200">
                    <div className="aspect-[4/3] bg-neutral-100 rounded-lg flex items-center justify-center">
                      <svg className="w-16 h-16 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Category Filter & Resources Grid */}
      <section className="py-16 lg:py-24 bg-gradient-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  category.id === activeCategory
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <svg className="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-lg font-semibold text-neutral-700 mb-2">No resources in this category</h3>
                <p className="text-neutral-500 mb-4">Check back soon for new content.</p>
                <button
                  onClick={() => setActiveCategory('all')}
                  className="text-primary-600 font-medium hover:text-primary-700"
                >
                  View all resources →
                </button>
              </div>
            ) : filteredResources.map((resource, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-card-hover transition-shadow group"
              >
                {/* Preview Image Area */}
                <div className="aspect-[16/9] bg-neutral-100 flex items-center justify-center">
                  <svg className="w-12 h-12 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${typeColors[resource.type].bg} ${typeColors[resource.type].text}`}>
                      {resource.type}
                    </span>
                    <span className="text-xs text-neutral-500">{resource.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary-700 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                    {resource.description}
                  </p>
                  <span className="inline-flex items-center text-sm font-medium text-neutral-400">
                    <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Coming Soon
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-4">
            Stay Updated
          </h2>
          <p className="text-neutral-600 mb-8">
            Get the latest insights on AI agents, retail operations, and enterprise governance
            delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
            />
            <button
              type="submit"
              className="px-6 py-3 font-semibold text-white bg-gradient-cta rounded-xl shadow-button hover:shadow-button-hover hover:scale-[1.02] transition-all duration-200"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs text-neutral-500 mt-4">
            No spam. Unsubscribe at any time.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-purple relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to See AI Agents in Action?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Book a personalized demo to see how our agents can transform your retail operations.
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

export default Resources;
