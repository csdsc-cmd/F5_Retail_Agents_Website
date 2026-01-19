import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon, ShieldCheckIcon, ClockIcon, CogIcon } from '../components/ui/Icons';

const benefits = [
  {
    icon: ClockIcon,
    title: '30-minute session',
    description: 'Focused demo tailored to your specific retail challenges'
  },
  {
    icon: CogIcon,
    title: 'Live D365 integration',
    description: 'See real-time data flows with your existing systems'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Governance walkthrough',
    description: 'Understand human-in-the-loop controls and audit trails'
  }
];

export function Demo() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    role: '',
    employees: '',
    challenges: '',
    timeline: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Demo request:', formData);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-brand-subtle rounded-full blur-3xl opacity-60" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Content */}
            <div className="lg:sticky lg:top-32">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white shadow-soft border border-neutral-200 mb-6">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                <span className="text-sm font-medium text-neutral-700">
                  Usually respond within 24 hours
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-6">
                See the Platform{' '}
                <span className="bg-gradient-brand bg-clip-text text-transparent">
                  In Action
                </span>
              </h1>
              <p className="text-xl text-neutral-600 leading-relaxed mb-8">
                Book a personalized demo to see how our AI agents integrate with your
                D365 environment and deliver ROI in 30 days.
              </p>

              {/* Benefits */}
              <div className="space-y-4">
                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900">{benefit.title}</h3>
                        <p className="text-neutral-600 text-sm">{benefit.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Trust badges */}
              <div className="mt-8 pt-8 border-t border-neutral-200">
                <p className="text-sm text-neutral-500 mb-4">Trusted by retail leaders</p>
                <div className="flex items-center gap-6">
                  {['SOC 2', 'ISO 27001', 'Azure'].map((badge) => (
                    <div key={badge} className="px-3 py-1.5 bg-neutral-100 rounded text-xs font-medium text-neutral-600">
                      {badge}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Demo Form */}
            <div className="bg-white rounded-2xl shadow-card border border-neutral-200 p-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">Book Your Demo</h2>
              <p className="text-neutral-600 mb-6">Fill out the form and we'll be in touch shortly.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-neutral-700 mb-1">
                    Company *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-neutral-700 mb-1">
                    Your Role *
                  </label>
                  <select
                    id="role"
                    name="role"
                    required
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all bg-white"
                  >
                    <option value="">Select your role</option>
                    <option value="ceo">CEO / Managing Director</option>
                    <option value="cto">CTO / IT Director</option>
                    <option value="coo">COO / Operations Director</option>
                    <option value="cfo">CFO / Finance Director</option>
                    <option value="retail-ops">Retail Operations Manager</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="employees" className="block text-sm font-medium text-neutral-700 mb-1">
                    Company Size
                  </label>
                  <select
                    id="employees"
                    name="employees"
                    value={formData.employees}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all bg-white"
                  >
                    <option value="">Select company size</option>
                    <option value="50-200">50-200 employees</option>
                    <option value="200-500">200-500 employees</option>
                    <option value="500-1000">500-1,000 employees</option>
                    <option value="1000+">1,000+ employees</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="challenges" className="block text-sm font-medium text-neutral-700 mb-1">
                    What challenges are you looking to solve?
                  </label>
                  <textarea
                    id="challenges"
                    name="challenges"
                    rows={3}
                    value={formData.challenges}
                    onChange={handleChange}
                    placeholder="Tell us about your current pain points..."
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white bg-gradient-cta rounded-xl shadow-button hover:shadow-button-hover hover:scale-[1.01] transition-all duration-200"
                >
                  Request Demo
                  <ChevronRightIcon className="ml-2 h-5 w-5" />
                </button>

                <p className="text-xs text-neutral-500 text-center">
                  By submitting, you agree to our{' '}
                  <Link to="/privacy" className="text-primary-600 hover:underline">Privacy Policy</Link>.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Demo;
