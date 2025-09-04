import React from 'react';
import { Button } from './ui/button';
import { Wifi, Smartphone, Shield, Settings, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const SolutionsSection = () => {
  const { t } = useLanguage();
  const solutions = [
    {
      icon: Wifi,
      title: t('solution.smart_connectivity'),
      description: t('solution.smart_connectivity_desc'),
      features: [t('feature.enterprise_wifi'), t('feature.guest_isolation'), t('feature.bandwidth_mgmt')]
    },
    {
      icon: Smartphone,
      title: t('solution.iot_guest'),
      description: t('solution.iot_guest_desc'),
      features: [t('feature.smart_controls'), t('feature.mobile_integration'), t('feature.personalized_services')]
    },
    {
      icon: Shield,
      title: t('solution.secure_networks'),
      description: t('solution.secure_networks_desc'),
      features: [t('feature.advanced_encryption'), t('feature.monitoring'), t('feature.compliance')]
    },
    {
      icon: Settings,
      title: t('solution.systems_integration'),
      description: t('solution.systems_integration_desc'),
      features: [t('feature.pms_integration'), t('feature.unified_comms'), t('feature.legacy_support')]
    }
  ];

  return (
    <section id="solutions" className="py-20 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-govisan-gold/10 text-govisan-gold px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Settings className="h-4 w-4 mr-2" />
            {t('solutions.badge')}
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            {t('solutions.title')}
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('solutions.description')}
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {solutions.map((solution, index) => (
            <div
              key={solution.title}
              className="group bg-white rounded-2xl p-8 shadow-premium hover:shadow-gold transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-govisan-gold/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-govisan-gold/20 transition-colors">
                <solution.icon className="h-8 w-8 text-govisan-gold" />
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-govisan-navy transition-colors">
                {solution.title}
              </h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {solution.description}
              </p>
              
              <ul className="space-y-2 text-sm text-muted-foreground">
                {solution.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-govisan-gold rounded-full mr-3 flex-shrink-0"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="premium" size="lg" className="text-lg px-8 py-4 h-auto">
            {t('solutions.see_all')}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;