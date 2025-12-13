import React from "react";
import Navbar from "../../portfoliocomponent/Navbar";
import HeroSection from "../../portfoliocomponent/HeroSection";
import HeaderSection from "../../portfoliocomponent/HeaderSection";
import TestimonialsSection from "../../portfoliocomponent/TestimonialsSection";
import GallerySection from "../../portfoliocomponent/GallerySection";
import PolicySection from "../../portfoliocomponent/PolicySection";
import WorkSection from "../../portfoliocomponent/WorkSection";

function Portfolio() {
  return (
    <div className="overflow-y-auto scrollbar-hide">
      <Navbar/>
      <HeroSection />
      <HeaderSection />
      <TestimonialsSection />
      <GallerySection />
      <PolicySection />
      <WorkSection />
      
    </div>
  );
}

export default Portfolio;
