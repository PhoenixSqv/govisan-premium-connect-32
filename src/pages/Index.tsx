import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import TrustedBrands from '@/components/TrustedBrands';
import AboutSection from '@/components/AboutSection';
import SolutionsSection from '@/components/SolutionsSection';
import SuccessStories from '@/components/SuccessStories';
import InsightsSection from '@/components/InsightsSection';
import GlobalMapSection from '@/components/GlobalMapSection';
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
        <SuccessStories />
        <InsightsSection />
        <GlobalMapSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;