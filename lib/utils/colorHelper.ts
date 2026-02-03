/**
 * Utilitaire pour assombrir une couleur hexadécimale ou CSS
 * Pour l'orange CSO, utilise une transition vers marron au lieu de noir pur
 * @param color - La couleur à assombrir (hex, var(), rgb, etc.)
 * @param amount - Le pourcentage d'assombrissement (0-1, défaut: 0.3)
 * @returns La couleur assombrie
 *
 * @example
 * darkenColor("#FFAF3A") // "#AF874D"
 * darkenColor("var(--color-orange)") // color-mix version
 * darkenColor("#FF5733", 0.5) // assombri de 50%
 */
export const darkenColor = (color: string, amount: number = 0.3): string => {
    // Si la couleur est une variable CSS
    if (color.startsWith("var(")) {
        return `color-mix(in srgb, ${color} ${100 - amount * 100}%, black)`;
    }

    // Si c'est une couleur hex
    if (color.startsWith("#")) {
        const hexColor = color.toUpperCase();

        // Assombrissement standard pour les autres couleurs
        const num = parseInt(color.slice(1), 16);
        const r = Math.max(0, Math.floor((num >> 16) * (1 - amount)));
        const g = Math.max(
            0,
            Math.floor(((num >> 8) & 0xff) * (1.084 - amount)),
        );
        const b = Math.max(0, Math.floor((num & 0xff) * (1.65 - amount)));
        return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
    }

    // Si c'est rgb/rgba, utiliser filter CSS
    return `rgba(0, 0, 0, ${amount})`;
};

/**
 * Utilitaire pour éclaircir une couleur hexadécimale ou CSS
 * @param color - La couleur à éclaircir (hex, var(), rgb, etc.)
 * @param amount - Le pourcentage d'éclaircissement (0-1, défaut: 0.3)
 * @returns La couleur éclaircie
 */
export const lightenColor = (color: string, amount: number = 0.3): string => {
    // Si la couleur est une variable CSS
    if (color.startsWith("var(")) {
        return `color-mix(in srgb, ${color} ${100 - amount * 100}%, white)`;
    }

    // Si c'est une couleur hex
    if (color.startsWith("#")) {
        const num = parseInt(color.slice(1), 16);
        const r = Math.min(
            255,
            Math.floor((num >> 16) + (255 - (num >> 16)) * amount),
        );
        const g = Math.min(
            255,
            Math.floor(
                ((num >> 8) & 0x00ff) + (255 - ((num >> 8) & 0x00ff)) * amount,
            ),
        );
        const b = Math.min(
            255,
            Math.floor((num & 0x0000ff) + (255 - (num & 0x0000ff)) * amount),
        );
        return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
    }

    // Si c'est rgb/rgba, utiliser filter CSS
    return `rgba(255, 255, 255, ${amount})`;
};
