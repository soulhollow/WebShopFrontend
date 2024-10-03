
import React from 'react';
import './ContactPage.css';
import ContactFormSection from './ContactFormSection';
import LocationInfoSection from './LocationInfoSection';
import SocialMediaSection from './SocialMediaSection';
import FAQSection from './FAQSection';

function ContactPage() {
  return (
    <div className="contact-page">
      <ContactFormSection />
      <LocationInfoSection />
      <SocialMediaSection />
      <FAQSection />
    </div>
  );
}

export default ContactPage;
