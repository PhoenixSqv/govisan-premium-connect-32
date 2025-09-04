import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Award, Globe, Users } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center bg-govisan-gold/10 text-govisan-gold px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="h-4 w-4 mr-2" />
              25+ Years of Excellence
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              About{' '}
              <span className="text-govisan-navy">Govisan</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              As a leading provider of telecommunications solutions for luxury hotels, 
              Govisan has been connecting hospitality worldwide for over 25 years. 
              Our commitment to excellence and innovation has made us the trusted 
              partner for the world's most prestigious hotel chains.
            </p>
            
            <div className="bg-govisan-navy/5 border border-govisan-navy/10 rounded-xl p-6 mb-8">
              <p className="text-foreground font-medium">
                "Part of VCN Ingeniería Group, we are expanding our presence across 
                Asia-Pacific, bringing world-class telecommunications expertise to 
                the region's most exclusive hospitality destinations."
              </p>
            </div>
            
            <Button variant="cta" size="lg" className="text-lg px-8 py-4 h-auto">
              Learn More About Us
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
                  Global Presence
                </h3>
                <p className="text-muted-foreground">
                  Operating across 50+ countries with local expertise and 
                  international standards of excellence.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-govisan-gold/10 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-govisan-gold" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Expert Team
                </h3>
                <p className="text-muted-foreground">
                  Over 200 certified engineers and hospitality technology 
                  specialists dedicated to your success.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-govisan-gold/10 rounded-xl flex items-center justify-center">
                <Award className="h-6 w-6 text-govisan-gold" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Industry Recognition
                </h3>
                <p className="text-muted-foreground">
                  Multiple awards for innovation in hospitality technology 
                  and customer service excellence.
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