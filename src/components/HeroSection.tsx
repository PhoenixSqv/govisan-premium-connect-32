import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Play } from 'lucide-react';
import heroBackground from '@/assets/hero-background.jpg';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBackground}
          alt="Luxury hotel with advanced telecommunications"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-overlay"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            Connecting{' '}
            <span className="text-govisan-gold gradient-gold bg-clip-text text-transparent">
              Hospitality
            </span>{' '}
            Worldwide
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
            25+ Years of Excellence in Telecommunications for Luxury Hotels
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button variant="premium" size="lg" className="text-lg px-8 py-4 h-auto">
              Discover Our Solutions
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button variant="hero" size="lg" className="text-lg px-8 py-4 h-auto">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-govisan-gold mb-2">25+</div>
              <div className="text-white/80">Years of Excellence</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-govisan-gold mb-2">500+</div>
              <div className="text-white/80">Hotels Connected</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-govisan-gold mb-2">50+</div>
              <div className="text-white/80">Countries Served</div>
            </div>
          </div>
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