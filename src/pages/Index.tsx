import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SolutionsSection from '@/components/SolutionsSection';
import SpecializationSection from '@/components/SpecializationSection';
import SuccessStories from '@/components/SuccessStories';
import InsightsSection from '@/components/InsightsSection';
import ContactSection from '@/components/ContactSection';

import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Under Construction Banner */}
      <div className="bg-accent text-accent-foreground py-3 text-center font-medium">
        <div className="max-w-7xl mx-auto px-4">
          🚧 Under Construction - Website in Development 🚧
        </div>
      </div>
      
      <main>
        <HeroSection />
        <AboutSection />
        <SolutionsSection />
        <SpecializationSection />
        <SuccessStories />
        <InsightsSection />
        <ContactSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;