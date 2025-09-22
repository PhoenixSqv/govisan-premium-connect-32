import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import TrustedBrands from '@/components/TrustedBrands';
import AboutSection from '@/components/AboutSection';
import SolutionsSection from '@/components/SolutionsSection';
import SpecializationSection from '@/components/SpecializationSection';
import SuccessStories from '@/components/SuccessStories';
import InteractiveCaseStudies from '@/components/InteractiveCaseStudies';
import InsightsSection from '@/components/InsightsSection';
import EnhancedContactForm from '@/components/EnhancedContactForm';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <TrustedBrands />
        <AboutSection />
        <SolutionsSection />
        <SpecializationSection />
        <SuccessStories />
        <InteractiveCaseStudies />
        <InsightsSection />
        <EnhancedContactForm />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;