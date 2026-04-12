-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 12 avr. 2026 à 02:37
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ap3_tkt`
--

-- --------------------------------------------------------

--
-- Structure de la table `alerte`
--

CREATE TABLE `alerte` (
  `id_alr` int(11) NOT NULL,
  `contenu_alr` text NOT NULL,
  `id_usr_alr` int(11) NOT NULL,
  `id_nv_alr` int(11) NOT NULL,
  `dateCréation` date NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `alerte`
--

INSERT INTO `alerte` (`id_alr`, `contenu_alr`, `id_usr_alr`, `id_nv_alr`, `dateCréation`) VALUES
(1, 'Inspection Space Mountain programmée', 1, 1, '2026-03-04'),
(2, 'Temps d’attente très élevé à Pirates of the Caribbean', 2, 2, '2026-03-12'),
(3, 'Test sécurité Ratatouille effectué', 3, 3, '2026-03-16'),
(4, 'Inspection de sécurité Big Thunder Mountain', 1, 4, '2026-03-08'),
(5, 'ATTENTION !', 8, 1, '2026-04-09'),
(6, 'Problème majeur sur Space Montains', 8, 1, '2026-04-09'),
(7, 'Graissage de Space Montain', 8, 1, '2026-04-09'),
(9, 'J\'ai perdu mon téléphone à Space Montains', 7, 1, '2026-04-09');

-- --------------------------------------------------------

--
-- Structure de la table `equipes`
--

CREATE TABLE `equipes` (
  `id_eqp` int(11) NOT NULL,
  `libelle_eqp` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `equipes`
--

INSERT INTO `equipes` (`id_eqp`, `libelle_eqp`) VALUES
(1, 'Equipe Attraction Disneyland'),
(2, 'Equipe Attraction Studios'),
(3, 'Equipe Maintenance'),
(4, 'Équipe Administration'),
(5, 'Surveillance Sécurité');

-- --------------------------------------------------------

--
-- Structure de la table `infrastructure`
--

CREATE TABLE `infrastructure` (
  `id_ift` int(11) NOT NULL,
  `nom_ift` varchar(30) NOT NULL,
  `description_ift` text NOT NULL,
  `image_ift` text NOT NULL,
  `ouvert` int(11) NOT NULL,
  `tempsAttente` varchar(10) NOT NULL,
  `tailleLimite` float NOT NULL,
  `pourEnceinte` tinyint(1) NOT NULL,
  `pourLesPetits` tinyint(1) NOT NULL,
  `id_prc_ift` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `infrastructure`
--

INSERT INTO `infrastructure` (`id_ift`, `nom_ift`, `description_ift`, `image_ift`, `ouvert`, `tempsAttente`, `tailleLimite`, `pourEnceinte`, `pourLesPetits`, `id_prc_ift`) VALUES
(2, 'Pirates of the Caribbean', 'Attraction bateau dans Adventureland', 'pirates.jpg', 0, '1h00', 0, 0, 0, 1),
(3, 'Ratatouille Adventure', 'Attraction 4D dans le parc Studios', 'ratatouille.jpg', 1, '1h00', 0, 0, 0, 2),
(4, 'Tower of Terror', 'Chute libre dans le parc Studios', 'tower.jpg', 1, '1h00', 0, 0, 0, 2);

-- --------------------------------------------------------

--
-- Structure de la table `missions`
--

CREATE TABLE `missions` (
  `id_msn` int(11) NOT NULL,
  `libelle_msn` varchar(50) NOT NULL,
  `type_msn` varchar(25) NOT NULL,
  `dateDebut_msn` date NOT NULL,
  `dateFin_msn` date DEFAULT NULL,
  `id_eqp_msn` int(11) NOT NULL,
  `id_ift_msn` int(11) NOT NULL,
  `status_msn` tinyint(1) DEFAULT 0
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `missions`
--

INSERT INTO `missions` (`id_msn`, `libelle_msn`, `type_msn`, `dateDebut_msn`, `dateFin_msn`, `id_eqp_msn`, `id_ift_msn`, `status_msn`) VALUES
(2, 'Maintenance Pirates', 'Maintenance', '2026-04-01', '0000-00-00', 1, 2, 0),
(4, 'Révision Tower of Terror', 'Maintenance', '2026-04-02', '2026-04-11', 0, 4, 1);

-- --------------------------------------------------------

--
-- Structure de la table `niveaualerte`
--

CREATE TABLE `niveaualerte` (
  `id_nv` int(11) NOT NULL,
  `nom_nv` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `niveaualerte`
--

INSERT INTO `niveaualerte` (`id_nv`, `nom_nv`) VALUES
(1, 'Information'),
(2, 'Faible'),
(3, 'Important'),
(4, 'Critique');

-- --------------------------------------------------------

--
-- Structure de la table `parc`
--

CREATE TABLE `parc` (
  `id_prc` int(11) NOT NULL,
  `nom_prc` varchar(40) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `parc`
--

INSERT INTO `parc` (`id_prc`, `nom_prc`) VALUES
(1, 'Parc Disneyland'),
(2, 'Walt Disney Studios');

-- --------------------------------------------------------

--
-- Structure de la table `poste`
--

CREATE TABLE `poste` (
  `id_pst` int(11) NOT NULL,
  `libelle_pst` varchar(50) NOT NULL,
  `id_eqp_pst` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `poste`
--

INSERT INTO `poste` (`id_pst`, `libelle_pst`, `id_eqp_pst`) VALUES
(1, 'Technicien attraction', 1),
(2, 'Opérateur attraction', 2),
(3, 'Technicien maintenance', 3),
(4, 'Utilisateur Test', 0),
(5, 'Administrateur', 0),
(6, 'Vigile de sécurité', 4),
(7, 'Administrateur Sécurité', 4);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id_usr` int(11) NOT NULL,
  `login_usr` varchar(25) NOT NULL,
  `nom_usr` varchar(25) NOT NULL,
  `prenom_usr` varchar(25) NOT NULL,
  `role_usr` int(11) NOT NULL,
  `mdp_usr` varchar(255) NOT NULL,
  `num_usr` int(11) NOT NULL,
  `email_usr` varchar(50) NOT NULL,
  `id_msn_usr` int(11) NOT NULL,
  `id_pst_usr` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id_usr`, `login_usr`, `nom_usr`, `prenom_usr`, `role_usr`, `mdp_usr`, `num_usr`, `email_usr`, `id_msn_usr`, `id_pst_usr`) VALUES
(29, 'Admin', '', 'Administrateur', 1, '$2b$10$8r6ul6b5vLcrhivTJwFRPuxAPFiYYWpNFqNYKuIDyi4JmMsHuidX2', 692358467, 'administrateur@disneyland.fr', 0, 7),
(30, 'LMartin', 'Martin', 'Léa', 0, '$2b$10$0vUgLbEnPBFj/W/eeaFU3OcsIDsgJZ4qym5mx2L/wR32eatQgoqVG', 685943710, 'lea.martin@disneyland.fr', 0, 2),
(31, 'LBernard', 'Bernard', 'Lucas', 0, '$2b$10$IAM6zpnUDq0Tt3dxU82k6.NEATE4yIv0IecZMC0xTuIAx0Y6qsdUG', 0, 'lucas.bernard@disneyland.fr', 0, 3),
(32, 'EDubois', 'Dubois', 'Emma', 1, '$2b$10$7OUdgFQCalbHZgcRlodr7egJLnq5oL.XnJnz2E2l/llTqUb0w/d9O', 0, '', 0, 7),
(33, 'HLaurent', 'Laurent', 'Hugo', 0, '$2b$10$yuphXBJK/yJegSxrM1DB2.rjSPbnvOKmTCsjv/xstDT1pCB3Y5Mkm', 0, 'hugo.laurent@disneyland.fr', 0, 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `alerte`
--
ALTER TABLE `alerte`
  ADD PRIMARY KEY (`id_alr`);

--
-- Index pour la table `equipes`
--
ALTER TABLE `equipes`
  ADD PRIMARY KEY (`id_eqp`);

--
-- Index pour la table `infrastructure`
--
ALTER TABLE `infrastructure`
  ADD PRIMARY KEY (`id_ift`);

--
-- Index pour la table `missions`
--
ALTER TABLE `missions`
  ADD PRIMARY KEY (`id_msn`);

--
-- Index pour la table `niveaualerte`
--
ALTER TABLE `niveaualerte`
  ADD PRIMARY KEY (`id_nv`);

--
-- Index pour la table `parc`
--
ALTER TABLE `parc`
  ADD PRIMARY KEY (`id_prc`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_usr`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `alerte`
--
ALTER TABLE `alerte`
  MODIFY `id_alr` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `equipes`
--
ALTER TABLE `equipes`
  MODIFY `id_eqp` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `infrastructure`
--
ALTER TABLE `infrastructure`
  MODIFY `id_ift` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `missions`
--
ALTER TABLE `missions`
  MODIFY `id_msn` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `niveaualerte`
--
ALTER TABLE `niveaualerte`
  MODIFY `id_nv` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `parc`
--
ALTER TABLE `parc`
  MODIFY `id_prc` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id_usr` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
