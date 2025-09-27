import React from 'react';
import { Link } from 'react-router-dom';

const TrustedBrands = () => {
  const brands = [
    { name: 'ASG Iberia', logo: 'ASG IBERIA' },
    { name: 'Six Senses', logo: 'SIX SENSES' },
    { name: 'Bovis', logo: 'BOVIS' },
    { name: 'Mandarin Oriental', logo: 'MANDARIN ORIENTAL' },
    { name: 'Hard Rock', logo: 'HARD ROCK' },
    { name: 'KKH Property Investors', logo: 'KKH PROPERTY' },
  ];

  // Map brand names to their corresponding IDs in success stories
  const brandToId: Record<string, string> = {
    'ASG Iberia': 'asg-iberia',
    'Six Senses': 'six-senses',
    'Bovis': 'bovis',
    'Mandarin Oriental': 'mandarin-oriental',
    'Hard Rock': 'hard-rock',
    'KKH Property Investors': 'kkh-property',
  };

  return (
    <section className="py-16 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Trusted by leading hospitality & real estate brands
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {brands.map((brand, index) => (
            <Link
              key={brand.name}
              to={`/success-stories#${brandToId[brand.name]}`}
              className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-lg font-semibold text-muted-foreground hover:text-primary transition-colors duration-300">
                {brand.logo}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;