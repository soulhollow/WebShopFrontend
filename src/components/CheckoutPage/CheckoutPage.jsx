// src/components/CheckoutPage/CheckoutPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ApiService from '../../context/ApiService.jsx';
import { loadStripe } from '@stripe/stripe-js';
import './CheckoutPage.css'; // CSS importieren

function CheckoutPage() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        ApiService.getProductById(productId)
            .then(response => {
                setProduct(response.data);
            })
            .catch(err => {
                console.error('Fehler beim Abrufen des Produkts:', err);
            });
    }, [productId]);

    const handleCheckout = async () => {
        try {
            const session = await ApiService.createCheckoutSession(productId);

            const stripe = await loadStripe('Ihr-Stripes-Publishable-Key');
            await stripe.redirectToCheckout({ sessionId: session.data.id });
        } catch (error) {
            console.error('Fehler beim Erstellen der Checkout-Session:', error);
        }
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
                <p>Preis: <span className="product-price">{product.price} €</span></p>
                <button className="checkout-button" onClick={handleCheckout}>Weiter zur Zahlung</button>
            </div>
        </div>
    );
}

export default CheckoutPage;
