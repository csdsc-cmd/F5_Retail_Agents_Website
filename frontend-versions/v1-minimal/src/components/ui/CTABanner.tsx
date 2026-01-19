import { Link } from 'react-router-dom';

interface CTABannerProps {
  title: string;
  description: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  variant?: 'default' | 'dark' | 'gradient';
  className?: string;
}

export function CTABanner({
  title,
  description,
  primaryCTA,
  secondaryCTA,
  variant = 'default',
  className = ''
}: CTABannerProps) {
  const variants = {
    default: 'bg-gray-50 text-gray-900',
    dark: 'bg-gray-900 text-white',
    gradient: 'bg-gradient-to-r from-fusion-primary to-fusion-accent text-white'
  };

  return (
    <section className={`py-16 ${variants[variant]} ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">
          {title}
        </h2>
        <p className={`text-xl mb-8 leading-relaxed ${
          variant === 'default' ? 'text-gray-600' : 'text-gray-200'
        }`}>
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to={primaryCTA.href}
            className={`inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-xl transition-all ${
              variant === 'default'
                ? 'bg-gradient-cta text-white hover:shadow-button-hover'
                : 'bg-white text-primary-800 hover:bg-neutral-100'
            }`}
          >
            {primaryCTA.text}
          </Link>
          {secondaryCTA && (
            <Link
              to={secondaryCTA.href}
              className={`inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-xl transition-all ${
                variant === 'default'
                  ? 'bg-white text-neutral-800 hover:bg-neutral-100'
                  : 'bg-white/10 text-white border border-white/30 hover:bg-white/20'
              }`}
            >
              {secondaryCTA.text}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}