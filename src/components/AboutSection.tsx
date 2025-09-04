import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Award, Globe, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const AboutSection = () => {
  const { t } = useLanguage();
  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center bg-govisan-gold/10 text-govisan-gold px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="h-4 w-4 mr-2" />
              {t('about.badge')}
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              {t('about.title')}
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {t('about.description')}
            </p>
            
            <div className="bg-govisan-navy/5 border border-govisan-navy/10 rounded-xl p-6 mb-8">
              <p className="text-foreground font-medium">
                "{t('about.quote')}"
              </p>
            </div>
            
            <Button variant="cta" size="lg" className="text-lg px-8 py-4 h-auto">
              {t('about.learn_more')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          {/* Right Content - Features */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-govisan-gold/10 rounded-xl flex items-center justify-center">
                <Globe className="h-6 w-6 text-govisan-gold" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {t('about.global_presence')}
                </h3>
                <p className="text-muted-foreground">
                  {t('about.global_desc')}
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-govisan-gold/10 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-govisan-gold" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {t('about.expert_team')}
                </h3>
                <p className="text-muted-foreground">
                  {t('about.expert_desc')}
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-govisan-gold/10 rounded-xl flex items-center justify-center">
                <Award className="h-6 w-6 text-govisan-gold" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {t('about.industry_recognition')}
                </h3>
                <p className="text-muted-foreground">
                  {t('about.industry_desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;