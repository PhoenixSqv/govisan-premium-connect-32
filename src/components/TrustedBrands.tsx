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
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Trusted by Leading Hospitality Brands
          </h2>
          <p className="text-muted-foreground">
            Partnering with world-class hotels and properties worldwide
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="bg-white/50 hover:bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 w-full h-20 flex items-center justify-center"
            >
              <span className="text-sm font-semibold text-muted-foreground text-center">
                {brand.logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default TrustedBrands;