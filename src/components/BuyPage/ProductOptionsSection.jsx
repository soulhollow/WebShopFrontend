import React, { useState, useEffect } from 'react';
import './BuyPage.css';
import ApiService from '../../context/ApiService.jsx';
import { useNavigate } from 'react-router-dom';

function ProductOptionsSection() {
    const [products, setProducts] = useState([]); // Speichert die Produktoptionen
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Lädt die Produktdaten beim ersten Rendern
    useEffect(() => {
        ApiService.getAllProducts()
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Fehler beim Abrufen der Produkte:', err);
                setError('Produkte konnten nicht geladen werden.');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Produkte werden geladen...</div>;
    if (error) return <div>{error}</div>;

    // Navigiert zum Checkout für das ausgewählte Produkt
    const handleBuyNow = (productId) => {
        navigate(`/checkout/${productId}`);
    };
    // Gibt die Produktoptionen mit den geladenen Daten aus
    return (
        <section className="product-options-section">
            <h2>Wählen Sie Ihren AI Agent Plan</h2>
            <div className="pricing-table">
                {products.map(product => (
                    <div key={product.id} className="option-card">
                        <h3>{product.name}</h3>
                        <p className="price">{product.price}</p>
                        <ul className="features-list">
                            {product.features && product.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                        {product.name.toLowerCase() !== 'enterprise' ? (
                            <button
                                className="buy-button"
                                onClick={() => handleBuyNow(product.id)}
                            >
                                Jetzt kaufen
                            </button>
                        ) : (
                            <button className="buy-button">Vertrieb kontaktieren</button>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ProductOptionsSection;
