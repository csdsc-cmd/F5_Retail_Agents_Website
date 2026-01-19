export interface Agent {
  id: string;
  name: string;
  shortName: string;
  description: string;
  route: string;
  icon: string;
  benefits: string[];
  useCases: string[];
  uniqueSellingPoints: string[];
  heroImage?: string;
  category: 'operations' | 'analytics' | 'customer' | 'finance';
}

export const agents: Agent[] = [
  {
    id: 'inventory',
    name: 'Inventory Intelligence Agent',
    shortName: 'Inventory Intelligence',
    description: 'Automates detection, analysis, and handling of inventory exceptions across stores and channels with human approval workflows.',
    route: '/agents/inventory',
    icon: 'inventory',
    category: 'operations',
    benefits: [
      'Reduces stockouts and overstock situations by 35%',
      'Cuts manual exception handling time by 60%',
      'Improves inventory turns and cash flow',
      'Provides real-time visibility across all channels'
    ],
    useCases: [
      'Automated stockout detection and supplier notifications',
      'Overstock analysis with clearance recommendations',
      'Cross-channel inventory balancing',
      'Seasonal demand pattern analysis'
    ],
    uniqueSellingPoints: [
      'Exception-first logic focuses on what needs attention',
      'Human approval built-in for all automated actions',
      'Native D365 Supply Chain integration',
      'Real-time inventory reconciliation across channels'
    ]
  },
  {
    id: 'pricing',
    name: 'Pricing & Promotions Intelligence Agent',
    shortName: 'Pricing Intelligence',
    description: 'Monitors promotion and pricing performance, explains margin impact, and flags corrective actions with governance controls.',
    route: '/agents/pricing',
    icon: 'pricing',
    category: 'finance',
    benefits: [
      'Protects margin during promotions',
      'Reduces post-hoc pricing analysis by 70%',
      'Improves pricing discipline and consistency',
      'Identifies profitable pricing opportunities'
    ],
    useCases: [
      'Real-time promotion performance monitoring',
      'Competitive pricing analysis and alerts',
      'Margin impact explanation and forecasting',
      'Pricing exception detection and resolution'
    ],
    uniqueSellingPoints: [
      'Explains why margin moved, not just that it did',
      'Aligns Commerce and Finance data seamlessly',
      'Human-in-the-loop guardrails prevent errors',
      'Built for D365 Commerce pricing workflows'
    ]
  },
  {
    id: 'store-operations',
    name: 'Store Operations Agent',
    shortName: 'Store Operations',
    description: 'Automates store task execution monitoring and exception escalation to ensure consistent operational standards.',
    route: '/agents/store-operations',
    icon: 'store',
    category: 'operations',
    benefits: [
      'Improves execution consistency across stores',
      'Reduces head office follow-up calls by 50%',
      'Increases compliance and audit readiness',
      'Streamlines store communication'
    ],
    useCases: [
      'Daily task completion monitoring',
      'Visual merchandising compliance checks',
      'Staff scheduling optimization',
      'Store maintenance and safety tracking'
    ],
    uniqueSellingPoints: [
      'Exception-driven oversight reduces noise',
      'Native D365 Commerce integration',
      'Smart escalation based on severity',
      'Store manager dashboard with clear priorities'
    ]
  },
  {
    id: 'customer-service',
    name: 'Customer Service & Returns Agent',
    shortName: 'Customer Service',
    description: 'Handles repetitive retail enquiries and intelligently triages returns before human involvement.',
    route: '/agents/customer-service',
    icon: 'customer',
    category: 'customer',
    benefits: [
      'Reduces service team workload by 40%',
      'Speeds resolution for common issues',
      'Improves response consistency',
      'Increases customer satisfaction scores'
    ],
    useCases: [
      'Order status and tracking inquiries',
      'Return policy explanation and processing',
      'Product information and availability',
      'Basic troubleshooting and support'
    ],
    uniqueSellingPoints: [
      'Policy-aware decision making',
      'Safe escalation to human agents',
      'Native D365 Customer Service integration',
      'Learns from interaction patterns'
    ]
  },
  {
    id: 'loss-prevention',
    name: 'Loss Prevention Intelligence Agent',
    shortName: 'Loss Prevention',
    description: 'Identifies anomalous inventory and financial patterns that may indicate shrinkage or fraud.',
    route: '/agents/loss-prevention',
    icon: 'security',
    category: 'analytics',
    benefits: [
      'Earlier detection of shrinkage patterns',
      'Focused investigations reduce costs',
      'Reduced need for blanket audits',
      'Improved loss prevention ROI'
    ],
    useCases: [
      'Shrinkage pattern analysis across locations',
      'Transaction anomaly detection',
      'Vendor and supplier fraud monitoring',
      'Employee behavior pattern analysis'
    ],
    uniqueSellingPoints: [
      'Combines Commerce and Finance signals',
      'Explains anomaly reasoning clearly',
      'Supports formal audit workflows',
      'Maintains evidence chain for investigations'
    ]
  },
  {
    id: 'executive-insights',
    name: 'Executive Insights Agent',
    shortName: 'Executive Insights',
    description: 'Answers executive questions about retail performance with context, drivers, and recommended actions.',
    route: '/agents/executive-insights',
    icon: 'insights',
    category: 'analytics',
    benefits: [
      'Reduces dependency on analysts by 60%',
      'Enables faster strategic decisions',
      'Creates shared operational understanding',
      'Provides context with every metric'
    ],
    useCases: [
      'Performance deep-dives with explanations',
      'Cross-functional impact analysis',
      'Strategic initiative tracking',
      'Board reporting preparation'
    ],
    uniqueSellingPoints: [
      'Explains drivers, not just metrics',
      'Cross-D365 reasoning and analysis',
      'Designed for leadership decision making',
      'Translates operational data to business impact'
    ]
  }
];

export function getAgentById(id: string): Agent | undefined {
  return agents.find(agent => agent.id === id);
}

export function getAgentsByCategory(category: Agent['category']): Agent[] {
  return agents.filter(agent => agent.category === category);
}