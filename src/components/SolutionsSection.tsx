import React from 'react';
import { Button } from './ui/button';
import { Wifi, Smartphone, Shield, Settings, ArrowRight } from 'lucide-react';

const SolutionsSection = () => {
  const solutions = [
    {
      icon: Wifi,
      title: 'Smart Connectivity for Hotels',
      description: 'High-speed wireless networks designed specifically for luxury hospitality environments.',
      features: ['Enterprise-grade WiFi 6E', 'Guest network isolation', 'Bandwidth management']
    },
    {
      icon: Smartphone,
      title: 'IoT & Guest Experience',
      description: 'Connected room automation and smart guest services for the ultimate luxury experience.',
      features: ['Smart room controls', 'Mobile app integration', 'Personalized services']
    },
    {
      icon: Shield,
      title: 'Secure High-Capacity Networks',
      description: 'Military-grade security infrastructure protecting guest data and hotel operations.',
      features: ['Advanced encryption', '24/7 monitoring', 'Compliance standards']
    },
    {
      icon: Settings,
      title: 'Systems Integration',
      description: 'Seamless integration of telecommunications with existing hotel management systems.',
      features: ['PMS integration', 'Unified communications', 'Legacy system support']
    }
  ];

  return (
    <section id="solutions" className="py-20 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-govisan-gold/10 text-govisan-gold px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Settings className="h-4 w-4 mr-2" />
            Our Solutions
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            Solutions for{' '}
            <span className="text-govisan-navy">Hospitality</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive telecommunications solutions tailored for the unique 
            needs of luxury hotels and resorts worldwide.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {solutions.map((solution, index) => (
            <div
              key={solution.title}
              className="group bg-white rounded-2xl p-8 shadow-premium hover:shadow-gold transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-govisan-gold/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-govisan-gold/20 transition-colors">
                <solution.icon className="h-8 w-8 text-govisan-gold" />
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-govisan-navy transition-colors">
                {solution.title}
              </h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {solution.description}
              </p>
              
              <ul className="space-y-2 text-sm text-muted-foreground">
                {solution.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-govisan-gold rounded-full mr-3 flex-shrink-0"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="premium" size="lg" className="text-lg px-8 py-4 h-auto">
            See All Solutions
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;