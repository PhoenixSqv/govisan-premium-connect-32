import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Wifi, Smartphone, Shield, Settings, Award, Star } from 'lucide-react';

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

  useEffect(() => {
    // Load from static JSON for now - ready for PHP API migration
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
    <section id="solutions" className="section--wm wm--solutions py-20 gradient-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gradient-gold text-white px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-gold">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.solutions.map((solution, index) => {
            const IconComponent = getIcon(solution.icon);
            return (
              <div
                key={solution.title}
                className="group glass hover:shadow-teal transition-all duration-500 hover:-translate-y-2 rounded-2xl p-8 border-0"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 gradient-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-govisan-teal transition-colors">
                  {solution.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {solution.description}
                </p>
                
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {solution.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-govisan-teal rounded-full mr-3 flex-shrink-0"></div>
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

export default SolutionsSection;