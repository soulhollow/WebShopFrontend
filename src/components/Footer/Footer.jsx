import React, { useEffect, useState } from 'react';
import ApiService from '../../context/ApiService.jsx';
import './Footer.css';

function Footer() {
  const [footerNavLinks, setFooterNavLinks] = useState([]);
  const [socialMediaLinks, setSocialMediaLinks] = useState({});
  const [footerBottomText, setFooterBottomText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const keys = [
          'footer_nav_home',
          'footer_nav_about',
          'footer_nav_buy',
          'footer_nav_contact',
          'social_media_linkedin',
          'social_media_linkedin_icon',
          'social_media_twitter',
          'social_media_twitter_icon',
          'social_media_facebook',
          'social_media_facebook_icon',
          'footer_bottom_text'
        ];
        const responses = await ApiService.getTextContentsByKeys(keys);
        const contentMap = {};
        responses.forEach(response => {
          contentMap[response.data.key] = response.data.content;
        });

        setFooterNavLinks([
          JSON.parse(contentMap['footer_nav_home']),
          JSON.parse(contentMap['footer_nav_about']),
          JSON.parse(contentMap['footer_nav_buy']),
          JSON.parse(contentMap['footer_nav_contact'])
        ]);

        setSocialMediaLinks({
          linkedin: {
            url: contentMap['social_media_linkedin'],
            icon: contentMap['social_media_linkedin_icon']
          },
          twitter: {
            url: contentMap['social_media_twitter'],
            icon: contentMap['social_media_twitter_icon']
          },
          facebook: {
            url: contentMap['social_media_facebook'],
            icon: contentMap['social_media_facebook_icon']
          }
        });

        setFooterBottomText(contentMap['footer_bottom_text']);
        setLoading(false);
      } catch (err) {
        console.error('Fehler beim Laden der Footer-Daten:', err);
        setError('Es gab ein Problem beim Laden der Footer-Daten.');
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
      <footer className="footer">
        <div className="footer-content">
          <nav className="footer-nav">
            <ul>
              {footerNavLinks.map((link, index) => (
                  <li key={index}><a href={link.link}>{link.label}</a></li>
              ))}
            </ul>
          </nav>
          <div className="social-media">
            <a href={socialMediaLinks.linkedin.url} target="_blank" rel="noopener noreferrer">
              <img src={socialMediaLinks.linkedin.icon} alt="LinkedIn" />
            </a>
            <a href={socialMediaLinks.twitter.url} target="_blank" rel="noopener noreferrer">
              <img src={socialMediaLinks.twitter.icon} alt="Twitter" />
            </a>
            <a href={socialMediaLinks.facebook.url} target="_blank" rel="noopener noreferrer">
              <img src={socialMediaLinks.facebook.icon} alt="Facebook" />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p dangerouslySetInnerHTML={{ __html: footerBottomText }}></p>
        </div>
      </footer>
  );
}

export default Footer;
