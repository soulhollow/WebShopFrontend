// Importiert React, um die UI-Komponente zu erstellen
import React from 'react';

// Importiert das CSS-Stylesheet für das spezifische Styling der BuyPage-Komponente
import './BuyPage.css';

// Importiert die Unterkomponenten für die verschiedenen Abschnitte der BuyPage
import ProductOptionsSection from './ProductOptionsSection';
import FeaturesComparisonSection from './FeaturesComparisonSection';
import CustomerReviewsSection from './CustomerReviewsSection';

// Definiert die BuyPage-Komponente, die als Hauptseite für den Kaufprozess dient
function BuyPage() {
    return (
        <div className="buy-page"> {/* Haupt-Container für die Buy-Seite */}
            <ProductOptionsSection /> {/* Abschnitt für die Auswahl der Produktoptionen */}
            <FeaturesComparisonSection /> {/* Abschnitt zum Vergleich der Produktfunktionen */}
            <CustomerReviewsSection /> {/* Abschnitt für Kundenbewertungen */}
        </div>
    );
}

// Exportiert die BuyPage-Komponente, sodass sie in anderen Teilen der App verwendet werden kann
export default BuyPage;
