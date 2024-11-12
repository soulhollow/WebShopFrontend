import React from 'react';
import { Link } from 'react-router-dom';

function OrderConfirmationPage() {
    return (
        <div className="order-confirmation-page">
            <h1>Vielen Dank für Ihre Bestellung!</h1>
            <p>Ihre Bestellung wurde erfolgreich aufgegeben.</p>
            <Link to="/">Zurück zur Startseite</Link>
        </div>
    );
}

export default OrderConfirmationPage;
