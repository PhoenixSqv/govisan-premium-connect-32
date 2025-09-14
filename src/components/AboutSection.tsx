import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ArrowRight, Award, Globe, Users } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface AboutValue {
  icon: string;
  title: string;
  description: string;
}

interface AboutContent {
  badge: string;
  title: string;
  description: string;
  quote: string;
  values: AboutValue[];
}

const AboutSection = () => {
  const [content, setContent] = useState<AboutContent | null>(null);

  useEffect(() => {
    fetch('/content/about/main.json')
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(err => console.error('Failed to load about content:', err));
  }, []);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  if (!content) return <div>Loading...</div>;
  
  return (
    <section id="about" className="section--wm wm--about py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center bg-govisan-gold/10 text-govisan-gold px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="h-4 w-4 mr-2" />
              {content.badge}
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-govisan-navy mb-6 leading-tight">
              {content.title}
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {content.description}
            </p>
            
            <blockquote className="text-lg italic text-govisan-navy font-medium mb-8 pl-6 border-l-4 border-govisan-gold">
              "{content.quote}"
            </blockquote>
            
            <Button
              onClick={() => handleNavClick('#contact')}
              size="lg"
              className="bg-govisan-gold hover:bg-govisan-gold/90 text-white font-semibold group"
            >
              Learn More About Us
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </div>
          
          {/* Right Content - Value Props */}
          <div className="space-y-8">
            {content.values.map((value, index) => {
              const IconComponent = (LucideIcons as any)[value.icon] || Globe;
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <IconComponent className="h-8 w-8 text-govisan-gold" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-govisan-navy mb-2">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;