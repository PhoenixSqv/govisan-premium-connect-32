import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Play } from 'lucide-react';
import heroBackground from '@/assets/hero-background.jpg';

const HeroSection = () => {
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section id="hero" className="section--wm wm--home relative min-h-screen flex items-center pt-24 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 gradient-overlay"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className="text-white">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
              Connecting Luxury Hospitality with the Future
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
              Advanced telecommunications engineering and technology solutions for world-class luxury hotels that demand excellence in every detail.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                size="lg"
                onClick={() => handleNavClick('#solutions')}
                className="bg-govisan-gold hover:bg-govisan-gold/90 text-white font-semibold px-8 py-4 text-lg group"
              >
                Discover Our Solutions
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleNavClick('#about')}
                className="border-white text-white hover:bg-white hover:text-govisan-navy font-semibold px-8 py-4 text-lg group"
              >
                <Play className="mr-2 h-5 w-5" />
                Our Expertise
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center lg:text-left">
                <div className="text-3xl lg:text-4xl font-bold text-govisan-gold mb-2">25+</div>
                <div className="text-white/80 text-sm lg:text-base">Years of Excellence</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl lg:text-4xl font-bold text-govisan-gold mb-2">500+</div>
                <div className="text-white/80 text-sm lg:text-base">Hotels Connected</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl lg:text-4xl font-bold text-govisan-gold mb-2">50+</div>
                <div className="text-white/80 text-sm lg:text-base">Countries Served</div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Additional Visual Elements or Space */}
          <div className="hidden lg:block"></div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;