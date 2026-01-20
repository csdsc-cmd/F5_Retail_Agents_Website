import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

export function CustomerLogos() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });

  // Professional placeholder logos representing D365 retail customer types
  // These will be replaced with actual customer logos when available
  const customerTypes = [
    { name: 'Fashion & Apparel', initial: 'FA', color: 'bg-pink-100 text-pink-600' },
    { name: 'Grocery & Food', initial: 'GF', color: 'bg-green-100 text-green-600' },
    { name: 'Home & Living', initial: 'HL', color: 'bg-amber-100 text-amber-600' },
    { name: 'Electronics', initial: 'EL', color: 'bg-blue-100 text-blue-600' },
    { name: 'Specialty Retail', initial: 'SR', color: 'bg-purple-100 text-purple-600' },
    { name: 'Multi-Channel', initial: 'MC', color: 'bg-orange-100 text-orange-600' }
  ];

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-16 lg:py-20 bg-gradient-to-b from-white to-neutral-50 border-b border-neutral-100"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <p
          className={`text-center text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-10 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Trusted by D365 retailers across industries
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 lg:gap-10 items-center justify-items-center">
          {customerTypes.map((customer, index) => (
            <div
              key={index}
              className={`group flex flex-col items-center gap-3 transition-all duration-500 cursor-default ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: isVisible ? `${index * 80}ms` : '0ms' }}
              title={customer.name}
            >
              <div className={`w-16 h-16 rounded-2xl ${customer.color} flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300`}>
                <span className="text-lg font-bold">{customer.initial}</span>
              </div>
              <span className="text-xs font-medium text-neutral-500 text-center whitespace-nowrap group-hover:text-neutral-700 transition-colors">
                {customer.name}
              </span>
            </div>
          ))}
        </div>

        <div
          className={`flex items-center justify-center gap-4 mt-12 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-neutral-300" />
          <p className="text-xs text-neutral-400 font-medium">
            Customer logos available upon request
          </p>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-neutral-300" />
        </div>
      </div>
    </section>
  );
}

export default CustomerLogos;
