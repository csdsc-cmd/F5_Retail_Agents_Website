import React from 'react';
import { Card } from './Card';

export interface Feature {
  icon?: React.ReactNode;
  title: string;
  description: string;
  benefits?: string[];
}

interface FeatureGridProps {
  features: Feature[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function FeatureGrid({ 
  features, 
  columns = 3, 
  className = '' 
}: FeatureGridProps) {
  const gridCols = {
    2: 'grid-cols-1 lg:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <div className={`grid gap-6 ${gridCols[columns]} ${className}`}>
      {features.map((feature, index) => (
        <Card key={index} className="h-full">
          {feature.icon && (
            <div className="mb-4 text-fusion-primary">
              {feature.icon}
            </div>
          )}
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {feature.title}
          </h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            {feature.description}
          </p>
          {feature.benefits && (
            <ul className="space-y-1">
              {feature.benefits.map((benefit, benefitIndex) => (
                <li key={benefitIndex} className="text-sm text-gray-500 flex items-start">
                  <span className="text-fusion-accent mr-2 mt-1">•</span>
                  {benefit}
                </li>
              ))}
            </ul>
          )}
        </Card>
      ))}
    </div>
  );
}