import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import AnimatedCounter from "@/components/AnimatedCounter";

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
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${content.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Título Principal */}
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {content.title}
          </h1>
        </div>

        {/* Subtítulo */}
        <div className="animate-fade-in animation-delay-200">
          <p className="text-lg md:text-xl mb-12 max-w-4xl mx-auto leading-relaxed opacity-90">
            {content.subtitle}
          </p>
        </div>

        {/* Botones CTA */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in animation-delay-400">
          {content.buttons.map((button, index) => (
            <Button
              key={index}
              size="lg"
              className={
                button.type === "primary"
                  ? "bg-govisan-gold hover:bg-govisan-gold/90 text-white font-semibold px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-300 shadow-xl"
                  : "bg-transparent border-2 border-white text-white hover:bg-white hover:text-govisan-navy font-semibold px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-300"
              }
              onClick={() => {
                if (button.link.startsWith('#')) {
                  document.querySelector(button.link)?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = button.link;
                }
              }}
            >
              {button.type === "secondary" && (
                <span className="mr-2">▶</span>
              )}
              {button.text}
            </Button>
          ))}
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 animate-fade-in animation-delay-600">
          {content.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-govisan-gold mb-2">
                {stat.number}
              </div>
              <p className="text-white/90 text-lg font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay decorativo */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
    </section>
  );
};

export default HeroSection;