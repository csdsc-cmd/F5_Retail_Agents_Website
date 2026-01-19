

export type AgentType = 
  | 'pricing' 
  | 'inventory' 
  | 'store-ops' 
  | 'customer-service' 
  | 'loss-prevention' 
  | 'executive';

interface AgentAvatarProps {
  agentType: AgentType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  showStatus?: boolean;
  className?: string;
}

interface AgentConfig {
  name: string;
  icon: string;
  gradient: string;
  glowColor: string;
  personality: string;
  bgColor: string;
}

const agentConfigs: Record<AgentType, AgentConfig> = {
  pricing: {
    name: 'Pricing Agent',
    icon: '💰',
    gradient: 'from-emerald-400 to-teal-600',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    personality: 'I optimize your margins while you sleep',
    bgColor: 'bg-emerald-500/10',
  },
  inventory: {
    name: 'Inventory Agent',
    icon: '📦',
    gradient: 'from-blue-400 to-indigo-600',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    personality: 'I predict what you need before you do',
    bgColor: 'bg-blue-500/10',
  },
  'store-ops': {
    name: 'Store Ops Agent',
    icon: '🏪',
    gradient: 'from-orange-400 to-red-600',
    glowColor: 'rgba(249, 115, 22, 0.4)',
    personality: 'I keep your operations running smoothly',
    bgColor: 'bg-orange-500/10',
  },
  'customer-service': {
    name: 'Customer Service Agent',
    icon: '💬',
    gradient: 'from-purple-400 to-pink-600',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    personality: 'I turn complaints into compliments',
    bgColor: 'bg-purple-500/10',
  },
  'loss-prevention': {
    name: 'Loss Prevention Agent',
    icon: '🛡️',
    gradient: 'from-red-400 to-rose-600',
    glowColor: 'rgba(239, 68, 68, 0.4)',
    personality: 'I protect your profits 24/7',
    bgColor: 'bg-red-500/10',
  },
  executive: {
    name: 'Executive Agent',
    icon: '📊',
    gradient: 'from-slate-400 to-zinc-600',
    glowColor: 'rgba(100, 116, 139, 0.4)',
    personality: 'I deliver insights that drive decisions',
    bgColor: 'bg-slate-500/10',
  },
};

const sizeClasses = {
  sm: 'w-10 h-10 text-lg',
  md: 'w-14 h-14 text-2xl',
  lg: 'w-20 h-20 text-3xl',
  xl: 'w-28 h-28 text-4xl',
};

const statusSizeClasses = {
  sm: 'w-2.5 h-2.5',
  md: 'w-3 h-3',
  lg: 'w-4 h-4',
  xl: 'w-5 h-5',
};

export function AgentAvatar({
  agentType,
  size = 'md',
  animated = true,
  showStatus = true,
  className = '',
}: AgentAvatarProps) {
  const config = agentConfigs[agentType];

  return (
    <div className={`relative inline-flex ${className}`}>
      {/* Main avatar container */}
      <div
        className={`
          ${sizeClasses[size]}
          rounded-full
          bg-gradient-to-br ${config.gradient}
          flex items-center justify-center
          shadow-lg
          ${animated ? 'animate-pulse-subtle' : ''}
          transition-transform duration-300
          hover:scale-110
        `}
        style={{
          boxShadow: animated ? `0 0 20px ${config.glowColor}` : undefined,
        }}
      >
        <span role="img" aria-label={config.name}>
          {config.icon}
        </span>
      </div>

      {/* Status indicator */}
      {showStatus && (
        <span
          className={`
            absolute -bottom-0.5 -right-0.5
            ${statusSizeClasses[size]}
            bg-green-400
            rounded-full
            border-2 border-white dark:border-gray-900
            ${animated ? 'animate-pulse' : ''}
          `}
          title="Active"
        />
      )}
    </div>
  );
}

// Export config for use in other components
export function getAgentConfig(agentType: AgentType): AgentConfig {
  return agentConfigs[agentType];
}

export function getAllAgentTypes(): AgentType[] {
  return Object.keys(agentConfigs) as AgentType[];
}

export default AgentAvatar;