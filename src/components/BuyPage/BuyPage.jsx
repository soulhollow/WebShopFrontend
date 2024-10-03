// src/components/BuyPage/BuyPage.js
import React from 'react';
import './BuyPage.css';
import ProductOptionsSection from './ProductOptionsSection';
import FeaturesComparisonSection from './FeaturesComparisonSection';
import CustomerReviewsSection from './CustomerReviewsSection';


function BuyPage() {
  return (
    <div className="buy-page">
      <ProductOptionsSection />
      <FeaturesComparisonSection />
      <CustomerReviewsSection />
    </div>
  );
}

export default BuyPage;
