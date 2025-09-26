import React, { useState, useEffect, useCallback } from 'react';
import { Button } from './ui/button';
import { ArrowRight, Award, Globe, Users } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

// Import logos
import asgLogo from '../assets/logos/asg.png';
import hardRockLogo from '../assets/logos/hardrock.png';
import kkhLogo from '../assets/logos/kkh.png';
import bovisLogo from '../assets/logos/bovis.png';
import mandarinLogo from '../assets/logos/mandarin.png';
import sixSensesLogo from '../assets/logos/sixsenses.png';
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
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': {
        slidesToScroll: 2
      },
      '(min-width: 1024px)': {
        slidesToScroll: 1
      }
    }
  }, [Autoplay({
    delay: 3000,
    stopOnInteraction: false
  })]);
  const brands = [{
    name: 'ASG Iberia',
    logo: asgLogo
  }, {
    name: 'Six Senses',
    logo: sixSensesLogo
  }, {
    name: 'Bovis',
    logo: bovisLogo
  }, {
    name: 'Mandarin Oriental',
    logo: mandarinLogo
  }, {
    name: 'Hard Rock',
    logo: hardRockLogo
  }, {
    name: 'KKH Property Investors',
    logo: kkhLogo
  }];
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
        <div className="mt-20">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-govisan-navy mb-4">Trusted Partners</h3>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Leading hospitality & real estate brands worldwide trust our expertise
            </p>
          </div>
          
          <div className="relative">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none"></div>
            
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {brands.map((brand, index) => (
                  <div key={brand.name} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-6">
                    <div className="group cursor-pointer mx-3">
                      <div className="relative bg-gradient-to-br from-white to-gray-50 border border-gray-200/50 rounded-2xl p-12 h-48 flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                        {/* Subtle background pattern */}
                        <div className="absolute inset-0 bg-gradient-to-br from-govisan-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Logo container */}
                        <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
                          <img 
                            src={brand.logo} 
                            alt={`${brand.name} logo`}
                            className="max-h-24 max-w-full object-contain filter brightness-90 group-hover:brightness-100 transition-all duration-500"
                          />
                        </div>
                        
                        {/* Hover glow effect */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-govisan-gold/10 to-govisan-navy/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                      
                      {/* Brand name always visible */}
                      <div className="text-center mt-4">
                        <span className="text-base font-medium text-govisan-navy">{brand.name}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Duplicate brands for seamless loop */}
                {brands.map((brand, index) => (
                  <div key={`duplicate-${brand.name}`} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-6">
                    <div className="group cursor-pointer mx-3">
                      <div className="relative bg-gradient-to-br from-white to-gray-50 border border-gray-200/50 rounded-2xl p-12 h-48 flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                        {/* Subtle background pattern */}
                        <div className="absolute inset-0 bg-gradient-to-br from-govisan-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Logo container */}
                        <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
                          <img 
                            src={brand.logo} 
                            alt={`${brand.name} logo`}
                            className="max-h-24 max-w-full object-contain filter brightness-90 group-hover:brightness-100 transition-all duration-500"
                          />
                        </div>
                        
                        {/* Hover glow effect */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-govisan-gold/10 to-govisan-navy/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                      
                      {/* Brand name always visible */}
                      <div className="text-center mt-4">
                        <span className="text-base font-medium text-govisan-navy">{brand.name}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;