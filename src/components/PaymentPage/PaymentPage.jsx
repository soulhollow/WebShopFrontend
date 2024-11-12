// src/components/PaymentPage/PaymentPage.js
import React, { useState, useEffect } from 'react';
import ApiService from '../../context/ApiService.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import './PaymentPage.css';

function PaymentPage() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [bankDetails, setBankDetails] = useState({
        accountHolderName: '',
        iban: '',
        bic: '',
    });
    const [userId, setUserId] = useState(null);
    const [quantity, setQuantity] = useState(1); // Standardmäßig auf 1 setzen oder entsprechend anpassen

    // User ID beim Mounten der Komponente holen
    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const response = await ApiService.getCurrentUser();
                setUserId(response.data.id); // Setzt die userId aus der API-Antwort
            } catch (error) {
                console.error('Fehler beim Abrufen des Benutzers:', error);
                alert('Fehler beim Abrufen der Benutzerinformationen.');
            }
        };
        fetchUserId();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBankDetails({
            ...bankDetails,
            [name]: value,
        });
    };

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId) {
            alert('Benutzerinformationen konnten nicht geladen werden.');
            return;
        }

        // Bestellung erstellen
        try {
            const orderDTO = {
                userId: userId,
                orderItems: [
                    {
                        productId: productId,
                        quantity: quantity,
                    },
                ],
            };
            await ApiService.createOrder(orderDTO);

            // Erfolgsnachricht anzeigen oder weiterleiten
            alert('Zahlung erfolgreich! Ihre Bestellung wurde aufgegeben.');
            navigate('/order-confirmation');
        } catch (error) {
            console.error('Fehler beim Erstellen der Bestellung:', error);
            alert('Es gab ein Problem bei der Verarbeitung Ihrer Bestellung.');
        }
    };

    return (
        <div className="payment-page">
            <h1>Zahlungsdetails eingeben</h1>
            <div className="product-details">
                <h2>Produkt ID: {productId}</h2>
                <div className="form-group">
                    <label>Menge</label>
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={handleQuantityChange}
                        required
                    />
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Kontoinhaber</label>
                    <input
                        type="text"
                        name="accountHolderName"
                        value={bankDetails.accountHolderName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>IBAN</label>
                    <input
                        type="text"
                        name="iban"
                        value={bankDetails.iban}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>BIC</label>
                    <input
                        type="text"
                        name="bic"
                        value={bankDetails.bic}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Zahlung abschließen</button>
            </form>
        </div>
    );
}

export default PaymentPage;
