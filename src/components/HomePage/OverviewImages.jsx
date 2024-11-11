import React, { useEffect, useState } from 'react';
import ApiService from '../../context/ApiService.jsx';
import './HomePage.css';
import handy from './Handy.jpg';
import schreibtisch from './Schreibtisch.jpg';

function OverviewImages() {
    const [header, setHeader] = useState('');
    const [ctaText, setCtaText] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOverviewData = async () => {
            try {
                const keys = [
                    'overview_images_header',
                    'overview_cta_text'
                ];
                const responses = await ApiService.getTextContentsByKeys(keys);
                const contentMap = {};
                responses.forEach(response => {
                    contentMap[response.data.key] = response.data.content;
                });

                setHeader(contentMap['overview_images_header']);
                setCtaText(contentMap['overview_cta_text']);
                setLoading(false);
            } catch (err) {
                console.error('Fehler beim Laden der Überblick-Daten:', err);
                setError('Es gab ein Problem beim Laden der Überblick-Daten.');
                setLoading(false);
            }
        };

        fetchOverviewData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <section className="overview-img">
            <h2>{header}</h2>
            < div
                className = 'img-grid' >
                < div
                    className = "img-container" >
                    < img
                        src = {handy} alt={"Handy bild"}/>
                </div>
                <div className="img-container">
                    <img src={schreibtisch} alt={"Bild von Schreibtisch"}/>
                </div>
            </div>
            <p>{ctaText}</p>
        </section>
    );
}

export default OverviewImages;

