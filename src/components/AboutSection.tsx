import React, { useState, useEffect, useCallback } from 'react';
import { Button } from './ui/button';
import { ArrowRight, Award, Globe, Users } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
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
  
  // Carousel setup
  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true,
      align: 'start',
      slidesToScroll: 1,
      breakpoints: {
        '(min-width: 768px)': { slidesToScroll: 2 },
        '(min-width: 1024px)': { slidesToScroll: 1 }
      }
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  const brands = [
    { name: 'ASG Iberia', logo: 'ASG IBERIA' },
    { name: 'Six Senses', logo: 'SIX SENSES' },
    { name: 'Bovis', logo: 'BOVIS' },
    { name: 'Mandarin Oriental', logo: 'MANDARIN ORIENTAL' },
    { name: 'Hard Rock', logo: 'HARD ROCK' },
    { name: 'KKH Property Investors', logo: 'KKH PROPERTY' },
  ];
  useEffect(() => {
    fetch('/content/about/main.json').then(res => res.json()).then(data => setContent(data)).catch(err => console.error('Failed to load about content:', err));
  }, []);
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  if (!content) return <div>Loading...</div>;
  return <section id="about" className="section--wm wm--about py-20 bg-background">
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
            
            
          </div>
          
          {/* Right Content - Value Props */}
          <div className="space-y-8">
            {content.values.map((value, index) => {
            const IconComponent = (LucideIcons as any)[value.icon] || Globe;
            return <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <IconComponent className="h-8 w-8 text-govisan-gold" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-govisan-navy mb-2">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                </div>;
          })}
          </div>
        </div>
        
        {/* Trusted Brands Carousel */}
        <div className="mt-20 text-center">
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
            Trusted by leading hospitality & real estate brands
          </p>
          
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {brands.map((brand, index) => (
                <div 
                  key={brand.name} 
                  className="flex-[0_0_50%] min-w-0 md:flex-[0_0_33.333%] lg:flex-[0_0_20%] pl-4"
                >
                  <div className="flex items-center justify-center p-8 h-24 grayscale hover:grayscale-0 transition-all duration-300 group cursor-pointer">
                    <div className="text-lg font-semibold text-muted-foreground group-hover:text-govisan-navy transition-colors duration-300 text-center">
                      {brand.logo}
                    </div>
                  </div>
                </div>
              ))}
              {/* Duplicate brands for seamless loop */}
              {brands.map((brand, index) => (
                <div 
                  key={`duplicate-${brand.name}`} 
                  className="flex-[0_0_50%] min-w-0 md:flex-[0_0_33.333%] lg:flex-[0_0_20%] pl-4"
                >
                  <div className="flex items-center justify-center p-8 h-24 grayscale hover:grayscale-0 transition-all duration-300 group cursor-pointer">
                    <div className="text-lg font-semibold text-muted-foreground group-hover:text-govisan-navy transition-colors duration-300 text-center">
                      {brand.logo}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;