
import { AgentCarousel } from '../agents/AgentCarousel';

export function AgentsOverview() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-blue-500/10 text-blue-400 text-sm font-medium rounded-full mb-4">
            Meet Your AI Workforce
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Six Specialized Agents,{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              One Unified Platform
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Each agent is purpose-built for specific retail challenges, working together 
            to drive unprecedented operational excellence.
          </p>
        </div>

        {/* Live stats bar */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {[
            { label: 'Tasks Completed Today', value: '2,847' },
            { label: 'Decisions Made', value: '12,394' },
            { label: 'Revenue Optimized', value: '$1.2M' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Agent Carousel */}
        <AgentCarousel />

        {/* Connection visualization */}
        <div className="relative mt-16 hidden md:block">
          <svg className="w-full h-32" viewBox="0 0 1200 120" preserveAspectRatio="none">
            {/* Animated connection lines */}
            <path
              d="M100,60 Q300,20 500,60 T900,60 T1100,60"
              fill="none"
              stroke="url(#gradient1)"
              strokeWidth="2"
              strokeDasharray="8 4"
              className="animate-draw-line"
            />
            <path
              d="M200,80 Q400,100 600,80 T1000,80"
              fill="none"
              stroke="url(#gradient2)"
              strokeWidth="2"
              strokeDasharray="8 4"
              className="animate-draw-line"
              style={{ animationDelay: '0.5s' }}
            />
            {/* Gradient definitions */}
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#EC4899" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
          <p className="text-center text-sm text-slate-500 mt-4">
            Agents communicate and coordinate in real-time to optimize your entire operation
          </p>
        </div>
      </div>
    </section>
  );
}

export default AgentsOverview;