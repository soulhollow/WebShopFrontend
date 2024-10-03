import React from 'react';
import './Impressum.css';

function Impressum() {
    return (
        <div className="impressum">
            <h2>Impressum</h2>
            <p>
                <strong>Verantwortlich gemäß § 5 TMG:</strong><br />
                MediaFlow GmbH<br />
                Musterstraße 1<br />
                12345 Musterstadt<br />
                Deutschland
            </p>
            <p>
                <strong>Vertreten durch:</strong><br />
                Geschäftsführer: Max Mustermann
            </p>
            <p>
                <strong>Kontakt:</strong><br />
                Telefon: +49 (0)123 456 789<br />
                E-Mail: info@mediaflow.de
            </p>
            <p>
                <strong>Umsatzsteuer-ID:</strong><br />
                Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz: DE123456789
            </p>
            <p>
                <strong>Haftung für Inhalte:</strong><br />
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
            </p>
            <p>
                <strong>Haftung für Links:</strong><br />
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
            </p>
            <p>
                <strong>Datenschutz:</strong><br />
                Informationen zum Datenschutz finden Sie in unserer <a href="/datenschutz">Datenschutzerklärung</a>.
            </p>
        </div>
    );
}

export default Impressum;
