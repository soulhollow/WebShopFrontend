import React, { useEffect, useState } from 'react';
import ApiService from '../../context/ApiService.jsx';
import './ContactPage.css';

function SocialMediaSection() {
    const [socialMediaData, setSocialMediaData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSocialMediaData = async () => {
            try {
                const keys = [
                    'social_media_header',
                    'social_media_linkedin',
                    'social_media_linkedin_icon',
                    'social_media_twitter',
                    'social_media_twitter_icon',
                    'social_media_facebook',
                    'social_media_facebook_icon'
                ];
                const responses = await ApiService.getTextContentsByKeys(keys);
                const contentMap = {};
                responses.forEach(response => {
                    contentMap[response.data.key] = response.data.content;
                });
                setSocialMediaData(contentMap);
                setLoading(false);
            } catch (err) {
                console.error('Fehler beim Laden der Social-Media-Daten:', err);
                setError('Es gab ein Problem beim Laden der Social-Media-Daten.');
                setLoading(false);
            }
        };

        fetchSocialMediaData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <section className="social-media-section">
            <h2>{socialMediaData['social_media_header']}</h2>
            <div className="social-media-icons">
                <a href={socialMediaData['social_media_linkedin']} target="_blank" rel="noopener noreferrer">
                    <img src={socialMediaData['social_media_linkedin_icon']} alt="LinkedIn" />
                </a>
                <a href={socialMediaData['social_media_twitter']} target="_blank" rel="noopener noreferrer">
                    <img src={socialMediaData['social_media_twitter_icon']} alt="Twitter" />
                </a>
                <a href={socialMediaData['social_media_facebook']} target="_blank" rel="noopener noreferrer">
                    <img src={socialMediaData['social_media_facebook_icon']} alt="Facebook" />
                </a>
            </div>
        </section>
    );
}

export default SocialMediaSection;
