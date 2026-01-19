import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'bordered' | 'flat';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  onClick,
  hover = false
}) => {
  const baseClasses = 'rounded-2xl transition-all duration-300';

  const variantClasses = {
    default: 'bg-white shadow-card border border-neutral-100',
    elevated: 'bg-white shadow-card-hover',
    bordered: 'bg-white border-2 border-neutral-200 hover:border-primary-200',
    flat: 'bg-neutral-50'
  };

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6',
    xl: 'p-8'
  };

  const hoverClasses = hover || onClick
    ? 'hover:shadow-card-hover hover:-translate-y-1 cursor-pointer group'
    : '';
  
  const classes = [
    baseClasses,
    variantClasses[variant],
    paddingClasses[padding],
    hoverClasses,
    className
  ].filter(Boolean).join(' ');
  
  if (onClick) {
    return (
      <div className={classes} onClick={onClick} role="button" tabIndex={0}>
        {children}
      </div>
    );
  }
  
  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export { Card };
export default Card;