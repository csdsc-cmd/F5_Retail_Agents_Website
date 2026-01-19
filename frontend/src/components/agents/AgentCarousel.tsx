import { useState, useEffect, useCallback } from 'react';
import { AgentAvatar, AgentType } from './AgentAvatar';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Agent {
  type: AgentType;
  name: string;
  personality: string;
  description: string;
  stats: {
    label: string;
    value: string;
  };
}

const agents: Agent[] = [
  {
    type: 'pricing',
    name: 'Pricing Agent',
    personality: '"I find the perfect price point while you sleep."',
    description: 'Analyzes competitor pricing, demand patterns, and inventory levels to optimize prices across your entire catalog in real-time.',
    stats: { label: 'SKUs optimized today', value: '2,847' }
  },
  {
    type: 'inventory',
    name: 'Inventory Agent',
    personality: '"I predict what you\'ll need before you need it."',
    description: 'Forecasts demand, prevents stockouts, and minimizes overstock using advanced ML models trained on your historical data.',
    stats: { label: 'Predictions made', value: '15,392' }
  },
  {
    type: 'store-ops',
    name: 'Store Ops Agent',
    personality: '"I keep your stores running like clockwork."',
    description: 'Manages scheduling, task allocation, and operational efficiency across all locations with intelligent automation.',
    stats: { label: 'Tasks automated', value: '1,203' }
  },
  {
    type: 'customer-service',
    name: 'Customer Service Agent',
    personality: '"I turn frustrated customers into loyal fans."',
    description: 'Handles inquiries, processes returns, and resolves issues 24/7 with empathetic, context-aware responses.',
    stats: { label: 'Tickets resolved', value: '4,521' }
  },
  {
    type: 'loss-prevention',
    name: 'Loss Prevention Agent',
    personality: '"I see patterns humans miss."',
    description: 'Detects anomalies, identifies shrinkage risks, and alerts teams to potential fraud before losses occur.',
    stats: { label: 'Anomalies flagged', value: '127' }
  },
  {
    type: 'executive',
    name: 'Executive Agent',
    personality: '"I turn your data into strategic insights."',
    description: 'Synthesizes information across all agents to deliver actionable intelligence for leadership decisions.',
    stats: { label: 'Reports generated', value: '89' }
  }
];

interface AgentCarouselProps {
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export function AgentCarousel({ 
  autoPlay = true, 
  autoPlayInterval = 5000 
}: AgentCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const goToNext = useCallback(() => {
    setDirection('right');
    setActiveIndex((prev) => (prev + 1) % agents.length);
  }, []);

  const goToPrev = useCallback(() => {
    setDirection('left');
    setActiveIndex((prev) => (prev - 1 + agents.length) % agents.length);
  }, []);

  const goToIndex = (index: number) => {
    setDirection(index > activeIndex ? 'right' : 'left');
    setActiveIndex(index);
  };

  useEffect(() => {
    if (!autoPlay || isPaused) return;
    
    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, isPaused, autoPlayInterval, goToNext]);

  const activeAgent = agents[activeIndex];

  return (
    <div 
      className="relative w-full max-w-4xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Card */}
      <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 overflow-hidden min-h-[400px]">
        {/* Background Glow */}
        <div 
          className="absolute inset-0 opacity-20 transition-all duration-700"
          style={{
            background: `radial-gradient(circle at 30% 50%, var(--agent-color, #3b82f6) 0%, transparent 50%)`
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          {/* Avatar Section */}
          <div 
            className={`flex-shrink-0 transform transition-all duration-500 ${
              direction === 'right' ? 'animate-slide-in-right' : 'animate-slide-in-left'
            }`}
            key={activeAgent.type}
          >
            <AgentAvatar
              agentType={activeAgent.type}
              size="xl"
              animated
              showStatus
            />
          </div>
          
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {activeAgent.name}
            </h3>
            
            <p className="text-lg md:text-xl text-blue-400 italic mb-4 font-medium">
              {activeAgent.personality}
            </p>
            
            <p className="text-slate-300 mb-6 leading-relaxed">
              {activeAgent.description}
            </p>
            
            {/* Live Stats */}
            <div className="inline-flex items-center gap-2 bg-slate-800/50 rounded-full px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-slate-400 text-sm">{activeAgent.stats.label}:</span>
              <span className="text-white font-semibold">{activeAgent.stats.value}</span>
            </div>
          </div>
        </div>
        
        {/* Navigation Arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Previous agent"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Next agent"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      
      {/* Mini Navigation */}
      <div className="flex justify-center gap-3 mt-6">
        {agents.map((agent, index) => (
          <button
            key={agent.type}
            onClick={() => goToIndex(index)}
            className={`transition-all duration-300 ${
              index === activeIndex 
                ? 'scale-110 ring-2 ring-blue-500 ring-offset-2 ring-offset-slate-950' 
                : 'opacity-60 hover:opacity-100'
            }`}
            aria-label={`Go to ${agent.name}`}
          >
            <AgentAvatar agentType={agent.type} size="sm" animated={index === activeIndex} />
          </button>
        ))}
      </div>
      
      {/* CSS for animations */}
      <style>{`
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.5s ease-out;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default AgentCarousel;