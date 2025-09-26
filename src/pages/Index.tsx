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
    <div className="min-h-screen scroll-smooth snap-y snap-mandatory overflow-y-scroll">
      <Header />
      
      <main>
        <section className="snap-start">
          <HeroSection />
        </section>
        <SectionDivider variant="wave" />
        
        <section className="snap-start">
          <AboutSection />
        </section>
        <SectionDivider variant="curve" flip />
        
        <section className="snap-start">
          <SolutionsSection />
        </section>
        <SectionDivider variant="wave" flip />
        
        <section className="snap-start">
          <SpecializationSection />
        </section>
        <SectionDivider variant="curve" />
        
        <section className="snap-start">
          <SuccessStories />
        </section>
        <SectionDivider variant="wave" flip />
        
        <section className="snap-start">
          <InsightsSection />
        </section>
        <SectionDivider variant="curve" flip />
        
        <section className="snap-start">
          <ContactSection />
          <FinalCTA />
        </section>
      </main>
      
      <Footer />
      
      {/* Floating Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default Index;