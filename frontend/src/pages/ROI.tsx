import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon, ChartBarIcon } from '../components/ui/Icons';

interface ROIInputs {
  stores: number;
  annualRevenue: number;
  inventoryExceptions: number;
  manualProcessingHours: number;
  stockoutRate: number;
}

interface ROIResults {
  laborSavings: number;
  stockoutReduction: number;
  marginProtection: number;
  totalAnnualValue: number;
  paybackMonths: number;
}

const calculateROI = (inputs: ROIInputs): ROIResults => {
  // Labor savings: hours * $50/hr avg * 52 weeks
  const laborSavings = inputs.manualProcessingHours * 50 * 52;

  // Stockout reduction: 35% improvement on current stockout losses
  // Assuming 2% of revenue lost to stockouts typically
  const stockoutReduction = inputs.annualRevenue * 0.02 * 0.35;

  // Margin protection: $24K per month average (from agent data)
  const marginProtection = 24000 * 12;

  const totalAnnualValue = laborSavings + stockoutReduction + marginProtection;

  // Assuming $150K annual platform cost
  const platformCost = 150000;
  const paybackMonths = Math.ceil((platformCost / totalAnnualValue) * 12);

  return {
    laborSavings,
    stockoutReduction,
    marginProtection,
    totalAnnualValue,
    paybackMonths: Math.min(paybackMonths, 12)
  };
};

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

export function ROI() {
  const [inputs, setInputs] = useState<ROIInputs>({
    stores: 50,
    annualRevenue: 100000000,
    inventoryExceptions: 500,
    manualProcessingHours: 40,
    stockoutRate: 3
  });

  const [showResults, setShowResults] = useState(false);
  const results = calculateROI(inputs);

  const handleInputChange = (field: keyof ROIInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    setShowResults(false);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-brand-subtle rounded-full blur-3xl opacity-60" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white shadow-soft border border-neutral-200 mb-6">
              <ChartBarIcon className="h-4 w-4 text-accent-500 mr-2" />
              <span className="text-sm font-medium text-neutral-700">
                ROI Calculator
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-6">
              Calculate Your{' '}
              <span className="bg-gradient-brand bg-clip-text text-transparent">
                Return on Investment
              </span>
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed">
              See the potential value of AI-powered retail operations for your business.
              Most retailers see ROI within 30 days.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Form */}
            <div className="bg-white rounded-2xl shadow-card border border-neutral-200 p-8">
              <h2 className="text-xl font-bold text-neutral-900 mb-6">Your Business Details</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Number of Stores
                  </label>
                  <input
                    type="number"
                    value={inputs.stores}
                    onChange={(e) => handleInputChange('stores', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Annual Revenue (USD)
                  </label>
                  <input
                    type="number"
                    value={inputs.annualRevenue}
                    onChange={(e) => handleInputChange('annualRevenue', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                  />
                  <p className="text-xs text-neutral-500 mt-1">{formatCurrency(inputs.annualRevenue)}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Weekly Inventory Exceptions
                  </label>
                  <input
                    type="number"
                    value={inputs.inventoryExceptions}
                    onChange={(e) => handleInputChange('inventoryExceptions', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Weekly Hours on Manual Processing
                  </label>
                  <input
                    type="number"
                    value={inputs.manualProcessingHours}
                    onChange={(e) => handleInputChange('manualProcessingHours', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Current Stockout Rate (%)
                  </label>
                  <input
                    type="number"
                    value={inputs.stockoutRate}
                    onChange={(e) => handleInputChange('stockoutRate', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                    step="0.1"
                  />
                </div>

                <button
                  onClick={() => setShowResults(true)}
                  className="w-full inline-flex items-center justify-center px-6 py-4 text-lg font-semibold text-white bg-gradient-cta rounded-xl shadow-button hover:shadow-button-hover hover:scale-[1.01] transition-all duration-200"
                >
                  Calculate My ROI
                  <ChevronRightIcon className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Results */}
            <div className={`bg-gradient-purple rounded-2xl p-8 text-white ${showResults ? 'opacity-100' : 'opacity-70'} transition-opacity`}>
              <h2 className="text-xl font-bold mb-6">Your Estimated ROI</h2>

              <div className="space-y-6">
                <div className="bg-white/10 rounded-xl p-6">
                  <div className="text-4xl lg:text-5xl font-bold text-accent-400 mb-2">
                    {formatCurrency(results.totalAnnualValue)}
                  </div>
                  <div className="text-white/80">Annual Value Created</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-2xl font-bold text-white mb-1">
                      {results.paybackMonths}
                    </div>
                    <div className="text-sm text-white/70">Months to Payback</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-2xl font-bold text-white mb-1">
                      {Math.round((results.totalAnnualValue / 150000) * 100)}%
                    </div>
                    <div className="text-sm text-white/70">First Year ROI</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-white/80 uppercase tracking-wider">Value Breakdown</h3>

                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/80">Labor Savings</span>
                    <span className="font-semibold">{formatCurrency(results.laborSavings)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/80">Stockout Reduction</span>
                    <span className="font-semibold">{formatCurrency(results.stockoutReduction)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/80">Margin Protection</span>
                    <span className="font-semibold">{formatCurrency(results.marginProtection)}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    to="/demo"
                    className="w-full inline-flex items-center justify-center px-6 py-4 text-lg font-semibold text-primary-800 bg-white rounded-xl hover:bg-neutral-100 transition-all duration-200"
                  >
                    Get a Detailed Assessment
                    <ChevronRightIcon className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">How We Calculate ROI</h2>
            <p className="text-neutral-600">Our estimates are based on results from actual retail deployments.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Labor Savings',
                description: 'Reduced manual processing time for inventory, pricing, and operational exceptions.',
                metric: '60%',
                metricLabel: 'time reduction'
              },
              {
                title: 'Stockout Reduction',
                description: 'Proactive inventory management reduces lost sales from out-of-stock items.',
                metric: '35%',
                metricLabel: 'stockout improvement'
              },
              {
                title: 'Margin Protection',
                description: 'Real-time pricing and promotion monitoring prevents margin erosion.',
                metric: '$24K',
                metricLabel: 'avg monthly savings'
              }
            ].map((item, index) => (
              <div key={index} className="bg-neutral-50 rounded-xl p-6 border border-neutral-100">
                <div className="text-2xl font-bold bg-gradient-brand bg-clip-text text-transparent mb-1">
                  {item.metric}
                </div>
                <div className="text-xs text-neutral-500 mb-3">{item.metricLabel}</div>
                <h3 className="font-semibold text-neutral-900 mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ROI;
