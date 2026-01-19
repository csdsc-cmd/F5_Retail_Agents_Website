export function CustomerLogos() {
  // Professional placeholder logos representing D365 retail customer types
  // These will be replaced with actual customer logos when available
  const customerTypes = [
    { name: 'Fashion & Apparel', initial: 'F' },
    { name: 'Grocery & Food', initial: 'G' },
    { name: 'Home & Living', initial: 'H' },
    { name: 'Electronics', initial: 'E' },
    { name: 'Specialty Retail', initial: 'S' },
    { name: 'Multi-Channel', initial: 'M' }
  ];

  return (
    <section className="py-12 lg:py-16 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-neutral-500 mb-8">
          Trusted by D365 retailers across industries
        </p>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 lg:gap-8 items-center justify-items-center opacity-60">
          {customerTypes.map((customer, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-neutral-400"
              title={customer.name}
            >
              <div className="w-8 h-8 rounded bg-neutral-200 flex items-center justify-center">
                <span className="text-sm font-bold text-neutral-500">{customer.initial}</span>
              </div>
              <span className="text-xs font-medium hidden sm:block whitespace-nowrap">
                {customer.name}
              </span>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-neutral-400 mt-6">
          Customer logos available upon request
        </p>
      </div>
    </section>
  );
}

export default CustomerLogos;
