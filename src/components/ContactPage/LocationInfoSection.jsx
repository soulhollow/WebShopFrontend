import React, { useEffect, useState } from 'react';
import ApiService from '../../context/ApiService.jsx';
import './ContactPage.css';

function LocationInfoSection() {
    const [locationData, setLocationData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLocationData = async () => {
            try {
                const keys = ['kontakt_adresse', 'kontakt_telefon', 'kontakt_email', 'map_embed_src'];
                const responses = await ApiService.getTextContentsByKeys(keys);
                const contentMap = {};
                responses.forEach(response => {
                    contentMap[response.data.key] = response.data.content;
                });
                setLocationData(contentMap);
                setLoading(false);
            } catch (err) {
                console.error('Fehler beim Laden der Standortdaten:', err);
                setError('Es gab ein Problem beim Laden der Standortdaten.');
                setLoading(false);
            }
        };

        fetchLocationData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <section className="location-info-section">
            <h2>Unser Standort</h2>
            <div className="address-block">
                <p>{locationData['kontakt_adresse']}</p>
                <p>Phone: {locationData['kontakt_telefon']}</p>
                <p>Email: {locationData['kontakt_email']}</p>
            </div>
            <div className="map-embed">
                <iframe
                    src={locationData['map_embed_src']}
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
