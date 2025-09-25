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
    // Try loading from PHP API first, fallback to static JSON
    const loadContent = async () => {
      try {
        // First try the CMS API endpoint
        let response = await fetch('/api/cms/get-block.php?slug=services-iot-automation');
        if (!response.ok) {
          // Fallback to static JSON
          response = await fetch('/content/specialization/main.json');
        }
        
        const data = await response.json();
        setContent(data);
      } catch (error) {
        console.error('Error loading specialization content:', error);
      }
    };
    
    loadContent();
  }, []);

  if (!content) return <div>Loading...</div>;

  return (
    <section id="specialization" className="section--wm wm--specialization py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-govisan-gold/10 text-govisan-gold px-4 py-2 rounded-full text-sm font-medium mb-6">
            <LucideIcons.Target className="h-4 w-4 mr-2" />
            {content.badge}
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-govisan-navy mb-6 leading-tight">
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
              <Card key={index} className="bg-white border border-gray-100 hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-12 h-12 bg-govisan-gold/10 rounded-lg flex items-center justify-center group-hover:bg-govisan-gold/20 transition-colors duration-300">
                        <IconComponent className="h-6 w-6 text-govisan-gold" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-govisan-navy">{specialization.title}</h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {specialization.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {specialization.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <LucideIcons.Check className="h-4 w-4 text-govisan-gold mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
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