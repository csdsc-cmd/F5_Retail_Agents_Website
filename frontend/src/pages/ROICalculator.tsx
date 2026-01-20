import { useState, useMemo } from 'react';

export default function ROICalculator() {
  const [inputs, setInputs] = useState({
    annualRevenue: 10000000,
    numberOfStores: 5,
    skuCount: 5000,
    avgTransactionValue: 50,
    currentMargin: 35
  });

  const handleChange = (field: string, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const results = useMemo(() => {
    const { annualRevenue, numberOfStores } = inputs;
    
    // Simplified ROI calculations
    const pricingOptimization = annualRevenue * 0.02; // 2% revenue increase
    const inventoryReduction = (annualRevenue * 0.15) * 0.15; // 15% less holding cost
    const laborSavings = numberOfStores * 15000; // $15k per store
    const markdownReduction = (annualRevenue * 0.1) * 0.3; // 30% less markdowns
    const customerRetention = annualRevenue * 0.015; // 1.5% from loyalty

    const totalAnnualBenefit = pricingOptimization + inventoryReduction + laborSavings + markdownReduction + customerRetention;
    const platformCost = 50000 + (numberOfStores * 5000); // Base + per store
    const netBenefit = totalAnnualBenefit - platformCost;
    const roi = ((netBenefit / platformCost) * 100);

    return {
      pricingOptimization,
      inventoryReduction,
      laborSavings,
      markdownReduction,
      customerRetention,
      totalAnnualBenefit,
      platformCost,
      netBenefit,
      roi
    };
  }, [inputs]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="min-h-screen py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">ROI Calculator</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the potential return on investment from implementing Fusion5's AI-powered retail agents.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Business</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Revenue
                </label>
                <input
                  type="range"
                  min={1000000}
                  max={100000000}
                  step={1000000}
                  value={inputs.annualRevenue}
                  onChange={(e) => handleChange('annualRevenue', Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-right text-lg font-semibold text-blue-600 mt-1">
                  {formatCurrency(inputs.annualRevenue)}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Stores
                </label>
                <input
                  type="range"
                  min={1}
                  max={100}
                  value={inputs.numberOfStores}
                  onChange={(e) => handleChange('numberOfStores', Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-right text-lg font-semibold text-blue-600 mt-1">
                  {inputs.numberOfStores} stores
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of SKUs
                </label>
                <input
                  type="range"
                  min={100}
                  max={50000}
                  step={100}
                  value={inputs.skuCount}
                  onChange={(e) => handleChange('skuCount', Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-right text-lg font-semibold text-blue-600 mt-1">
                  {inputs.skuCount.toLocaleString()} SKUs
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Average Transaction Value
                </label>
                <input
                  type="range"
                  min={10}
                  max={500}
                  value={inputs.avgTransactionValue}
                  onChange={(e) => handleChange('avgTransactionValue', Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-right text-lg font-semibold text-blue-600 mt-1">
                  {formatCurrency(inputs.avgTransactionValue)}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Gross Margin %
                </label>
                <input
                  type="range"
                  min={10}
                  max={60}
                  value={inputs.currentMargin}
                  onChange={(e) => handleChange('currentMargin', Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-right text-lg font-semibold text-blue-600 mt-1">
                  {inputs.currentMargin}%
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Projected Benefits</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Pricing Optimization</span>
                <span className="font-semibold text-green-600">{formatCurrency(results.pricingOptimization)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Inventory Cost Reduction</span>
                <span className="font-semibold text-green-600">{formatCurrency(results.inventoryReduction)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Labor Savings</span>
                <span className="font-semibold text-green-600">{formatCurrency(results.laborSavings)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Markdown Reduction</span>
                <span className="font-semibold text-green-600">{formatCurrency(results.markdownReduction)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Customer Retention Boost</span>
                <span className="font-semibold text-green-600">{formatCurrency(results.customerRetention)}</span>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-700 font-medium">Total Annual Benefit</span>
                <span className="text-2xl font-bold text-blue-600">{formatCurrency(results.totalAnnualBenefit)}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-700 font-medium">Platform Investment</span>
                <span className="text-lg font-semibold text-gray-600">({formatCurrency(results.platformCost)})</span>
              </div>
              <hr className="border-blue-200 my-4" />
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-900 font-semibold">Net Annual Benefit</span>
                <span className="text-2xl font-bold text-green-600">{formatCurrency(results.netBenefit)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-900 font-semibold">ROI</span>
                <span className="text-3xl font-bold text-green-600">{results.roi.toFixed(0)}%</span>
              </div>
            </div>

            <a
              href="/demo"
              className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold text-lg mt-8 transition-colors"
            >
              Get Your Detailed Assessment
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}