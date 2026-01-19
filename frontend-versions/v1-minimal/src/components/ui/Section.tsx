import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  variant?: 'default' | 'gray' | 'dark' | 'primary';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  containerWidth?: 'full' | 'container' | 'narrow';
  title?: string;
  subtitle?: string;
}

const Section: React.FC<SectionProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  containerWidth = 'container',
  title,
  subtitle
}) => {
  const variantClasses = {
    default: 'bg-white',
    gray: 'bg-gray-50',
    dark: 'bg-gray-900 text-white',
    primary: 'bg-primary-50'
  };
  
  const sizeClasses = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-20'
  };
  
  const containerClasses = {
    full: 'w-full',
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    narrow: 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'
  };
  
  const sectionClasses = [
    variantClasses[variant],
    sizeClasses[size],
    className
  ].filter(Boolean).join(' ');
  
  return (
    <section className={sectionClasses}>
      <div className={containerClasses[containerWidth]}>
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
            )}
            {subtitle && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export { Section };
export default Section;