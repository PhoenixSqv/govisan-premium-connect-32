import React from 'react';
const TrustedBrands = () => {
  const brands = [{
    name: 'ASG Iberia',
    logo: 'ASG IBERIA'
  }, {
    name: 'Six Senses',
    logo: 'SIX SENSES'
  }, {
    name: 'Bovis',
    logo: 'BOVIS'
  }, {
    name: 'Mandarin Oriental',
    logo: 'MANDARIN ORIENTAL'
  }, {
    name: 'Hard Rock',
    logo: 'HARD ROCK'
  }, {
    name: 'KKH Property Investors',
    logo: 'KKH PROPERTY'
  }];

  return (
    <section className="py-12 bg-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Trusted by Industry Leaders
          </p>
        </div>
        
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll">
            {/* First set of brands */}
            {brands.map((brand, index) => (
              <div 
                key={`first-${index}`}
                className="flex-shrink-0 mx-8 flex items-center justify-center h-16 w-40"
              >
                <div className="text-lg font-bold text-muted-foreground/60 hover:text-govisan-gold transition-colors duration-300">
                  {brand.logo}
                </div>
              </div>
            ))}
            {/* Duplicate set for seamless scrolling */}
            {brands.map((brand, index) => (
              <div 
                key={`second-${index}`}
                className="flex-shrink-0 mx-8 flex items-center justify-center h-16 w-40"
              >
                <div className="text-lg font-bold text-muted-foreground/60 hover:text-govisan-gold transition-colors duration-300">
                  {brand.logo}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default TrustedBrands;