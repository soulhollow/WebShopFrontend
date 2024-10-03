// src/components/HomePage/OverviewImages.js
import React from 'react';
import './HomePage.css';
import handy from './Handy.jpg';
import schreibtisch from './Schreibtisch.jpg';

function OverviewImages() {
  return (
    <section className="overview-img">
      <h2>Ein kleiner Einblick in unsere Abeit</h2>
      <div className='img-grid'>
        <div className="img-container">
          <img src={handy} />         
        </div>
        <div className="img-container">
          <img src={schreibtisch}/>
        </div>
      </div>
      <p>Erfahre mehr in einem kostenlosen Beratungsgespräch!</p>
    </section>
  );
}

export default OverviewImages
