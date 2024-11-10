import React, { useEffect, useState } from 'react';
import ApiService from '../../context/ApiService.jsx';
import './Datenschutz.css';

function Datenschutz() {
    const [datenschutzData, setDatenschutzData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDatenschutzData = async () => {
            try {
                const keys = ['datenschutz_header', 'datenschutz_text'];
                const responses = await ApiService.getTextContentsByKeys(keys);
                const contentMap = {};
                responses.forEach(response => {
                    contentMap[response.data.key] = response.data.content;
                });
                setDatenschutzData(contentMap);
                setLoading(false);
            } catch (err) {
                console.error('Fehler beim Laden der Datenschutz-Daten:', err);
                setError('Es gab ein Problem beim Laden der Datenschutz-Daten.');
                setLoading(false);
            }
        };

        fetchDatenschutzData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="datenschutz">
            <h2>{datenschutzData['datenschutz_header']}</h2>
            <p>{datenschutzData['datenschutz_text']}</p>
        </div>
    );
}

export default Datenschutz;
