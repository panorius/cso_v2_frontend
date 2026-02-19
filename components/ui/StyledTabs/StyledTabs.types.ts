import React from "react";

export type BorderRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";

export interface TabItem {
    key: string;
    title: React.ReactNode;
    content?: React.ReactNode;
    wrapperClasses?: string;
    buttonClasses?: string;
    /** Couleur de fond spécifique à ce tab (override bgColor global) */
    bgColor?: string;
    /** Couleur de fond au survol spécifique à ce tab (override bgColorHover global) */
    bgColorHover?: string;
    /** Couleur du texte spécifique à ce tab (override textColor global) */
    textColor?: string;
    /** Rendre ce tab sticky (fixe lors du scroll horizontal) */
    sticky?: boolean;
    /** Exclure ce tab du calcul de répartition d'espace (utile pour boutons utilitaires) */
    excludeFromLayout?: boolean;
}

export interface StyledTabsProps {
    floatingPanel?: boolean;
    /** Couleur de fond des tabs (par défaut pour tous) */
    bgColor?: string;
    /** Couleur du texte (par défaut pour tous) */
    textColor?: string;
    /** Type de bordure */
    borderRadius?: BorderRadius;
    /** Les items des tabs */
    items?: TabItem[];
    /** Clé du tab sélectionné */
    selectedKey?: string;
    /** Callback quand un tab change */
    onSelectionChange?: (key: string) => void;
    /** Largeur pleine */
    fullWidth?: boolean;
    /** Classe CSS additionnelle */
    className?: string;
    /** Aria label */
    "aria-label"?: string;
    /** Taille des tabs */
    size?: "sm" | "md" | "lg";
    /** Désactiver l'animation du curseur (pour compatibilité) */
    disableCursorAnimation?: boolean;
    /** Ne pas afficher le contenu à l'intérieur (pour gestion externe) */
    renderContentOutside?: boolean;
}
