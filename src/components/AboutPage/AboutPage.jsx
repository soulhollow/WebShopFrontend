// Importiert das React-Framework, welches für die Erstellung von UI-Komponenten verwendet wird
import React from 'react';

// Importiert die spezifischen CSS-Dateien für das Styling der AboutPage-Komponente
import './AboutPage.css';

// Importiert die Unterkomponenten, die auf der About-Seite angezeigt werden
import OverviewSection from './OverviewSection';
import HowItWorksSection from './HowItWorksSection';
import TeamSection from './TeamSection';

// Definiert die AboutPage-Komponente, welche die Hauptkomponente für die "Über uns"-Seite ist
function AboutPage() {
    return (
        <div className="about-page"> {/* Haupt-Container für die About-Seite */}
            <OverviewSection /> {/* Sektion, die eine Übersicht des Unternehmens darstellt */}
            <HowItWorksSection /> {/* Sektion, die erklärt, wie das Unternehmen arbeitet */}
            <TeamSection /> {/* Sektion, die das Team des Unternehmens vorstellt */}
        </div>
    );
}

// Exportiert die AboutPage-Komponente, sodass sie in anderen Teilen der App verwendet werden kann
export default AboutPage;
