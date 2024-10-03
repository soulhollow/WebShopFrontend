
import React from 'react';
import './HomePage.css';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import OverviewImages from './OverviewImages';

function HomePage() {
  return (
    <div className="homepage">
      <HeroSection />
      <FeaturesSection />
      <OverviewImages />
    </div>
  );
}

export default HomePage;
