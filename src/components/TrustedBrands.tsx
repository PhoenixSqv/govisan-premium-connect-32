import React from 'react';

const TrustedBrands = () => {
  const brands = [
    { name: 'Hilton', logo: 'HILTON' },
    { name: 'Marriott', logo: 'MARRIOTT' },
    { name: 'Mandarin Oriental', logo: 'MANDARIN' },
    { name: 'Six Senses', logo: 'SIX SENSES' },
    { name: 'Fairmont', logo: 'FAIRMONT' },
    { name: 'Hard Rock', logo: 'HARD ROCK' },
  ];

  return (
    <section className="py-16 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Trusted by iconic hospitality brands: Mandarin Oriental, Six Senses, Fairmont, Hilton, Marriott, Hard Rock Hotels
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {brands.map((brand, index) => (
            <div
              key={brand.name}
              className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-lg font-semibold text-muted-foreground hover:text-govisan-navy transition-colors duration-300">
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