import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import AnimatedCounter from "@/components/AnimatedCounter";
import { ArrowRight, Play } from "lucide-react";
import heroBackground from "@/assets/telecom-hero-background.jpg";

interface HeroContent {
  title: string;
  subtitle: string;
  backgroundImage: string;
  buttons: Array<{
    text: string;
    link: string;
    type: "primary" | "secondary";
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
      .catch(err => console.log('Error loading hero content:', err));
  }, []);

  if (!content) return <div>Loading...</div>;

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center text-white overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(34, 57, 109, 0.8), rgba(0, 102, 204, 0.6)), url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-ping animation-delay-1000"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-accent/20 rounded-full animate-ping animation-delay-2000"></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-ping animation-delay-3000"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Main Title */}
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            {content.title}
          </h1>
        </div>

        {/* Subtitle */}
        <div className="animate-fade-in animation-delay-200">
          <p className="text-lg md:text-xl lg:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed opacity-90">
            {content.subtitle}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20 animate-fade-in animation-delay-400">
          {content.buttons.map((button, index) => (
            <Button
              key={index}
              size="lg"
              className={
                button.type === "primary"
                  ? "bg-accent hover:bg-accent/90 text-white font-semibold px-10 py-5 rounded-full transform hover:scale-105 transition-all duration-300 shadow-orange text-lg"
                  : "bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-10 py-5 rounded-full transform hover:scale-105 transition-all duration-300 text-lg"
              }
              onClick={() => {
                if (button.link.startsWith('#')) {
                  document.querySelector(button.link)?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = button.link;
                }
              }}
            >
              {button.type === "primary" && (
                <ArrowRight className="mr-2 w-5 h-5" />
              )}
              {button.type === "secondary" && (
                <Play className="mr-2 w-5 h-5" />
              )}
              {button.text}
            </Button>
          ))}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 animate-fade-in animation-delay-600">
          {content.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-accent mb-4 hover:scale-110 transition-transform duration-300">
                {stat.number}
              </div>
              <p className="text-white/90 text-lg md:text-xl font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/20"></div>
    </section>
  );
};

export default HeroSection;