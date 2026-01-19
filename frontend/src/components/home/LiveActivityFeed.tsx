// Live Activity Feed showing real-time agent actions
import { InfiniteMarquee } from '../ui/InfiniteMarquee';

interface Activity {
  id: string;
  emoji: string;
  agent: string;
  action: string;
  metric?: string;
}

const activities: Activity[] = [
  {
    id: '1',
    emoji: '💰',
    agent: 'Pricing Agent',
    action: 'optimized',
    metric: '2,847 SKUs',
  },
  {
    id: '2',
    emoji: '📦',
    agent: 'Inventory Agent',
    action: 'predicted restock for',
    metric: 'Store #42',
  },
  {
    id: '3',
    emoji: '💬',
    agent: 'Customer Service Agent',
    action: 'resolved',
    metric: '156 tickets',
  },
  {
    id: '4',
    emoji: '🔒',
    agent: 'Loss Prevention Agent',
    action: 'flagged',
    metric: '23 anomalies',
  },
  {
    id: '5',
    emoji: '📊',
    agent: 'Executive Agent',
    action: 'generated',
    metric: '12 reports',
  },
  {
    id: '6',
    emoji: '🏪',
    agent: 'Store Ops Agent',
    action: 'optimized staffing for',
    metric: '89 locations',
  },
  {
    id: '7',
    emoji: '⚡',
    agent: 'Pricing Agent',
    action: 'matched competitor prices on',
    metric: '412 items',
  },
  {
    id: '8',
    emoji: '📈',
    agent: 'Inventory Agent',
    action: 'reduced waste by',
    metric: '$45,000',
  },
];

interface ActivityCardProps {
  activity: Activity;
}

function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full whitespace-nowrap">
      <span className="text-lg" role="img" aria-label={activity.agent}>
        {activity.emoji}
      </span>
      <span className="text-sm text-white/90">
        <span className="font-medium text-white">{activity.agent}</span>
        {' '}{activity.action}{' '}
        {activity.metric && (
          <span className="font-semibold text-blue-400">{activity.metric}</span>
        )}
      </span>
      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
    </div>
  );
}

interface LiveActivityFeedProps {
  className?: string;
}

export function LiveActivityFeed({ className = '' }: LiveActivityFeedProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Status indicator */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        <span className="text-sm text-white/70 font-medium">Live Agent Activity</span>
      </div>
      
      {/* Marquee */}
      <InfiniteMarquee speed={40} pauseOnHover gap={16}>
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </InfiniteMarquee>
    </div>
  );
}

export default LiveActivityFeed;