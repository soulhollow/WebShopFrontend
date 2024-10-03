import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext'; // Import the authentication context
import apiServiceInstance from '../../context/ApiService'; // Import the ApiService
import './ProfilePage.css'; // Import your custom CSS

function ProfilePage() {
  const { isAuthenticated } = useContext(AuthContext); // Get authentication state
  const [purchases, setPurchases] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserIdAndPurchases(); // Fetch userId and then purchases
    }
  }, [isAuthenticated]);

  const fetchUserIdAndPurchases = async () => {
    try {
      // Abrufen der Bestellungen des Nutzers
      const orderResponse = await apiServiceInstance.getOrdersByToken();
      if (orderResponse.status === 200) {
        setPurchases(orderResponse.data); // Assuming the API returns an array of purchases
      } else {
        setError('Failed to load purchases.');
      }
    } catch (err) {
      setError('An error occurred while fetching purchases.');
    }
  };

  if (!isAuthenticated) {
    return <h6 className="message">You need to log in to view your purchases.</h6>;
  }

  return (
    <div className="profile-page">
      <h4 className="title">Your Purchases</h4>
      {error && <p className="error-message">{error}</p>}

      <div className="purchases-grid">
        {purchases.map((purchase) => (
          <div className="card" key={purchase.orderId}>
            <div className="card-content">
              <h6 className="order-id">Order #{purchase.orderId}</h6>
              <p className="product-name">Product: {purchase.productName}</p>
              <p className="quantity">Quantity: {purchase.quantity}</p>
              <p className="price">Price: ${purchase.price.toFixed(2)}</p>
              <p className="status">Status: {purchase.orderStatus}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfilePage;
