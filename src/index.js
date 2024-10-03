import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';



const root = ReactDOM.createRoot(document.getElementById('root')); // Erstelle ein Root-Element

root.render(
    <React.StrictMode>
        <AuthProvider> {/* Umschließe die App mit AuthProvider */}
            <App />
        </AuthProvider>
    </React.StrictMode>
);