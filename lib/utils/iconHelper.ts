import React from "react";

/**
 * Utilitaire pour générer une icône à partir d'un string
 * @param iconName - Nom de l'icône (ex: "icon scroll" ou "icon-scroll" ou "scroll")
 * @param size - Taille de l'icône (optionnel)
 * @returns Element React de l'icône
 *
 * @example
 * createIcon("icon scroll") // <i className="icon-scroll" />
 * createIcon("scroll") // <i className="icon-scroll" />
 * createIcon("icon-scroll") // <i className="icon-scroll" />
 * createIcon("icon scroll", "24px") // <i className="icon-scroll" style={{ fontSize: "24px" }} />
 */
export const createIcon = (
    iconName: string,
    size?: string,
): React.ReactElement => {
    // Nettoyer et normaliser le nom de l'icône
    let className = iconName.trim();

    // Remplacer les espaces par des tirets
    className = className.replace(/\s+/g, "-");

    // Ajouter le préfixe "icon-" si pas déjà présent
    if (!className.startsWith("icon-")) {
        className = `icon-${className}`;
    }

    return React.createElement("i", {
        className,
        style: size ? { fontSize: size } : undefined,
    });
};
