import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import AnimatedCounter from "@/components/AnimatedCounter";

interface HeroStats {
  years: string;
  guestrooms: string;
  countries: string;
}

const HeroSection = () => {
  const [stats, setStats] = useState<HeroStats>({
    years: "25+",
    guestrooms: "+60,000", 
    countries: "11"
  });

  useEffect(() => {
    // Cargar estadísticas desde el CMS
    fetch('/content/home/hero.json')
      .then(res => res.json())
      .then(data => {
        if (data.stats) {
          setStats(data.stats);
        }
      })
      .catch(err => console.log('Using default stats'));
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20 overflow-hidden">
      <div className="container mx-auto flex flex-col items-center text-center px-4 relative z-10">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 bg-gradient-to-r from-slate-800 via-blue-900 to-slate-700 bg-clip-text text-transparent">
            Connecting Luxury Hospitality & Real Estate with the Future
          </h1>
        </div>

        <div className="animate-fade-in-up animation-delay-200">
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-4xl leading-relaxed">
            Advanced telecommunications engineering and technology solutions for world-class Hotels, 
            residences, retail & corporate buildings that demand excellence in every detail.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in-up animation-delay-400">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-4 rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start Your Project
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold px-8 py-4 rounded-lg transform hover:scale-105 transition-all duration-300"
            onClick={() => document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Solutions
          </Button>
        </div>

        {/* Estadísticas Animadas Editables desde CMS */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 animate-fade-in-up animation-delay-600">
          <div className="text-center group">
            <AnimatedCounter 
              end={parseInt(stats.years)} 
              suffix="+" 
              className="text-5xl md:text-6xl font-bold text-blue-600 mb-2 group-hover:text-blue-700 transition-colors duration-300"
            />
            <p className="text-gray-700 font-medium">Years of Excellence</p>
          </div>
          <div className="text-center group">
            <AnimatedCounter 
              end={60000} 
              prefix="+" 
              className="text-5xl md:text-6xl font-bold text-blue-600 mb-2 group-hover:text-blue-700 transition-colors duration-300"
            />
            <p className="text-gray-700 font-medium">Guestrooms Connected</p>
          </div>
          <div className="text-center group">
            <AnimatedCounter 
              end={parseInt(stats.countries)} 
              className="text-5xl md:text-6xl font-bold text-blue-600 mb-2 group-hover:text-blue-700 transition-colors duration-300"
            />
            <p className="text-gray-700 font-medium">Countries</p>
          </div>
        </div>
      </div>

      {/* Fondo decorativo con animaciones */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-100 rounded-full opacity-30 animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-50/30 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;