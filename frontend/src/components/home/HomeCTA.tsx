import { useState } from 'react';
import { ParticleBackground } from '../effects/ParticleBackground';
import { VideoModal } from '../ui/VideoModal';
import { Play, ArrowRight, Users, Sparkles } from 'lucide-react';

export function HomeCTA() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Particle background */}
      <ParticleBackground
        particleCount={50}
        particleColor="#3B82F6"
        connectionDistance={150}
        speed={0.5}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-900/90" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-500/30 mb-8">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-sm text-blue-300">Limited Time: 30-Day Free Trial</span>
        </div>

        {/* Headline */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
          Ready to Transform{' '}
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Your Retail Operations?
          </span>
        </h2>

        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
          Join 150+ retail leaders who've deployed AI agents to optimize pricing, 
          inventory, and customer experiences.
        </p>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-slate-900 flex items-center justify-center"
              >
                <Users className="w-4 h-4 text-white" />
              </div>
            ))}
          </div>
          <span className="text-slate-400 text-sm ml-2">
            <span className="text-white font-semibold">150+</span> retail leaders trust Fusion5
          </span>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          {/* Primary CTA */}
          <button className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2">
            Start Free Trial
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          {/* Secondary CTA - Video */}
          <button 
            onClick={() => setIsVideoOpen(true)}
            className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Watch 2-Min Demo
          </button>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-6 text-slate-500 text-sm">
          <span>✓ No credit card required</span>
          <span>✓ Setup in under 5 minutes</span>
          <span>✓ Cancel anytime</span>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Fusion5 Platform Demo"
      />
    </section>
  );
}

export default HomeCTA;