import { BorderRadius } from "./StyledTabs.types";

/**
 * Retourne les classes Tailwind pour les border-radius gauche (first tab)
 */
export const getBorderRadiusClassLeft = (borderRadius: BorderRadius): string => {
    switch (borderRadius) {
        case "none":
            return "";
        case "sm":
            return "rounded-tl-lg rounded-bl-lg";
        case "md":
            return "rounded-tl-xl rounded-bl-xl";
        case "lg":
            return "rounded-tl-2xl rounded-bl-2xl";
        case "xl":
            return "rounded-tl-3xl rounded-bl-3xl";
        case "full":
            return "rounded-tl-full rounded-bl-full";
        default:
            return "rounded-tl-2xl rounded-bl-2xl";
    }
};

/**
 * Retourne les classes Tailwind pour les border-radius droite (last tab)
 */
export const getBorderRadiusClassRight = (borderRadius: BorderRadius): string => {
    switch (borderRadius) {
        case "none":
            return "";
        case "sm":
            return "rounded-tr-lg rounded-br-lg";
        case "md":
            return "rounded-tr-xl rounded-br-xl";
        case "lg":
            return "rounded-tr-2xl rounded-br-2xl";
        case "xl":
            return "rounded-tr-3xl rounded-br-3xl";
        case "full":
            return "rounded-tr-full rounded-br-full";
        default:
            return "rounded-tr-2xl rounded-br-2xl";
    }
};
