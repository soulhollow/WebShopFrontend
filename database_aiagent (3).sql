-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 21. Nov 2024 um 17:50
-- Server-Version: 10.4.32-MariaDB
-- PHP-Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `database_aiagent`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `contact_message`
--

CREATE TABLE `contact_message` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `contact_message`
--

INSERT INTO `contact_message` (`id`, `email`, `message`, `name`, `subject`) VALUES
(1, 'test@mail', 'lange nachricht so ca 500 zeichren oder so man sollte esi ffofhoiehfoisnv  \nfuewfhoiaf\nfiefoieoifoehoiff', 'testname', 'testsubject'),
(2, 'test2@mail.de', 'fefewfsgs<dgf', 'test2', 'dfefefe'),
(3, 'drewfjbewolif@sefvoipewjf.de', 'gvewgvw<sbvlswvp<-is\neavbaVB\n\'avjbaljvqaö\n\newv\n', 'Florian', 'test'),
(4, 'drewfjbewolif@sefvoipewjf.de', 'gvewgvw<sbvlswvp<-is\neavbaVB\n\'avjbaljvqaö\n\newv\n', 'Florian', 'test'),
(6, 'test@test', 'efefef', 'test', 'efe'),
(7, 'fwf@fewf', 'fsfefdf', 'fewf', 'efefs'),
(8, 'wfwfwf@dfwf.de', 'wffwfwf', 'wfwf', 'fwefw'),
(9, 'tr@tr', 'fefw', 'tr', 'ef');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `order_status` varchar(20) NOT NULL,
  `total_amount` decimal(38,2) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `orders`
--

INSERT INTO `orders` (`id`, `created_at`, `order_status`, `total_amount`, `updated_at`, `user_id`) VALUES
(1, '2024-09-01 10:00:00.000000', 'pending', 150.50, NULL, 1001),
(2, '2024-09-02 12:30:00.000000', 'completed', 250.00, '2024-09-03 09:15:00.000000', 1006),
(3, '2024-09-05 15:45:00.000000', 'canceled', 75.00, '2024-09-05 17:00:00.000000', 1006),
(4, '2024-09-06 18:20:00.000000', 'processing', 320.75, NULL, 1004),
(5, '2024-11-21 17:22:28.000000', 'PENDING', 50.00, '2024-11-21 17:22:28.000000', 1006),
(6, '2024-11-21 17:33:48.000000', 'PENDING', 100.00, '2024-11-21 17:33:48.000000', 1006);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `order_items`
--

CREATE TABLE `order_items` (
  `id` bigint(20) NOT NULL,
  `price` decimal(38,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `order_id` bigint(20) NOT NULL,
  `product_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `order_items`
--

INSERT INTO `order_items` (`id`, `price`, `quantity`, `order_id`, `product_id`) VALUES
(1, 50.00, 3, 1, 101),
(2, 100.00, 1, 2, 102),
(3, 25.00, 2, 3, 103),
(4, 80.00, 4, 4, 104),
(5, 50.00, 1, 5, 101),
(6, 100.00, 1, 6, 102);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `payments`
--

CREATE TABLE `payments` (
  `id` bigint(20) NOT NULL,
  `amount` decimal(38,2) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `payment_status` varchar(20) NOT NULL,
  `stripe_payment_id` varchar(100) NOT NULL,
  `order_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `payments`
--

INSERT INTO `payments` (`id`, `amount`, `created_at`, `payment_status`, `stripe_payment_id`, `order_id`) VALUES
(1, 150.50, '2024-09-01 11:00:00.000000', 'succeeded', 'sp_001', 1),
(2, 250.00, '2024-09-02 13:00:00.000000', 'succeeded', 'sp_002', 2),
(3, 75.00, '2024-09-05 16:00:00.000000', 'failed', 'sp_003', 3),
(4, 320.75, '2024-09-06 19:00:00.000000', 'pending', 'sp_004', 4);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `products`
--

CREATE TABLE `products` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `description` text DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(38,2) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `products`
--

INSERT INTO `products` (`id`, `created_at`, `description`, `name`, `price`, `updated_at`) VALUES
(101, '2024-08-15 09:30:00.000000', 'Für Einsteiger, die 1-2 Social-Media-Kanäle verwalten möchten. Ideal für Einzelunternehmer.', 'Basic Social Media Management', 50.00, NULL),
(102, '2024-08-20 14:00:00.000000', 'Für Unternehmen, die bis zu 5 Social-Media-Kanäle mit fortgeschrittener Content-Strategie verwalten möchten.', 'Advanced Social Media Management', 100.00, NULL),
(103, '2024-08-25 12:45:00.000000', 'Für Unternehmen mit unbegrenzten Kanälen und Fokus auf Videos, Kampagnen und Influencer-Marketing.', 'Premium Social Media Management', 150.00, NULL),
(104, '2024-08-30 16:20:00.000000', 'Rundum-Service für große Unternehmen. Enthält globale Kampagnen, 24/7 Support und datengetriebene Optimierungen.', 'Enterprise Social Media Management', 250.00, NULL);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'customer'),
(3, 'seller');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `text_content`
--

CREATE TABLE `text_content` (
  `id` bigint(20) NOT NULL,
  `content` text DEFAULT NULL,
  `key` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `text_content`
--

INSERT INTO `text_content` (`id`, `content`, `key`) VALUES
(3, 'Unsere Leistungen:', 'hleistung'),
(4, 'Maßgeschneiderte Social Media Strategien', 'leistung1'),
(5, 'Regelmäßiges Posting & Content-Planung', 'leistung2'),
(6, 'Performance-Tracking & Analytics', 'leistung3'),
(7, 'Community-Management & Engagement', 'leistung4'),
(11, 'Flexiel', 'hfeature_flexibel'),
(12, 'Individuell', 'hfeature_individuell'),
(13, 'Effektiv', 'hfeature_effektiv'),
(14, 'Bei MediaFlow sind Sie vollkommen flexibel: Passen Sie Ihren Tarif jederzeit an - ganz nach ihren individuellen Bedürfnissen.', 'feature_flexibel'),
(15, 'MediaFlow richtet sich exakt nach Ihren Anforderungen - maßgeschneidert auf Ihr Unternehmen und spezifischen Zielen.', 'feature_individuell'),
(16, 'Mit MediaFlow arbeiten Sie effizient und zielgerichtet. Dank unseres Fachwissens sind unsere Strategien so optimiert, dass Sie Ihre Ziele möglich schnell und effektiv erreichen.', 'feature_effektiv'),
(20, 'Wir sind MediaFlow, eine leidenschaftliche Social Media Management Agentur, die sich darauf spezialisiert hat, Unternehmen dabei zu helfen, in der digitalen Welt zu wachsen und erfolgreich zu sein. Unser Team aus kreativen Köpfen, Strategen und Social Med', 'ueber_uns'),
(22, 'Schritt 1: Wählen Sie Ihren Tarif', 'Hschritt1_tarif'),
(23, 'Entscheiden Sie sich für den Tarif, der am besten zu Ihren Anforderungen passt.', 'schritt1_tarif'),
(24, 'Schritt 2: Erstellen Sie ihr Profil und teilen Sie Ihre Ziele mit', 'Hschritt2_tarif'),
(25, 'Richten Sie Ihr Profil ein und informieren Sie uns über ihre spezifischen Ziele und Bedürfnisse.', 'schritt2_profil'),
(26, 'Schritt 3: Profitieren Sie von maßgeschneiderten Plänen', 'HSchritt_3'),
(27, 'Nutzen Sie unsere effektiven und individuell abgestimmten Pläne, um Ihre Ziele optimal zu erreichen.', 'Schritt_3'),
(28, 'Unser Team', 'h4'),
(29, 'Head of Social Media Strategy\n\nSimon ist verantwortlich für die Entwicklung und Umsetzung unserer umfassenden Social Media Strategien. Er analysiert Markttrends und Zielgruppen, um maßgeschneiderte Kampagnen zu kreieren, die optimal performen und den Wach', 'team_simon_fischer'),
(30, 'Creative Content Manager\n\nFlorian sorgt für die kreative Gestaltung und Umsetzung von Inhalten. Er entwickelt einzigartige Posts, Stories und Videos, die genau die richtigen Emotionen wecken und die Marken unserer Kunden authentisch präsentieren.', 'team_florian_ruffner'),
(31, 'Community Engagement Specialist\n\nMelia kümmert sich um die Interaktion mit den Zielgruppen. Sie ist die Stimme unserer Kunden auf den sozialen Netzwerken, beantwortet Kommentare, moderiert Diskussionen und sorgt für ein starkes Community-Engagement.', 'team_melia_alexander'),
(32, 'Performance Marketing Analyst\n\nFranziska ist für das Monitoring und die Analyse der Kampagnen-Performance zuständig. Sie trackt die wichtigsten KPIs und sorgt dafür, dass alle Strategien datenbasiert optimiert werden, um den maximalen Erfolg zu erzielen.', 'team_franziska_schöning'),
(33, 'Simon Fischer', 'Name_Simon'),
(34, 'Florian Ruffner', 'Name_Florian'),
(35, 'Melia Alexander', 'Name_Melia'),
(36, 'Franziska Schöning', 'Name_Franzi'),
(37, 'Wählen Sie Ihren AI Agent Plan', 'ai_agent_plan'),
(40, 'David S.', 'Hkunden_feedback_David'),
(42, 'Fantastisches Team! Unsere Social Media Präsenz hat sich dank der kreativen Strategien und der professionellen Betreuung enorm verbessert. Klare Empfehlung!', 'kunden_feedback_Anna'),
(43, 'Sehr zufrieden mit der Arbeit! Die Inhalte sind kreativ und sprechen unsere Zielgruppe gut an.', 'kunden_feedback_David'),
(44, 'Super Betreuung und gute Ergebnisse. Wir haben mehr Reichweite und Engagement erzielt.', 'kunden_feedbackLisa'),
(48, 'Performance-Tracking & Analyse	', 'Feature3'),
(50, 'Paulinenstraße 50\n70178, Stuttgart', 'kontakt_adresse'),
(51, 'Phone: +49 711 320 660 - 0', 'kontakt_telefon'),
(52, 'Email: info@dhbw-stuttgart.de', 'kontakt_email'),
(53, 'Was umfasst das Social Media Management genau?', 'faq_social_media_management'),
(54, 'Unser Social Media Management umfasst die Erstellung von Inhalten, die Pflege von Social-Media-Profilen, das Community Management, die Analyse von Erfolgsmetriken und die Optimierung der Social-Media-Strategie für eine bestmögliche Performance.', 'faq_social_media_management_answer'),
(55, 'Wie lange dauert es, bis Ergebnisse sichtbar werden?', 'faq_ergebnisse_zeit'),
(56, 'Ergebnisse können je nach Ziel und Plattform variieren. In der Regel sind erste Veränderungen in Reichweite und Engagement nach 1-2 Monaten sichtbar, während signifikante Erfolge oft nach 3-6 Monaten zu erwarten sind.', 'faq_ergebnisse_zeit_answer'),
(57, 'Wie sieht der Onboarding Prozess aus?', 'faq_onboarding_prozess'),
(58, 'Zu Beginn führen wir ein ausführliches Gespräch, um Ihre Ziele, Zielgruppe und Markenidentität zu verstehen. Anschließend erstellen wir eine maßgeschneiderte Strategie, die den Grundstein für alle zukünftigen Aktivitäten legt.', 'faq_onboarding_prozess_answer'),
(59, 'Welche Plattformen betreut MediaFlow?', 'faq_plattformen_betreuung'),
(60, 'Wir betreuen eine Vielzahl von Social-Media-Plattformen, darunter Instagram, Facebook, LinkedIn, Twitter, TikTok und Pinterest. Auf Anfrage unterstützen wir auch andere Netzwerke, die zu Ihrer Zielgruppe passen.', 'faq_plattformen_betreuung_answer'),
(61, 'Kann ich mein Abonnement flexibel kündigen?', 'faq_flexible_kuendigung'),
(62, 'Das Abonnement kann jederzeit ohne langfristige Vertragsbindung gekündigt oder verändert werden. Es entstehen keine zusätzlichen Kosten durch die Beendigung des Abonnements.', 'faq_flexible_kuendigung_answer'),
(63, 'Gibt es eine kostenlose Version?', 'faq_kostenlose_version'),
(64, 'Eine kostenlose Version unseres Social Media Managements bieten wir nicht an, da die Entwicklung einer individuellen Strategie und die kontinuierliche Betreuung einen erheblichen Zeit- und Ressourcenaufwand erfordern. Jede Kampagne wird sorgfältig geplant', 'faq_kostenlose_version_answer'),
(65, 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d328.6807850250151!2d9.170493853704725!3d48.77336969123125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4799dbb3d78fef99%3A0x31d0d5a752c2215!2sDHBW%20Stuttgart%20-%20Fakult%C3%A4t%20Wirtschaft!5e', 'map_embed_src'),
(66, 'Connect with Us', 'social_media_header'),
(67, 'https://linkedin.com', 'social_media_linkedin'),
(68, '/path-to-linkedin-icon.png', 'social_media_linkedin_icon'),
(69, 'https://twitter.com', 'social_media_twitter'),
(70, '/path-to-twitter-icon.png', 'social_media_twitter_icon'),
(71, 'https://facebook.com', 'social_media_facebook'),
(72, '/path-to-facebook-icon.png', 'social_media_facebook_icon'),
(73, 'Impressum', 'impressum_header'),
(74, '<strong>Verantwortlich gemäß § 5 TMG:</strong><br />MediaFlow GmbH<br />Musterstraße 1<br />12345 Musterstadt<br />Deutschland', 'impressum_responsible'),
(75, '<strong>Vertreten durch:</strong><br />Geschäftsführer: Max Mustermann', 'impressum_representative'),
(76, '<strong>Kontakt:</strong><br />Telefon: +49 (0)123 456 789<br />E-Mail: info@mediaflow.de', 'impressum_contact'),
(77, '<strong>Umsatzsteuer-ID:</strong><br />Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz: DE123456789', 'impressum_vat_id'),
(78, '<strong>Haftung für Inhalte:</strong><br />Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.', 'impressum_content_liability'),
(79, '<strong>Haftung für Links:</strong><br />Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.', 'impressum_links_liability'),
(80, '<strong>Datenschutz:</strong><br />Informationen zum Datenschutz finden Sie in unserer <a href=\"/datenschutz\">Datenschutzerklärung</a>.', 'impressum_privacy'),
(81, 'Datenschutzerklärung', 'datenschutz_header'),
(82, 'Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Hier finden Sie alle Informationen über die Erhebung, Verarbeitung und Nutzung Ihrer Daten auf unserer Website.', 'datenschutz_text'),
(83, 'Das sagen unsere Kunden', 'customer_reviews_header'),
(84, '{\"name\": \"Anna M.\", \"text\": \"Fantastisches Team! Unsere Social Media Präsenz hat sich dank der kreativen Strategien und der professionellen Betreuung enorm verbessert. Klare Empfehlung!\", \"rating\": \"★★★★★\"}', 'customer_review_1'),
(85, '{\"name\": \"David S.\", \"text\": \"Sehr zufrieden mit der Arbeit! Die Inhalte sind kreativ und sprechen unsere Zielgruppe gut an.\", \"rating\": \"★★★★☆\"}', 'customer_review_2'),
(86, '{\"name\": \"Lisa K.\", \"text\": \"Super Betreuung und gute Ergebnisse. Wir haben mehr Reichweite und Engagement erzielt.\", \"rating\": \"★★★★☆\"}', 'customer_review_3'),
(87, 'Features vergleichen', 'features_comparison_header'),
(88, '{\"feature\": \"Kanäle\", \"productA\": \"1-2 Kanäle\", \"productB\": \"3-5 Kanäle\", \"productC\": \"Unbegrenzte Kanäle\", \"productD\": \"Rundum-Service\"}', 'feature_comparison_1'),
(89, '{\"feature\": \"Inhalte\", \"productA\": \"Basis-Content\", \"productB\": \"Strategieentwicklung\", \"productC\": \"Maßgeschneiderte Kampagnen\", \"productD\": \"Globale Kampagnen\"}', 'feature_comparison_2'),
(90, '{\"feature\": \"Berichte\", \"productA\": \"Regelmäßige Posts\", \"productB\": \"Regelmäßige Reports\", \"productC\": \"Videos & Ads\", \"productD\": \"Datenoptimierung\"}', 'feature_comparison_3'),
(91, '{\"feature\": \"Support\", \"productA\": \"Performance-Berichte\", \"productB\": \"Influencer-Kooperation\", \"productC\": \"Live-Streaming\", \"productD\": \"24/7 Support\"}', 'feature_comparison_4'),
(92, '&copy; 2024 MediaFlow. All rights reserved. <a href=\"/impressum\">Impressum</a> | <a href=\"/datenschutz\">Datenschutzerklärung</a>', 'footer_bottom_text'),
(93, '{\"link\": \"/\", \"label\": \"Home\"}', 'footer_nav_home'),
(94, '{\"link\": \"/about\", \"label\": \"About\"}', 'footer_nav_about'),
(95, '{\"link\": \"/buy\", \"label\": \"Buy\"}', 'footer_nav_buy'),
(96, '{\"link\": \"/contact\", \"label\": \"Contact\"}', 'footer_nav_contact'),
(97, 'Key Features', 'features_section_header'),
(98, '{\"title\": \"Flexibel\", \"description\": \"Bei MediaFlow sind Sie vollkommen flexibel: Passen Sie Ihren Tarif jederzeit an - ganz nach ihren individuellen Bedürfnissen.\", \"image\": \"/path-to-flexibel.png\"}', 'feature_1'),
(99, '{\"title\": \"Individuell\", \"description\": \"MediaFlow richtet sich exakt nach Ihren Anforderungen - maßgeschneidert auf Ihr Unternehmen und spezifischen Zielen.\", \"image\": \"/path-to-individuell.jpg\"}', 'feature_2'),
(100, '{\"title\": \"Effektiv\", \"description\": \"Mit MediaFlow arbeiten Sie effizient und zielgerichtet. Dank unseres Fachwissens sind unsere Strategien so optimiert, dass Sie Ihre Ziele möglich schnell und effektiv erreichen.\", \"image\": \"/path-to-effektiv.jpg\"}', 'feature_3'),
(101, 'Willkommen in der Zukunft Ihres Social Media Erfolgs', 'hero_header'),
(102, 'Willkommen auf unserer Website für professionelles Social Media Management! Hier finden Sie alles, was Sie brauchen, um Ihre Marke auf den sozialen Medien erfolgreich zu positionieren und Ihre Zielgruppe effektiv zu erreichen. Egal ob Sie Ihre Followerzah', 'hero_text'),
(103, 'Unsere Leistungen:', 'hero_services_header'),
(104, '[\"Maßgeschneiderte Social Media Strategien\", \"Regelmäßiges Posting & Content-Planung\", \"Performance-Tracking & Analytics\", \"Community-Management & Engagement\"]', 'hero_services_list'),
(105, 'Lassen Sie uns gemeinsam Ihre Online-Präsenz optimieren! Starten Sie jetzt mit einer kostenlosen Erstberatung.', 'hero_cta_text'),
(106, '#SocialMediaManagement #ContentStrategy #OnlineMarketing', 'hero_hashtags'),
(107, 'Ein kleiner Einblick in unsere Arbeit', 'overview_images_header'),
(108, '/path-to-handy.jpg', 'overview_image_1'),
(109, '/path-to-schreibtisch.jpg', 'overview_image_2'),
(110, 'Erfahre mehr in einem kostenlosen Beratungsgespräch!', 'overview_cta_text'),
(111, 'Wie es funktioniert', 'how_it_works_header'),
(112, '{\"title\": \"Schritt 1: Wählen Sie Ihren Tarif\", \"description\": \"Entscheiden Sie sich für den Tarif, der am besten zu Ihren Anforderungen passt.\"}', 'how_it_works_step_1'),
(113, '{\"title\": \"Schritt 2: Erstellen Sie ihr Profil und teilen Sie Ihre Ziele mit\", \"description\": \"Richten Sie Ihr Profil ein und informieren Sie uns über ihre spezifischen Ziele und Bedürfnisse.\"}', 'how_it_works_step_2'),
(114, '{\"title\": \"Schritt 3: Profitieren Sie von maßgeschneiderten Plänen\", \"description\": \"Nutzen Sie unsere effektiven und individuell abgestimmten Pläne, um Ihre Ziele optimal zu erreichen.\"}', 'how_it_works_step_3'),
(115, 'Wer sind wir?', 'overview_section_header'),
(116, 'Wir sind MediaFlow, eine leidenschaftliche Social Media Management Agentur, die sich darauf spezialisiert hat, Unternehmen dabei zu helfen, in der digitalen Welt zu wachsen und erfolgreich zu sein. Unser Team aus kreativen Köpfen, Strategen und Social Med', 'overview_section_text'),
(117, 'Unser Team', 'team_section_header'),
(131, '{\"name\": \"Simon Fischer\", \"title\": \"Head of Social Media Strategy\", \"description\": \"Simon ist verantwortlich für die Entwicklung und Umsetzung unserer umfassenden Social Media Strategien. Er analysiert Markttrends und Zielgruppen, um maßgeschneiderte Kampagnen zu kreieren, die optimal performen und den Wachstumskurs unserer Kunden unterstützen.\"}', 'team_member_1'),
(132, '{\"name\": \"Florian Ruffner\", \"title\": \"Creative Content Manager\", \"description\": \"Florian sorgt für die kreative Gestaltung und Umsetzung von Inhalten. Er entwickelt einzigartige Posts, Stories und Videos, die genau die richtigen Emotionen wecken und die Marken unserer Kunden authentisch präsentieren.\"}', 'team_member_2'),
(133, '{\"name\": \"Melia Alexander\", \"title\": \"Community Engagement Specialist\", \"description\": \"Melia kümmert sich um die Interaktion mit den Zielgruppen. Sie ist die Stimme unserer Kunden auf den sozialen Netzwerken, beantwortet Kommentare, moderiert Diskussionen und sorgt für ein starkes Community-Engagement.\"}', 'team_member_3'),
(134, '{\"name\": \"Franziska Schöning\", \"title\": \"Performance Marketing Analyst\", \"description\": \"Franziska ist für das Monitoring und die Analyse der Kampagnen-Performance zuständig. Sie trackt die wichtigsten KPIs und sorgt dafür, dass alle Strategien datenbasiert optimiert werden, um den maximalen Erfolg zu erzielen.\"}', 'team_member_4'),
(135, 'Bestellung Erfolgreich!', 'order_confirmation_header'),
(136, 'Vielen Dank für Ihre Bestellung. Sie können den Status ihrer Bestellung in Meinem Profil sehen.', 'order_confirmation_message'),
(137, 'Zurück zur Startseite', 'order_confirmation_link_text'),
(138, 'Basic Social Media Management', 'product_name_A'),
(139, 'Advanced Social Media Management', 'product_name_B'),
(140, 'Premium Social Media Management', 'product_name_C'),
(141, 'Enterprise Social Media Management', 'product_name_D');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(20) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `username` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`id`, `created_at`, `email`, `password`, `role`, `updated_at`, `username`) VALUES
(1, '2024-09-08 19:04:07.000000', 'your@email.de', '$2a$10$l.xbbzXfA80LkK5m.6AMH.DvCk/uNlCNTy4FUJw/zb52wj97oIsAm', 'USER', '2024-09-08 19:04:07.000000', 'test'),
(2, '2024-09-08 19:20:44.000000', 'as@email.de', '$2a$10$u8tPBCKdV2m0os/IIEmenuOcm.jQ2a5ZHfQGX527BgDRrNOFnHrse', 'USER', '2024-09-08 19:20:44.000000', 'alex'),
(1001, '2024-08-01 10:00:00.000000', 'user1@example.com', 'hashedpassword1', 'customer', NULL, 'user1'),
(1002, '2024-08-02 11:15:00.000000', 'user2@example.com', 'hashedpassword2', 'admin', NULL, 'user2'),
(1003, '2024-08-03 13:25:00.000000', 'user3@example.com', 'hashedpassword3', 'seller', NULL, 'user3'),
(1004, '2024-08-04 15:40:00.000000', 'user4@example.com', 'hashedpassword4', 'customer', NULL, 'user4'),
(1005, '2024-09-08 14:27:26.000000', 'user10@example.com', '$2a$10$sFAFfiqt0KvfEU/0kDAsK..4hiKlUy4FqYXeU5WA0/cFAX8qWEOmW', 'USER', '2024-09-08 14:27:26.000000', 'user10'),
(1006, '2024-09-09 20:44:37.000000', 'admin@admin', '$2a$10$4uvHupOBIoho5Aqhjkmc9ePsfysoMFD9V.o7Ig3ZiBK8mf7O5sBUW', 'USER', '2024-09-09 20:44:37.000000', 'admin'),
(1007, '2024-09-09 20:45:21.000000', 'admin2@admin2', '$2a$10$lJy5X1QqgWKVfcPhSnoI5uTJZSP3Sh2ZgJjukqFeLAb1XbTNS5VVq', 'USER', '2024-09-09 20:45:21.000000', 'admin2'),
(1008, '2024-09-12 14:42:17.000000', 'user@user.de', '$2a$10$hwR8hp/IvPlvqt8sDTp3r.rUpHWyme0n3RnjZVEdBeJSKADaovrnu', 'USER', '2024-09-12 14:42:17.000000', 'user123'),
(1009, '2024-09-12 14:45:01.000000', 'ein@user', '$2a$10$yUbVKDFgl1S4e1uXA/3ozehD9amRCHuGFdV0/p6CQWu7cbnp7WGga', 'USER', '2024-09-12 14:45:01.000000', 'noch'),
(1010, '2024-09-12 14:45:57.000000', 'test3@test', '$2a$10$9UjlmA/ZZ5NNoQWPyGVyvOwWmuxwtX0q7dPkjzIdSgGRkZDs.idP2', 'USER', '2024-09-12 14:45:57.000000', 'test2'),
(1011, '2024-09-14 13:53:41.000000', 'lorenz@lorenz.de', '$2a$10$YegxJZtPV4YNaTk9kPvrjer1/VsqXxoHBfCQK2lKTZjgaOZWx60D.', 'USER', '2024-09-14 13:53:41.000000', 'lorenz'),
(1012, '2024-09-29 19:52:13.000000', 'simon@gmx.de', '$2a$10$E2BymSkuOPpDrMGYC4RFz.fSaRWG.Mtwuh.IMLj3O5M6cfDKbAQDC', 'USER', '2024-09-29 19:52:13.000000', 'SimonFischer'),
(1013, '2024-09-29 20:13:40.000000', 'lk@de', '$2a$10$efdlx05ukcXiy.vU.RXHo.JO.k2u3tvnKrG9nZ3MfylcXAnc7LuLS', 'USER', '2024-09-29 20:13:40.000000', 'Leonie'),
(1014, '2024-09-30 23:15:29.000000', 'h@h', '$2a$10$zkisbQEQPuxPoI1/.AUvveWoRa4wOSBC3/UvcnK6FVcAqfDChNFm.', 'USER', '2024-09-30 23:15:29.000000', 'h'),
(1015, '2024-10-03 12:39:40.000000', 'f@f.de', '$2a$10$2fMT6IR7vLcSh3/x2bsBN.TytF/gV674euQMZPx7SMN5jFjNeHLdC', 'USER', '2024-10-03 12:39:40.000000', 'f');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user_roles`
--

CREATE TABLE `user_roles` (
  `role_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `user_roles`
--

INSERT INTO `user_roles` (`role_id`, `user_id`) VALUES
(1, 1002),
(2, 1001),
(3, 1003);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `contact_message`
--
ALTER TABLE `contact_message`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK32ql8ubntj5uh44ph9659tiih` (`user_id`);

--
-- Indizes für die Tabelle `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKbioxgbv59vetrxe0ejfubep1w` (`order_id`),
  ADD KEY `FKocimc7dtr037rh4ls4l95nlfi` (`product_id`);

--
-- Indizes für die Tabelle `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKpa8n3vjxi2n9k8ugdwugik00u` (`stripe_payment_id`),
  ADD UNIQUE KEY `UK8vo36cen604as7etdfwmyjsxt` (`order_id`);

--
-- Indizes für die Tabelle `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKofx66keruapi6vyqpv6f2or37` (`name`);

--
-- Indizes für die Tabelle `text_content`
--
ALTER TABLE `text_content`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `key` (`key`);

--
-- Indizes für die Tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`),
  ADD UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`);

--
-- Indizes für die Tabelle `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`role_id`,`user_id`),
  ADD KEY `FKhfh9dx7w3ubf1co1vdev94g3f` (`user_id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `contact_message`
--
ALTER TABLE `contact_message`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT für Tabelle `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT für Tabelle `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT für Tabelle `payments`
--
ALTER TABLE `payments`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT für Tabelle `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT für Tabelle `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT für Tabelle `text_content`
--
ALTER TABLE `text_content`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=142;

--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1016;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `FK32ql8ubntj5uh44ph9659tiih` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints der Tabelle `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `FKbioxgbv59vetrxe0ejfubep1w` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `FKocimc7dtr037rh4ls4l95nlfi` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints der Tabelle `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `FK81gagumt0r8y3rmudcgpbk42l` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Constraints der Tabelle `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `FKh8ciramu9cc9q3qcqiv4ue8a6` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  ADD CONSTRAINT `FKhfh9dx7w3ubf1co1vdev94g3f` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
