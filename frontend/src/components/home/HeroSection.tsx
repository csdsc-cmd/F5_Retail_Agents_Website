
import { useTypewriter } from '../../hooks/useTypewriter';
import { LiveActivityFeed } from './LiveActivityFeed';
import { Cpu, Zap, TrendingUp, Shield, Users, BarChart3 } from 'lucide-react';

const heroHeadlines = [
  'AI Agents That Work While You Sleep',
  'AI Agents That Work While You Plan',
  'AI Agents That Work While You Grow',
];

const agentIcons = [
  { Icon: TrendingUp, label: 'Pricing', color: 'from-emerald-400 to-teal-500', active: true },
  { Icon: BarChart3, label: 'Inventory', color: 'from-blue-400 to-indigo-500', active: true },
  { Icon: Cpu, label: 'Store Ops', color: 'from-purple-400 to-pink-500', active: false },
  { Icon: Users, label: 'Customer', color: 'from-orange-400 to-red-500', active: true },
  { Icon: Shield, label: 'Loss Prevention', color: 'from-cyan-400 to-blue-500', active: false },
  { Icon: Zap, label: 'Executive', color: 'from-yellow-400 to-orange-500', active: true },
];

export function HeroSection() {
  const { displayText, isTyping } = useTypewriter(heroHeadlines, {
    speed: 80,
    deleteSpeed: 40,
    pause: 2500,
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background image overlay */}
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/stock/ai-network-abstract.jpg)' }}
      />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-2s' }} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Pre-headline badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm text-slate-300">6 Autonomous Agents Working Now</span>
          </div>

          {/* Main headline with typewriter */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 min-h-[1.2em]">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {displayText}
            </span>
            <span className={`inline-block w-1 h-[0.9em] ml-1 bg-blue-400 ${isTyping ? 'animate-pulse' : 'animate-blink'}`} />
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10">
            Deploy pre-built AI agents that autonomously optimize pricing, manage inventory, 
            prevent loss, and delight customers—all orchestrated on a unified retail intelligence platform.
          </p>

          {/* Agent icons with status indicators */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {agentIcons.map(({ Icon, label, color, active }) => (
              <div 
                key={label}
                className="relative group"
              >
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${color} bg-opacity-20 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:scale-110 hover:border-white/30`}>
                  <Icon className="w-8 h-8 text-white" />
                  {active && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                  )}
                </div>
                <span className="block mt-2 text-xs text-slate-400 group-hover:text-white transition-colors">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5">
              Start Free Trial
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Live Activity Feed */}
        <LiveActivityFeed />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent" />
    </section>
  );
}

export default HeroSection;