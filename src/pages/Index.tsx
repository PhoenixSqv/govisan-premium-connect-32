import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SolutionsSection from '@/components/SolutionsSection';
import SpecializationSection from '@/components/SpecializationSection';
import SuccessStories from '@/components/SuccessStories';
import InsightsSection from '@/components/InsightsSection';
import ContactSection from '@/components/ContactSection';
import SectionDivider from '@/components/SectionDivider';
import ChatWidget from '@/components/ChatWidget';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        <HeroSection />
        <SectionDivider variant="wave" />
        
        <AboutSection />
        <SectionDivider variant="curve" flip />
        
        <SolutionsSection />
        <SectionDivider variant="wave" flip />
        
        <SpecializationSection />
        <SectionDivider variant="curve" />
        
        <SuccessStories />
        <SectionDivider variant="wave" flip />
        
        <InsightsSection />
        <SectionDivider variant="curve" flip />
        
        <ContactSection />
        <FinalCTA />
      </main>
      
      <Footer />
      
      {/* Floating Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default Index;