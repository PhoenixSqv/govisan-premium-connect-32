import React from 'react';

const TrustedBrands = () => {
  const companies = [
    {
      name: 'Telefónica España',
      logo: 'TELEFÓNICA'
    },
    {
      name: 'Vodafone',
      logo: 'VODAFONE'
    },
    {
      name: 'Orange Business',
      logo: 'ORANGE'
    },
    {
      name: 'MásMóvil',
      logo: 'MÁSMÓVIL'
    },
    {
      name: 'Tata Communications',
      logo: 'TATA COMM'
    },
    {
      name: 'Bharti Airtel',
      logo: 'AIRTEL'
    }
  ];

  return (
    <section className="py-16 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Empresas que Confían en GOVISAN
          </h2>
          <p className="text-muted-foreground text-lg">
            Líderes en telecomunicaciones que eligen nuestras soluciones
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {companies.map((company, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 opacity-70 hover:opacity-100"
            >
              <div className="text-center">
                <div className="text-lg font-bold text-primary/80 tracking-wider">
                  {company.logo}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;