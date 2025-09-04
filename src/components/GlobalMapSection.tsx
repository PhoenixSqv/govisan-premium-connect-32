import React from 'react';
import { MapPin, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const GlobalMapSection = () => {
  const { t } = useLanguage();
  const regions = [
    {
      name: 'Europe',
      description: 'Headquarters & Operations Center',
      position: { left: '45%', top: '25%' },
      projects: '200+',
      color: 'bg-govisan-gold'
    },
    {
      name: 'Asia-Pacific',
      description: 'Expanding Market Presence',
      position: { left: '75%', top: '40%' },
      projects: '150+',
      color: 'bg-govisan-navy'
    },
    {
      name: 'Middle East',
      description: 'Premium Hotel Solutions',
      position: { left: '55%', top: '35%' },
      projects: '80+',
      color: 'bg-govisan-gold'
    },
    {
      name: 'Americas',
      description: 'Strategic Partnerships',
      position: { left: '25%', top: '35%' },
      projects: '120+',
      color: 'bg-govisan-navy'
    }
  ];

  return (
    <section className="py-20 bg-govisan-navy text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center bg-govisan-gold/20 text-govisan-gold px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Globe className="h-4 w-4 mr-2" />
              {t('global.badge')}
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {t('global.title')}
            </h2>
            
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              {t('global.description')}
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-govisan-gold mb-2">50+</div>
                <div className="text-white/70">Countries Served</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-govisan-gold mb-2">500+</div>
                <div className="text-white/70">Hotels Connected</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Interactive Map */}
          <div className="relative">
            {/* World Map Illustration */}
            <div className="relative w-full h-96 bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full bg-gradient-to-br from-govisan-gold/20 to-transparent"></div>
              </div>
              
              {/* Map Points */}
              {regions.map((region, index) => (
                <div
                  key={region.name}
                  className="absolute group cursor-pointer animate-fade-in"
                  style={{
                    ...region.position,
                    animationDelay: `${index * 0.2}s`
                  }}
                >
                  {/* Animated Pin */}
                  <div className="relative">
                    <div className={`w-4 h-4 ${region.color} rounded-full animate-pulse`}></div>
                    <div className={`absolute inset-0 w-4 h-4 ${region.color} rounded-full animate-ping opacity-75`}></div>
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <div className="bg-white text-govisan-navy p-4 rounded-xl shadow-xl min-w-48">
                      <div className="font-semibold text-sm mb-1">{region.name}</div>
                      <div className="text-xs text-muted-foreground mb-2">{region.description}</div>
                      <div className="text-xs">
                        <span className="font-medium">{region.projects}</span> Projects
                      </div>
                    </div>
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                      <div className="w-2 h-2 bg-white rotate-45"></div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(212, 175, 55, 0.3)" />
                    <stop offset="100%" stopColor="rgba(212, 175, 55, 0.1)" />
                  </linearGradient>
                </defs>
                <path
                  d="M 45% 25% Q 60% 15% 75% 40%"
                  stroke="url(#connectionGradient)"
                  strokeWidth="2"
                  fill="none"
                  className="animate-pulse"
                />
                <path
                  d="M 25% 35% Q 35% 20% 45% 25%"
                  stroke="url(#connectionGradient)"
                  strokeWidth="2"
                  fill="none"
                  className="animate-pulse"
                />
              </svg>
            </div>
            
            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-govisan-gold mb-1">24/7</div>
                <div className="text-sm text-white/70">Global Support</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-govisan-gold mb-1">15+</div>
                <div className="text-sm text-white/70">Time Zones</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalMapSection;