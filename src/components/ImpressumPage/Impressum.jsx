import React, { useEffect, useState } from 'react';
import ApiService from '../../context/ApiService.jsx';
import './Impressum.css';

function Impressum() {
    const [impressumData, setImpressumData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchImpressumData = async () => {
            try {
                const keys = [
                    'impressum_header',
                    'impressum_responsible',
                    'impressum_representative',
                    'impressum_contact',
                    'impressum_vat_id',
                    'impressum_content_liability',
                    'impressum_links_liability',
                    'impressum_privacy'
                ];
                const responses = await ApiService.getTextContentsByKeys(keys);
                const contentMap = {};
                responses.forEach(response => {
                    contentMap[response.data.key] = response.data.content;
                });
                setImpressumData(contentMap);
                setLoading(false);
            } catch (err) {
                console.error('Fehler beim Laden der Impressum-Daten:', err);
                setError('Es gab ein Problem beim Laden der Impressum-Daten.');
                setLoading(false);
            }
        };

        fetchImpressumData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="impressum">
            <h2>{impressumData['impressum_header']}</h2>
            <p dangerouslySetInnerHTML={{ __html: impressumData['impressum_responsible'] }}></p>
            <p dangerouslySetInnerHTML={{ __html: impressumData['impressum_representative'] }}></p>
            <p dangerouslySetInnerHTML={{ __html: impressumData['impressum_contact'] }}></p>
            <p dangerouslySetInnerHTML={{ __html: impressumData['impressum_vat_id'] }}></p>
            <p dangerouslySetInnerHTML={{ __html: impressumData['impressum_content_liability'] }}></p>
            <p dangerouslySetInnerHTML={{ __html: impressumData['impressum_links_liability'] }}></p>
            <p dangerouslySetInnerHTML={{ __html: impressumData['impressum_privacy'] }}></p>
        </div>
    );
}

export default Impressum;
