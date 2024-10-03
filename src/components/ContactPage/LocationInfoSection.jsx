// src/components/ContactPage/LocationInfoSection.js
import React from 'react';
import './ContactPage.css';

function LocationInfoSection() {
  return (
    <section className="location-info-section">
      <h2>Unser Standort</h2>
      <div className="address-block">
        <p>Paulinenstraße 50</p>
        <p>70178, Stuttgart</p>
        <p>Phone: +49 711 320 660 - 0</p>
        <p>Email: info@dhbw-stuttgart.de</p>
      </div>
      <div className="map-embed">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d328.6807850250151!2d9.170493853704725!3d48.77336969123125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4799dbb3d78fef99%3A0x31d0d5a752c2215!2sDHBW%20Stuttgart%20-%20Fakult%C3%A4t%20Wirtschaft!5e0!3m2!1sde!2sde!4v1726476046769!5m2!1sde!2sde"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Our Location"
        ></iframe>
      </div>
    </section>
  );
}

export default LocationInfoSection;
