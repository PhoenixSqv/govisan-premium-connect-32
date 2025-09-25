import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import * as LucideIcons from 'lucide-react';

interface SpecializationItem {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

interface SpecializationContent {
  badge: string;
  title: string;
  description: string;
  specializations: SpecializationItem[];
}

const SpecializationSection = () => {
  const [content, setContent] = useState<SpecializationContent | null>(null);

  useEffect(() => {
    // Load from static JSON for now - ready for PHP API migration
    fetch('/content/specialization/main.json')
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(error => console.error('Error loading specialization content:', error));
  }, []);

  if (!content) return <div>Loading...</div>;

  return (
    <section id="specialization" className="section--wm wm--cases py-20 gradient-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gradient-teal text-white px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-teal">
            <LucideIcons.Sparkles className="h-4 w-4 mr-2" />
            {content.badge}
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            {content.title}
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {content.description}
          </p>
        </div>

        {/* Specializations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.specializations.map((specialization, index) => {
            const IconComponent = (LucideIcons as any)[specialization.icon] || LucideIcons.Settings;
            
            return (
              <Card 
                key={specialization.title}
                className="group glass hover:shadow-teal transition-all duration-500 hover:-translate-y-2 border-0"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 gradient-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-govisan-teal transition-colors">
                    {specialization.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {specialization.description}
                  </p>
                  
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {specialization.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-govisan-teal rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SpecializationSection;