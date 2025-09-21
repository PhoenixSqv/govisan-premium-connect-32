import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import AnimatedCounter from './AnimatedCounter';

interface HeroContent {
  title: string;
  subtitle: string;
  backgroundImage: string;
  buttons: Array<{
    text: string;
    link: string;
    type: string;
  }>;
  stats: Array<{
    number: string;
    label: string;
  }>;
}

const HeroSection = () => {
  const [content, setContent] = useState<HeroContent | null>(null);
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation({ threshold: 0.3 });

  useEffect(() => {
    fetch('/content/home/hero.json')
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(err => console.error('Failed to load hero content:', err));
  }, []);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  if (!content) return <div>Loading...</div>;
  
  return (
    <section id="hero" className="section--wm wm--home relative min-h-screen flex items-center pt-24 overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat parallax-bg"
        style={{ backgroundImage: `url(${content.backgroundImage})` }}
      >
        <div className="absolute inset-0 gradient-overlay"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className="text-white">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
              {content.title}
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
              {content.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              {content.buttons.map((button, index) => (
                <Button
                  key={index}
                  size="lg"
                  onClick={() => handleNavClick(button.link)}
                  variant={button.type === 'primary' ? 'default' : 'outline'}
                  className={button.type === 'primary' 
                    ? "bg-govisan-gold hover:bg-govisan-gold/90 text-white border-govisan-gold font-semibold px-8 py-4 text-lg group"
                    : "bg-transparent border-2 border-white text-white hover:bg-white hover:text-govisan-navy font-semibold px-8 py-4 text-lg group transition-all duration-300"
                  }
                >
                  {button.type === 'secondary' && <Play className="mr-2 h-5 w-5 text-white group-hover:text-govisan-navy" />}
                  {button.text}
                  {button.type === 'primary' && <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />}
                </Button>
              ))}
            </div>
            
            {/* Animated Stats */}
            <div 
              ref={statsRef}
              className={`grid grid-cols-3 gap-8 transition-all duration-700 ${
                statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {content.stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center lg:text-left"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="text-3xl lg:text-4xl font-bold text-govisan-gold mb-2">
                    {stat.number.includes('+') ? (
                      <AnimatedCounter 
                        end={parseInt(stat.number.replace(/[^\d]/g, ''))} 
                        suffix="+" 
                      />
                    ) : stat.number.includes(',') ? (
                      <AnimatedCounter 
                        end={parseInt(stat.number.replace(/[^\d]/g, ''))} 
                        prefix="+" 
                      />
                    ) : (
                      stat.number
                    )}
                  </div>
                  <div className="text-white/80 text-sm lg:text-base">{stat.label}</div>
                </div>
              ))}
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