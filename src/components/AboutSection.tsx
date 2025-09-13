import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Award, Globe, Users } from 'lucide-react';

const AboutSection = () => {
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section id="about" className="section--wm wm--about py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center bg-govisan-gold/10 text-govisan-gold px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="h-4 w-4 mr-2" />
              25+ Years Creating Technological Experiences
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-govisan-navy mb-6 leading-tight">
              Over 25 years creating technological experiences for world-class hospitality
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              At GOVISAN Solutions, we are more than engineers: we are strategic partners of luxury hotels. With an international track record of prestigious projects, we bring trust, innovation, and bespoke service to properties that seek true distinction.
            </p>
            
            <blockquote className="text-lg italic text-govisan-navy font-medium mb-8 pl-6 border-l-4 border-govisan-gold">
              "We design and execute integrated technology ecosystems that guarantee security, efficiency, and elegance in every detail."
            </blockquote>
            
            <Button
              onClick={() => handleNavClick('#contact')}
              size="lg"
              className="bg-govisan-gold hover:bg-govisan-gold/90 text-white font-semibold group"
            >
              Learn More About Us
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </div>
          
          {/* Right Content - Value Props */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Globe className="h-8 w-8 text-govisan-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-govisan-navy mb-2">Global Experience</h3>
                  <p className="text-muted-foreground">Two decades supporting leading hospitality brands with international standards of excellence.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Award className="h-8 w-8 text-govisan-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-govisan-navy mb-2">Commitment to Excellence</h3>
                  <p className="text-muted-foreground">Quality across every phase, from design to operation, ensuring perfection in every project.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Users className="h-8 w-8 text-govisan-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-govisan-navy mb-2">Customer-Centric</h3>
                  <p className="text-muted-foreground">Exclusive solutions tailored to every space and every guest for truly personalized experiences.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;