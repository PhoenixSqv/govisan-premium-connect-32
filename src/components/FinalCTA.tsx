import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const FinalCTA = () => {
  const { t } = useLanguage();
  return (
    <section className="py-20 gradient-hero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {t('cta.title')}
          </h2>
          
          <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            {t('cta.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button variant="premium" size="lg" className="text-lg px-10 py-5 h-auto">
              {t('cta.request')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button variant="hero" size="lg" className="text-lg px-10 py-5 h-auto">
              <Phone className="mr-2 h-5 w-5" />
              {t('cta.contact')}
            </Button>
          </div>
          
          <div className="mt-12 text-white/60 text-sm">
            Trusted by 500+ hotels worldwide • Available 24/7 global support
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;