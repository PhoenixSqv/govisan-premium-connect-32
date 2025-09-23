import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Wifi, Smartphone, Shield, Settings, Award, Star, Monitor } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface SolutionItem {
  icon: string;
  title: string;  
  description: string;
  features: string[];
}

interface SolutionsContent {
  title: string;
  description: string;
  wiredscore?: {
    title: string;
    description: string;
  };
  solutions: SolutionItem[];
}

const SolutionsSection = () => {
  const [content, setContent] = useState<SolutionsContent | null>(null);
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.1 });

  useEffect(() => {
    fetch('/content/solutions/main.json')
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(error => console.error('Error loading solutions content:', error));
  }, []);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      Wifi,
      Smartphone, 
      Shield,
      Settings,
      Award,
      Star
    };
    return iconMap[iconName] || Settings;
  };

  if (!content) {
    return <div>Loading...</div>;
  }

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
            {content.title}
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {content.description}
          </p>
        </div>


        {/* Solutions Grid */}
        <div 
          ref={gridRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-700 ${
            gridVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {content.solutions.map((solution, index) => {
            const IconComponent = getIcon(solution.icon);
            return (
              <div
                key={solution.title}
                className={`group bg-white rounded-2xl p-8 shadow-premium hover:shadow-gold hover-lift hover-glow transition-all duration-500 animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-govisan-gold/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-govisan-gold/20 transition-colors">
                  <IconComponent className="h-8 w-8 text-govisan-gold" />
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
            );
          })}
        </div>

        {/* Detailed Services Subsection */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Specialized Service Areas
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions designed for the unique demands of luxury hospitality
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-16 h-16 bg-govisan-gold/10 rounded-2xl flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-govisan-gold" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4 leading-tight">
                Wiredscore Certifications & Technologies
              </h3>
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                We design and implement cutting-edge technologies for hospitality and real estate projects, delivering solutions aligned with international standards and Wiredscore certifications.
              </p>
              <ul className="space-y-3">
                {["Wiredscore certification process", "International standards compliance", "Cutting-edge technology implementation", "Real estate project optimization"].map((feature, index) => (
                  <li key={index} className="flex items-start text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-govisan-gold rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-16 h-16 bg-govisan-gold/10 rounded-2xl flex items-center justify-center mb-6">
                <Wifi className="h-8 w-8 text-govisan-gold" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4 leading-tight">
                Network Infrastructure
              </h3>
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                Robust telecommunications and connectivity solutions designed for high-demand hospitality environments.
              </p>
              <ul className="space-y-3">
                {["High-speed fiber optic networks", "Redundant connectivity systems", "Guest WiFi and enterprise networks", "Network security and monitoring"].map((feature, index) => (
                  <li key={index} className="flex items-start text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-govisan-gold rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-16 h-16 bg-govisan-gold/10 rounded-2xl flex items-center justify-center mb-6">
                <Monitor className="h-8 w-8 text-govisan-gold" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4 leading-tight">
                Audiovisual Systems
              </h3>
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                State-of-the-art AV solutions for meeting rooms, restaurants, and entertainment spaces.
              </p>
              <ul className="space-y-3">
                {["Conference room AV systems", "Digital signage solutions", "Restaurant entertainment systems", "Outdoor display installations"].map((feature, index) => (
                  <li key={index} className="flex items-start text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-govisan-gold rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-16 h-16 bg-govisan-gold/10 rounded-2xl flex items-center justify-center mb-6">
                <Settings className="h-8 w-8 text-govisan-gold" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4 leading-tight">
                Smart Building Integration
              </h3>
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                Integrated building management systems that optimize operations and enhance guest comfort.
              </p>
              <ul className="space-y-3">
                {["HVAC control and monitoring", "Lighting automation systems", "Energy management solutions", "Environmental monitoring"].map((feature, index) => (
                  <li key={index} className="flex items-start text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-govisan-gold rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;