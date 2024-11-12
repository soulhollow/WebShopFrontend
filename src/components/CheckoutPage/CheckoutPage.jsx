// src/components/CheckoutPage/CheckoutPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../context/ApiService.jsx';
import './CheckoutPage.css'; // CSS importieren

function CheckoutPage() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const VAT_RATE = 0.19; // 19% Mehrwertsteuer

    useEffect(() => {
        ApiService.getProductById(productId)
            .then(response => {
                setProduct(response.data);
            })
            .catch(err => {
                console.error('Fehler beim Abrufen des Produkts:', err);
            });
    }, [productId]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(amount);
    };

    const calculatePrices = () => {
        if (!product) return { net: 0, vat: 0, gross: 0 };
        const net = product.price;
        const vat = net * VAT_RATE;
        const gross = net + vat;
        return { net, vat, gross };
    };

    const { net, vat, gross } = calculatePrices();

    const handleCheckout = () => {
        navigate(`/payment/${productId}`);
    };

    if (!product) {
        return <div className="loading">Produktdetails werden geladen...</div>;
    }

    return (
        <div className="checkout-page">
            <div className="product-container">
                <h1>Checkout</h1>
                <h2>{product.name}</h2>
                <p className="product-description">{product.description}</p>
                <div className="price-summary">
                    <div className="price-row">
                        <span>Netto:</span>
                        <span>{formatCurrency(net)}</span>
                    </div>
                    <div className="price-row">
                        <span>Mehrwertsteuer (19%):</span>
                        <span>{formatCurrency(vat)}</span>
                    </div>
                    <div className="price-row total">
                        <span>Brutto:</span>
                        <span>{formatCurrency(gross)}</span>
                    </div>
                </div>
                <button className="checkout-button" onClick={handleCheckout}>Weiter zur Zahlung</button>
            </div>
        </div>
    );
}

export default CheckoutPage;
