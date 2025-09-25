import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ArrowRight, Play } from 'lucide-react';

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
    <section className="section--wm wm--home py-20 gradient-hero text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 gradient-teal rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 gradient-gold rounded-full animate-ping"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 gradient-accent rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            {content.title}
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed text-white/90">
            {content.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            {content.buttons.map((button, index) => (
              <Button
                key={button.text}
                onClick={() => handleNavClick(button.link)}
                variant={button.type === 'primary' ? 'default' : 'outline'}
                size="lg"
                className={
                  button.type === 'primary'
                    ? 'bg-govisan-gold hover:bg-govisan-gold-light text-govisan-navy border-0 font-semibold px-8 py-4 text-lg shadow-gold hover:shadow-teal transition-all duration-300'
                    : 'bg-white/10 hover:bg-white hover:text-govisan-navy border-2 border-white text-white font-semibold px-8 py-4 text-lg backdrop-blur-sm transition-all duration-300'
                }
              >
                {button.text}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            ))}
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {content.stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="glass p-6 rounded-2xl text-center hover:bg-white/20 transition-all duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2 gradient-gold bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-white/80 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;