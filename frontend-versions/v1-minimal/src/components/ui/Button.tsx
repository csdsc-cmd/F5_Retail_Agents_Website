import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonBaseProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

interface ButtonProps extends ButtonBaseProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
}

interface LinkButtonProps extends ButtonBaseProps {
  to: string;
  external?: boolean;
}

const getButtonClasses = (
  variant: ButtonBaseProps['variant'] = 'primary',
  size: ButtonBaseProps['size'] = 'md',
  fullWidth: boolean = false,
  disabled: boolean = false,
  className: string = ''
): string => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    // Primary uses Fusion5 orange gradient CTA
    primary: 'bg-gradient-cta hover:shadow-button-hover hover:scale-[1.02] text-white focus:ring-accent-500 shadow-button',
    // Secondary uses Fusion5 purple gradient
    secondary: 'bg-gradient-purple hover:shadow-button-hover hover:scale-[1.02] text-white focus:ring-primary-500 shadow-button',
    ghost: 'bg-transparent hover:bg-neutral-100 text-neutral-700 focus:ring-neutral-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-button',
    outline: 'bg-transparent border-2 border-neutral-300 text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50 focus:ring-neutral-500'
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return [
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    widthClass,
    disabledClass,
    className
  ].filter(Boolean).join(' ');
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  className = '',
  onClick,
  type = 'button',
  href
}) => {
  const buttonClasses = getButtonClasses(variant, size, fullWidth, disabled, className);

  if (href) {
    return (
      <Link to={href} className={buttonClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  to,
  external = false,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = ''
}) => {
  const buttonClasses = getButtonClasses(variant, size, fullWidth, false, className);
  
  if (external) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses}
      >
        {children}
      </a>
    );
  }
  
  return (
    <Link to={to} className={buttonClasses}>
      {children}
    </Link>
  );
};

export default Button;