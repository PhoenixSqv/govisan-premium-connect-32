import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import * as LucideIcons from 'lucide-react';

// Import specialization background images
import hospitalityTechImage from '@/assets/specializations/hospitality-tech.jpg';
import realEstateTechImage from '@/assets/specializations/real-estate-tech.jpg';
import networkInfraImage from '@/assets/specializations/network-infrastructure.jpg';
import entertainmentImage from '@/assets/specializations/entertainment-solutions.jpg';
import businessIntelImage from '@/assets/specializations/business-intelligence.jpg';
import iotAutomationImage from '@/assets/specializations/iot-automation.jpg';

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

  // Map specialization titles to their background images
  const backgroundImages = {
    'Hospitality Technology': hospitalityTechImage,
    'Real Estate Technology': realEstateTechImage,
    'Network Infrastructure': networkInfraImage,
    'Smart Entertainment Solutions': entertainmentImage,
    'Business Intelligence': businessIntelImage,
    'IoT & Automation': iotAutomationImage,
  };

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
            const backgroundImage = backgroundImages[specialization.title as keyof typeof backgroundImages];
            
            return (
              <Card 
                key={specialization.title}
                className="group relative overflow-hidden border-0 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-[400px]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${backgroundImage})` }}
                />
                
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/80 transition-opacity duration-300 group-hover:bg-black/70" />
                
                <CardContent className="relative z-10 p-8 h-full flex flex-col text-white">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary/90 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold leading-tight text-white group-hover:text-primary-foreground transition-colors" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                      {specialization.title}
                    </h3>
                  </div>
                  
                  <p className="text-white mb-6 leading-relaxed text-sm font-medium" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                    {specialization.description}
                  </p>
                  
                  <div className="mt-auto">
                    <ul className="space-y-2 text-xs text-white font-medium">
                      {specialization.features.slice(0, 4).map((feature) => (
                        <li key={feature} className="flex items-center" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                          <div className="w-2 h-2 bg-white rounded-full mr-3 flex-shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                      {specialization.features.length > 4 && (
                        <li className="text-white font-medium" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                          +{specialization.features.length - 4} more services
                        </li>
                      )}
                    </ul>
                  </div>
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