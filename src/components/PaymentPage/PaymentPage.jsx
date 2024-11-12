// Importiert React und die benötigten Hooks `useState` und `useEffect`
import React, { useState, useEffect } from 'react';
// Importiert den ApiService, um Zahlungs- und Benutzerinformationen abzurufen
import ApiService from '../../context/ApiService.jsx';
// Importiert `useNavigate` und `useParams` für die Navigation und URL-Parameter
import { useNavigate, useParams } from 'react-router-dom';
// Importiert das CSS-Stylesheet für das Styling der PaymentPage
import './PaymentPage.css';

function PaymentPage() {
    // Extrahiert die `productId` aus der URL und initialisiert die Navigation
    const { productId } = useParams();
    const navigate = useNavigate();

    // Definiert den State für Bankdaten und Benutzer-ID
    const [bankDetails, setBankDetails] = useState({
        accountHolderName: '',
        iban: '',
        bic: '',
    });
    const [userId, setUserId] = useState(null);
    const quantity = 1; // Feste Menge von 1 für die Bestellung

    // useEffect-Hook, um die Benutzer-ID beim ersten Laden der Seite abzurufen
    useEffect(() => {
        const fetchUserId = async () => {
            try {
                // Ruft die aktuelle Benutzer-ID ab und speichert sie im State
                const response = await ApiService.getCurrentUser();
                setUserId(response.data.id);
            } catch (error) {
                console.error('Fehler beim Abrufen des Benutzers:', error); // Fehlerprotokollierung in der Konsole
                alert('Fehler beim Abrufen der Benutzerinformationen.');
            }
        };
        fetchUserId();
    }, []);

    // Handler für die Eingabefelder der Bankdaten
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBankDetails({
            ...bankDetails,
            [name]: value,
        });
    };

    // Handler für das Absenden des Zahlungsformulars
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Überprüfung, ob die Benutzer-ID geladen ist
        if (!userId) {
            alert('Benutzerinformationen konnten nicht geladen werden.');
            return;
        }

        try {
            // Erstellt das `orderDTO`-Objekt für die Bestellung
            const orderDTO = {
                userId: userId,
                orderItems: [
                    {
                        productId: productId,
                        quantity: quantity,
                    },
                ],
            };
            await ApiService.createOrder(orderDTO); // Sendet die Bestellung an die API

            alert('Zahlung erfolgreich! Ihre Bestellung wurde aufgegeben.');
            navigate('/order-confirmation'); // Leitet zur Bestätigungsseite weiter
        } catch (error) {
            console.error('Fehler beim Erstellen der Bestellung:', error); // Fehlerprotokollierung in der Konsole
            alert('Es gab ein Problem bei der Verarbeitung Ihrer Bestellung.');
        }
    };

    return (
        <div className="payment-page"> {/* Haupt-Container für die Zahlungsseite */}
            <div className="payment-container"> {/* Container für das Zahlungsformular */}
                <h1>Zahlungsdetails</h1>
                <form onSubmit={handleSubmit}> {/* Formular zum Abschließen der Zahlung */}
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
                    <button className="payment-button" type="submit">
                        Zahlung abschließen
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PaymentPage;
