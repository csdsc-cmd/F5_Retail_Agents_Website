// Platform Benefits with comparison slider
import { ComparisonSlider } from '../ui/ComparisonSlider';
import { 
  Clock, 
  DollarSign, 
  Users, 
  Puzzle, 
  Zap, 
  CheckCircle,
  XCircle,
  ArrowRight
} from 'lucide-react';

const beforeItems = [
  { icon: Clock, text: '12-18 months to deploy', negative: true },
  { icon: DollarSign, text: '$2M+ development cost', negative: true },
  { icon: Users, text: 'Large engineering team required', negative: true },
  { icon: Puzzle, text: 'Complex integrations', negative: true },
];

const afterItems = [
  { icon: Zap, text: 'Deploy in weeks', positive: true },
  { icon: DollarSign, text: 'Predictable subscription pricing', positive: true },
  { icon: Users, text: 'No AI expertise needed', positive: true },
  { icon: Puzzle, text: 'Pre-built retail integrations', positive: true },
];

function BeforeContent() {
  return (
    <div className="h-full bg-gradient-to-br from-red-950 to-slate-900 p-8 flex flex-col justify-center">
      <div className="mb-6">
        <span className="text-red-400 text-sm font-medium uppercase tracking-wider">The Old Way</span>
        <h3 className="text-2xl font-bold text-white mt-2">Building Custom AI</h3>
      </div>
      <ul className="space-y-4">
        {beforeItems.map(({ text }) => (
          <li key={text} className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-500/20">
              <XCircle className="w-5 h-5 text-red-400" />
            </div>
            <span className="text-slate-300">{text}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
        <p className="text-red-300 text-sm">
          High risk, uncertain outcomes, and massive resource drain
        </p>
      </div>
    </div>
  );
}

function AfterContent() {
  return (
    <div className="h-full bg-gradient-to-br from-emerald-950 to-slate-900 p-8 flex flex-col justify-center">
      <div className="mb-6">
        <span className="text-emerald-400 text-sm font-medium uppercase tracking-wider">The Fusion5 Way</span>
        <h3 className="text-2xl font-bold text-white mt-2">Pre-Built AI Agents</h3>
      </div>
      <ul className="space-y-4">
        {afterItems.map(({ text }) => (
          <li key={text} className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/20">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-slate-300">{text}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
        <p className="text-emerald-300 text-sm">
          Proven results, faster time-to-value, and continuous improvements
        </p>
      </div>
    </div>
  );
}

export function PlatformBenefits() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-purple-500/10 text-purple-400 text-sm font-medium rounded-full mb-4">
            Why Fusion5
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Stop Building.{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Start Deploying.
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Drag the slider to see the difference between building custom AI solutions 
            and using Fusion5's pre-built agent platform.
          </p>
        </div>

        {/* Comparison slider */}
        <div className="max-w-4xl mx-auto">
          <ComparisonSlider
            beforeContent={<BeforeContent />}
            afterContent={<AfterContent />}
            initialPosition={50}
          />
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl border border-white/20 transition-all duration-300 group">
            See Full Platform Comparison
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default PlatformBenefits;