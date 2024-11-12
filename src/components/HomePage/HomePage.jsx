// Importiert React, um die UI-Komponente zu erstellen
import React from 'react';
// Importiert das CSS-Stylesheet für das Styling der Homepage-Komponente
import './HomePage.css';

// Importiert die Unterkomponenten, die auf der Homepage angezeigt werden sollen
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import OverviewImages from './OverviewImages';

// Definiert die HomePage-Komponente, die die Hauptseite der Anwendung darstellt
function HomePage() {
    return (
        <div className="homepage"> {/* Haupt-Container für die Homepage */}
            <HeroSection /> {/* Hero-Sektion für die Einführung oder Begrüßung */}
            <FeaturesSection /> {/* Features-Sektion, die Produktvorteile oder besondere Merkmale zeigt */}
            <OverviewImages /> {/* OverviewImages-Sektion für eine Übersicht oder visuelle Darstellungen */}
        </div>
    );
}

export default HomePage;
