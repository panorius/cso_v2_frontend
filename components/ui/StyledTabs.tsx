import React from "react";
import { darkenColor } from "@/lib/utils/colorHelper";

interface StyledTabsProps {
    floatingPanel?: boolean;
    /** Couleur de fond des tabs */
    bgColor?: string;
    /** Couleur du texte */
    textColor?: string;
    /** Type de bordure */
    borderRadius?: "none" | "sm" | "md" | "lg" | "xl" | "full";
    /** Les items des tabs */
    items?: Array<{
        key: string;
        title: React.ReactNode;
        content?: React.ReactNode;
    }>;
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

/**
 * Composant Tabs stylisé avec gestion des couleurs et animations
 * - Supporte personnalisation des couleurs
 * - Animation de hover avec ombre portée
 * - Configurable et réutilisable
 */
export const StyledTabs: React.FC<StyledTabsProps> = ({
    bgColor = "#FFAF3A",
    fullWidth = false,
    floatingPanel = false,
    textColor = "white",
    borderRadius = "lg",
    items = [],
    selectedKey,
    onSelectionChange,
    className = "",
    "aria-label": ariaLabel,
    renderContentOutside = false,
}) => {
    const [activeKey, setActiveKey] = React.useState(
        selectedKey || items[0]?.key,
    );
    const darkerColor = darkenColor(bgColor, 0.31);

    React.useEffect(() => {
        if (selectedKey) {
            setActiveKey(selectedKey);
        }
    }, [selectedKey]);

    const handleTabClick = (key: string) => {
        setActiveKey(key);
        if (onSelectionChange) {
            onSelectionChange(key);
        }
    };

    const getBorderRadiusClass = () => {
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

    const getBorderRadiusClassRight = () => {
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

    const activeContent = items.find((item) => item.key === activeKey)?.content;

    return (
        <div
            className={`${fullWidth ? "w-full" : ""} ${className}`}
            role="tablist"
            aria-label={ariaLabel}
        >
            <div
                className={`inline-flex pt-[5px] ${fullWidth ? "w-full" : ""}`}
            >
                {items.map((item, index) => {
                    const isSelected = item.key === activeKey;
                    const isFirst = index === 0;
                    const isLast = index === items.length - 1;

                    return (
                        <div
                            key={item.key}
                            className={`${fullWidth ? "w-full" : ""} inline-flex w-full flex-col justify-start items-start ${!isSelected ? "group" : ""}`}
                        >
                            <button
                                role="tab"
                                aria-selected={isSelected}
                                onClick={() => handleTabClick(item.key)}
                                style={{
                                    backgroundColor: isSelected
                                        ? darkerColor
                                        : bgColor,
                                    boxShadow: !isSelected
                                        ? `0px 5px 0px 0px ${darkerColor}`
                                        : `0px 0px 0px 0px ${darkerColor}`,
                                    outline: !isSelected
                                        ? `1.75px solid ${darkerColor}`
                                        : `1.75px solid ${darkerColor}`,
                                    outlineOffset: "-1.25px",
                                    color: textColor,
                                }}
                                className={`
                                    ${isSelected ? "translate-y-[4.75px]" : ""}
                                    ${!isSelected ? "cursor-pointer group-hover:shadow-none! group-hover:translate-y-[4.75px]" : "cursor-default"}
                                    ${isFirst ? getBorderRadiusClass() : ""}
                                    ${isLast ? getBorderRadiusClassRight() : ""}
                                    transition-all duration-300 
                                    self-stretch h-12 px-9 py-3 
                                    inline-flex justify-center items-center gap-2
                                    text-white text-base font-normal font-['Belanosima']
                                `}
                            >
                                {item.title}
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Tab panel */}
            {!renderContentOutside && (
                <div
                    role="tabpanel"
                    style={{
                        backgroundColor: floatingPanel
                            ? "var(--color-grey-dark)"
                            : "transparent",
                        borderBottomLeftRadius:
                            borderRadius === "xl" ? "30px" : "12px",
                        borderBottomRightRadius:
                            borderRadius === "xl" ? "30px" : "12px",
                    }}
                    className={`p-6 ${floatingPanel ? "mt-20 rounded-3xl bg-grey-dark" : ""}`}
                >
                    {activeContent}
                </div>
            )}
        </div>
    );
};
