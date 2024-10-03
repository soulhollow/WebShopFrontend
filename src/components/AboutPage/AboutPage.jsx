
import React from 'react';
import './AboutPage.css';
import OverviewSection from './OverviewSection';
import HowItWorksSection from './HowItWorksSection';
import TeamSection from './TeamSection';

function AboutPage() {
  return (
    <div className="about-page">
      <OverviewSection />
      <HowItWorksSection />
      <TeamSection />
    </div>
  );
}

export default AboutPage;
