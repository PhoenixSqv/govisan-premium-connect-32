import React from 'react';
import { Award, Wifi, Settings, Monitor } from 'lucide-react';

const DetailedServices = () => {
  const services = [
    {
      icon: Award,
      title: "Wiredscore Certifications & Technologies",
      description: "We design and implement cutting-edge technologies for hospitality and real estate projects, delivering solutions aligned with international standards and Wiredscore certifications.",
      features: [
        "Wiredscore certification process",
        "International standards compliance", 
        "Cutting-edge technology implementation",
        "Real estate project optimization"
      ]
    },
    {
      icon: Wifi,
      title: "Network Infrastructure", 
      description: "Robust telecommunications and connectivity solutions designed for high-demand hospitality environments.",
      features: [
        "High-speed fiber optic networks",
        "Redundant connectivity systems",
        "Guest WiFi and enterprise networks",
        "Network security and monitoring"
      ]
    },
    {
      icon: Monitor,
      title: "Audiovisual Systems",
      description: "State-of-the-art AV solutions for meeting rooms, restaurants, and entertainment spaces.",
      features: [
        "Conference room AV systems",
        "Digital signage solutions", 
        "Restaurant entertainment systems",
        "Outdoor display installations"
      ]
    },
    {
      icon: Settings,
      title: "Smart Building Integration",
      description: "Integrated building management systems that optimize operations and enhance guest comfort.",
      features: [
        "HVAC control and monitoring",
        "Lighting automation systems",
        "Energy management solutions",
        "Environmental monitoring"
      ]
    }
  ];

  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.title}
                className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-16 h-16 bg-govisan-gold/10 rounded-2xl flex items-center justify-center mb-6">
                  <IconComponent className="h-8 w-8 text-govisan-gold" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-4 leading-tight">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-govisan-gold rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DetailedServices;