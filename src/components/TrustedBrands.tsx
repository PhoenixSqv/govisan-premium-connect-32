import React from 'react';

const TrustedBrands = () => {
  const brands = [
    { name: 'Hilton', logo: 'HILTON' },
    { name: 'Marriott', logo: 'MARRIOTT' },
    { name: 'Hyatt', logo: 'HYATT' },
    { name: 'InterContinental', logo: 'IHG' },
    { name: 'Accor', logo: 'ACCOR' },
  ];

  return (
    <section className="py-16 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-muted-foreground text-lg">
            Trusted by Leading Hospitality Brands Worldwide
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center">
          {brands.map((brand, index) => (
            <div
              key={brand.name}
              className="group relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-2xl sm:text-3xl font-bold text-muted-foreground/60 group-hover:text-govisan-navy transition-premium cursor-pointer">
                {brand.logo}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;