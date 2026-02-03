import React from "react";
import { Button as HeroButton } from "@heroui/button";
import { createIcon } from "@/lib/utils/iconHelper";
import { darkenColor } from "@/lib/utils/colorHelper";
export type { ButtonProps } from "@heroui/button";

export const Button = HeroButton;

export const ClassicButton = (
    props: React.ComponentProps<typeof HeroButton>,
    isIconOnly: boolean | undefined = false,
) => <HeroButton {...props} variant="flat" isIconOnly={isIconOnly} />;

interface StyledButtonProps
    extends Omit<React.ComponentProps<typeof HeroButton>, "children"> {
    /** Le texte du bouton */
    children?: React.ReactNode;
    bgColor?: string;
    roundedFull?: boolean;
    /** L'icône à afficher (élément React, classe CSS, ou JSX) */
    icon?: React.ReactNode | string;
    /** Position de l'icône par rapport au texte */
    iconPosition?: "left" | "right" | "only";
    /** Taille de l'icône en pixels */
    iconSize?: string;
    buttonType?: "classic" | "squared" | "rounded";
}

/**
 * Composant Button stylisé avec gestion des icônes
 * - Supporte icône seule, icône à gauche ou à droite du texte
 * - Style bordered avec hauteur confortable
 */
export const StyledButton: React.FC<StyledButtonProps> = ({
    children,
    bgColor = "var(--color-orange)",
    icon,
    iconPosition = "left",
    iconSize = "20px",
    className = "",
    buttonType = "classic",
    ...props
}) => {
    const isIconOnly = iconPosition === "only" || (!children && !!icon);
    const buttonId = React.useId();

    // Rendu de l'icône
    const renderIcon = () => {
        if (!icon) return null;

        if (typeof icon === "string") {
            // Utiliser createIcon pour gérer les formats avec espaces
            // Ex: "icon scroll" ou "icon-scroll" ou "scroll"
            return createIcon(icon, iconSize);
        }

        // Si c'est un élément React
        return icon;
    };

    const content = isIconOnly ? (
        renderIcon()
    ) : (
        <div className="flex items-center gap-2">
            {iconPosition === "left" && renderIcon()}
            <span>{children}</span>
            {iconPosition === "right" && renderIcon()}
        </div>
    );

    // Styles spécifiques selon le type de bouton
    const getButtonStyles = () => {
        const baseStyle = bgColor
            ? {
                  backgroundColor: bgColor,
                  borderColor: bgColor,
                  boxShadow: `0 6px 0 0 ${darkenColor(bgColor, 0.31)}`,
                  borderLeft: `1.5px solid ${darkenColor(bgColor, 0.31)}`,
                  borderRight: `1.5px solid ${darkenColor(bgColor, 0.31)}`,
                  borderTop: `1.5px solid ${darkenColor(bgColor, 0.31)}`,
                  borderBottom: `none`,
              }
            : {};

        switch (buttonType) {
            case "classic":
                return {
                    ...baseStyle,
                    padding: isIconOnly ? "0" : "0 24px",
                };
            case "squared":
                return {
                    ...baseStyle,
                    width: 40,
                    height: 40,
                    padding: isIconOnly ? "0" : "0 20px",
                };
            case "rounded":
                return {
                    ...baseStyle,
                    width: 40,
                    height: 40,
                    borderRadius: "9999px",
                    padding: isIconOnly ? "0" : "0 28px",
                };
            default:
                return baseStyle;
        }
    };

    const darkerColor = bgColor ? darkenColor(bgColor, 0.3) : "";
    const buttonClass = `styled-button-${buttonId.replace(/:/g, "")}`;

    return (
        <>
            {bgColor && (
                <style>
                    {`
                        .${buttonClass} {
                            transition: transform 0.15s ease, box-shadow 0.15s ease;
                        }
                        .${buttonClass}:hover:not(:disabled) {
                            transform: translateY(6px);
                            box-shadow: 0 2px 0 0 ${darkerColor} !important;
                        }
                        .${buttonClass}:active:not(:disabled) {
                            transform: translateY(6px);
                            box-shadow: 0 0px 0 0 ${darkerColor} !important;
                        }
                    `}
                </style>
            )}
            <HeroButton
                {...props}
                isIconOnly={isIconOnly}
                variant="bordered"
                className={`h-15 min-h-10 max-w-fit ${bgColor ? buttonClass : ""} ${className}`}
                style={getButtonStyles()}
                radius="lg"
            >
                {content}
            </HeroButton>
        </>
    );
};
