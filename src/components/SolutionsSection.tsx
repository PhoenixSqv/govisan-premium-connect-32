import React from 'react';
import { Button } from './ui/button';
import { Wifi, Smartphone, Shield, Settings, ArrowRight } from 'lucide-react';

const SolutionsSection = () => {
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const solutions = [
    {
      icon: Wifi,
      title: 'Strategic Consulting',
      description: 'Tailored telecom and IT solutions for luxury hospitality with expert guidance and strategic planning.',
      features: ['Premium Connectivity', 'Secure, fast, and reliable WiFi', 'Smart Rooms']
    },
    {
      icon: Smartphone,
      title: 'Project Engineering',
      description: 'End-to-end management, from concept to commissioning, ensuring flawless execution of every project.',
      features: ['Intelligent rooms blending comfort', 'Next-Gen Audiovisuals', 'Digital conference rooms & entertainment']
    },
    {
      icon: Shield,
      title: 'On-Site Supervision',
      description: 'Ensuring flawless quality during every installation with dedicated on-site technical supervision.',
      features: ['Advanced Security', 'CCTV, access control, protection systems', 'Payments & POS']
    },
    {
      icon: Settings,
      title: 'Smart Integration',
      description: 'Coordinating providers and systems for seamless results and unified technological solutions.',
      features: ['Reliable, frictionless payment solutions', 'Telco Coordination', 'Smooth integration with global providers']
    }
  ];

  return (
    <section id="solutions" className="section--wm wm--solutions py-20 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-govisan-gold/10 text-govisan-gold px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Settings className="h-4 w-4 mr-2" />
            Our Services
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            Integrated Technology Ecosystems
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            At GOVISAN Solutions, we design and execute integrated technology ecosystems that guarantee security, efficiency, and elegance in every detail.
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
          <Button 
            onClick={() => handleNavClick('#contact')}
            className="bg-govisan-gold hover:bg-govisan-gold/90 text-white font-semibold px-8 py-4 text-lg group"
          >
            See All Services
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;