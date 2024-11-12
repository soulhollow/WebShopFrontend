// Importiert React und die benötigten Hooks `useContext`, `useEffect` und `useState`
import React, { useContext, useEffect, useState } from 'react';
// Importiert den Authentifizierungs-Kontext, um den Login-Status zu prüfen
import AuthContext from '../../context/AuthContext';
// Importiert den ApiService, um die Bestellungen des Nutzers abzurufen
import apiServiceInstance from '../../context/ApiService';
// Importiert das CSS-Stylesheet für das Styling der Profilseite
import './ProfilePage.css';

function ProfilePage() {
  // Ermittelt den Authentifizierungsstatus
  const { isAuthenticated } = useContext(AuthContext);
  // Definiert den State für die Bestellungen und eventuelle Fehlernachrichten
  const [purchases, setPurchases] = useState([]);
  const [error, setError] = useState('');

  // useEffect-Hook führt `fetchUserIdAndPurchases` nur aus, wenn der Nutzer eingeloggt ist
  useEffect(() => {
    if (isAuthenticated) {
      fetchUserIdAndPurchases();
    }
  }, [isAuthenticated]);

  // Funktion zum Abrufen der Bestellungen des Nutzers
  const fetchUserIdAndPurchases = async () => {
    try {
      // Ruft die Bestellungen des Nutzers anhand des Tokens ab
      const orderResponse = await apiServiceInstance.getOrdersByToken();
      if (orderResponse.status === 200) {
        setPurchases(orderResponse.data); // Speichert die erhaltenen Bestellungen im State
      } else {
        setError('Failed to load purchases.'); // Setzt eine Fehlermeldung bei fehlgeschlagenem Abruf
      }
    } catch (err) {
      setError('An error occurred while fetching purchases.'); // Setzt eine Fehlermeldung bei einem API-Fehler
    }
  };

  // Zeigt eine Nachricht an, wenn der Nutzer nicht eingeloggt ist
  if (!isAuthenticated) {
    return <h6 className="message">You need to log in to view your purchases.</h6>;
  }

  return (
      <div className="profile-page"> {/* Haupt-Container für die Profilseite */}
        <h4 className="title">Your Purchases</h4> {/* Titel für die Bestellübersicht */}
        {error && <p className="error-message">{error}</p>} {/* Fehlernachricht anzeigen, falls vorhanden */}

        <div className="purchases-grid"> {/* Grid-Layout für die Bestellkarten */}
          {purchases.map((purchase) => (
              <div className="card" key={purchase.orderId}> {/* Einzelne Karte für jede Bestellung */}
                <div className="card-content">
                  <h6 className="order-id">Order #{purchase.orderId}</h6> {/* Bestellnummer */}
                  <p className="product-name">Product: {purchase.productName}</p> {/* Produktname */}
                  <p className="quantity">Quantity: {purchase.quantity}</p> {/* Bestellmenge */}
                  <p className="price">Price: ${purchase.price.toFixed(2)}</p> {/* Preis */}
                  <p className="status">Status: {purchase.orderStatus}</p> {/* Bestellstatus */}
                </div>
              </div>
          ))}
        </div>
      </div>
  );
}

export default ProfilePage;
