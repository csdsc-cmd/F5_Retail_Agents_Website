import React from 'react';
import { LinkButton } from './Button';

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryCTA?: {
    text: string;
    to: string;
    external?: boolean;
  };
  secondaryCTA?: {
    text: string;
    to: string;
    external?: boolean;
  };
  backgroundImage?: string;
  variant?: 'default' | 'centered' | 'split';
  children?: React.ReactNode;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
  variant = 'default',
  children
}) => {
  const baseClasses = 'relative overflow-hidden';
  const variantClasses = {
    default: 'bg-gradient-to-r from-primary-700 to-primary-900 text-white',
    centered: 'bg-white text-gray-900 text-center',
    split: 'bg-white text-gray-900'
  };
  
  const containerClasses = variant === 'centered' 
    ? 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20'
    : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24';
  
  return (
    <section className={`${baseClasses} ${variantClasses[variant]}`}>
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      
      <div className={containerClasses}>
        <div className={variant === 'split' ? 'grid grid-cols-1 lg:grid-cols-2 gap-12 items-center' : ''}>
          <div className={variant === 'split' ? '' : variant === 'centered' ? 'text-center' : 'max-w-3xl'}>
            {subtitle && (
              <p className={`text-sm font-medium uppercase tracking-wide mb-4 ${
                variant === 'default' ? 'text-primary-200' : 'text-primary-600'
              }`}>
                {subtitle}
              </p>
            )}
            
            <h1 className={`font-bold tracking-tight mb-6 ${
              variant === 'centered' 
                ? 'text-4xl sm:text-5xl lg:text-6xl' 
                : 'text-4xl sm:text-5xl lg:text-6xl'
            }`}>
              {title}
            </h1>
            
            {description && (
              <p className={`text-lg leading-relaxed mb-8 ${
                variant === 'default' ? 'text-primary-100' : 'text-gray-600'
              }`}>
                {description}
              </p>
            )}
            
            {(primaryCTA || secondaryCTA) && (
              <div className="flex flex-col sm:flex-row gap-4">
                {primaryCTA && (
                  <LinkButton 
                    to={primaryCTA.to} 
                    external={primaryCTA.external}
                    size="lg"
                    variant={variant === 'default' ? 'secondary' : 'primary'}
                  >
                    {primaryCTA.text}
                  </LinkButton>
                )}
                {secondaryCTA && (
                  <LinkButton 
                    to={secondaryCTA.to} 
                    external={secondaryCTA.external}
                    size="lg"
                    variant="ghost"
                  >
                    {secondaryCTA.text}
                  </LinkButton>
                )}
              </div>
            )}
          </div>
          
          {variant === 'split' && children && (
            <div className="lg:pl-8">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export { Hero };
export default Hero;