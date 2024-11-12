// Importiert React und die benötigten Hooks `useState` und `useEffect`
import React, { useState, useEffect } from 'react';
// Importiert `useParams` und `useNavigate` aus `react-router-dom`, um URL-Parameter zu lesen und zu navigieren
import { useParams, useNavigate } from 'react-router-dom';
// Importiert den ApiService für die Kommunikation mit der API
import ApiService from '../../context/ApiService.jsx';
// Importiert das CSS-Stylesheet für das Styling der CheckoutPage-Komponente
import './CheckoutPage.css';

function CheckoutPage() {
    const { productId } = useParams(); // Extrahiert die `productId` aus der URL
    const navigate = useNavigate(); // Definiert die Navigation-Funktion
    const [product, setProduct] = useState(null); // Speichert die Produktdetails
    const VAT_RATE = 0.19; // 19% Mehrwertsteuer-Satz

    // useEffect-Hook lädt die Produktdaten, sobald die Komponente gerendert wird oder die `productId` sich ändert
    useEffect(() => {
        ApiService.getProductById(productId)
            .then(response => {
                setProduct(response.data); // Speichert das Produkt im State
            })
            .catch(err => {
                console.error('Fehler beim Abrufen des Produkts:', err); // Fehlerbehandlung bei fehlerhaftem Abruf
            });
    }, [productId]);

    // Formatierungsfunktion für Währungsbeträge im deutschen Format
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(amount);
    };

    // Berechnet die Netto-, Mehrwertsteuer- und Brutto-Preise basierend auf dem Produktpreis
    const calculatePrices = () => {
        if (!product) return { net: 0, vat: 0, gross: 0 };

        const gross = product.price; // Brutto-Preis des Produkts
        const net = gross / (1 + VAT_RATE); // Netto-Preis-Berechnung
        const vat = gross - net; // Mehrwertsteuer berechnet als Differenz zwischen Brutto und Netto

        return { net, vat, gross };
    };

    const { net, vat, gross } = calculatePrices(); // Destrukturiert die berechneten Preise

    // Funktion, die zur Zahlungsseite weiterleitet
    const handleCheckout = () => {
        navigate(`/payment/${productId}`);
    };

    // Zeigt eine Ladeanzeige an, wenn die Produktdaten noch geladen werden
    if (!product) {
        return <div className="loading">Produktdetails werden geladen...</div>;
    }

    // Rendert die Checkout-Seite mit den Produktdetails und der Preiszusammenfassung
    return (
        <div className="checkout-page"> {/* Haupt-Container für die Checkout-Seite */}
            <div className="product-container"> {/* Container für Produktinformationen */}
                <h1>Checkout</h1> {/* Überschrift der Seite */}
                <h2>{product.name}</h2> {/* Produktname */}
                <p className="product-description">{product.description}</p> {/* Produktbeschreibung */}
                <div className="price-summary"> {/* Preiszusammenfassung */}
                    <div className="price-row">
                        <span>Netto:</span>
                        <span>{formatCurrency(net)}</span> {/* Formatierter Netto-Preis */}
                    </div>
                    <div className="price-row">
                        <span>Mehrwertsteuer (19%):</span>
                        <span>{formatCurrency(vat)}</span> {/* Formatierte Mehrwertsteuer */}
                    </div>
                    <div className="price-row total">
                        <span>Brutto:</span>
                        <span>{formatCurrency(gross)}</span> {/* Formatierter Brutto-Preis */}
                    </div>
                </div>
                <button className="checkout-button" onClick={handleCheckout}>Weiter zur Zahlung</button> {/* Checkout-Button */}
            </div>
        </div>
    );
}

export default CheckoutPage;
