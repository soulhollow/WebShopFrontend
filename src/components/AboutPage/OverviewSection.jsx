import React, { useEffect, useState } from 'react';
import ApiService from '../../context/ApiService.jsx';
import './AboutPage.css';

function OverviewSection() {
    const [header, setHeader] = useState('');
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOverviewData = async () => {
            try {
                const keys = ['overview_section_header', 'overview_section_text'];
                const responses = await ApiService.getTextContentsByKeys(keys);
                const contentMap = {};
                responses.forEach(response => {
                    contentMap[response.data.key] = response.data.content;
                });

                setHeader(contentMap['overview_section_header']);
                setText(contentMap['overview_section_text']);
                setLoading(false);
            } catch (err) {
                console.error('Fehler beim Laden der Overview-Daten:', err);
                setError('Es gab ein Problem beim Laden der Daten.');
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
        <section className="overview-section">
            <h2>{header}</h2>
            <p>{text}</p>
        </section>
    );
}

export default OverviewSection;
