import React from "react";
import { darkenColor } from "@/lib/utils/colorHelper";
import { TabItem, BorderRadius } from "./StyledTabs.types";
import {
    getBorderRadiusClassLeft,
    getBorderRadiusClassRight,
} from "./StyledTabs.utils";

interface TabButtonProps {
    item: TabItem;
    isSelected: boolean;
    isFirst: boolean;
    isLast: boolean;
    defaultBgColor: string;
    defaultTextColor: string;
    borderRadius: BorderRadius;
    fullWidth: boolean;
    onClick: () => void;
}

/**
 * Composant bouton d'un tab individuel
 */
export const TabButton: React.FC<TabButtonProps> = ({
    item,
    isSelected,
    isFirst,
    isLast,
    defaultBgColor,
    defaultTextColor,
    borderRadius,
    fullWidth,
    onClick,
}) => {
    // Utiliser les couleurs spécifiques de l'item ou les couleurs par défaut
    const itemBgColor = item.bgColor || defaultBgColor;
    const itemTextColor = item.textColor || defaultTextColor;
    // Si bgColorHover est défini, l'utiliser, sinon calculer avec darkenColor
    const itemDarkerColor = item.bgColorHover || darkenColor(itemBgColor, 0.31);

    return (
        <div
            className={`
                ${fullWidth ? "w-full" : ""} 
                ${item.sticky ? "sticky left-0 z-10" : ""} 
                inline-flex w-full flex-col justify-start items-start 
                ${!isSelected ? "group" : ""} 
                ${item.wrapperClasses || ""}
            `}
        >
            <button
                role="tab"
                aria-selected={isSelected}
                onClick={onClick}
                style={{
                    backgroundColor: isSelected ? itemDarkerColor : itemBgColor,
                    boxShadow: !isSelected
                        ? `0px 5px 0px 0px ${itemDarkerColor}`
                        : `0px 0px 0px 0px ${itemDarkerColor}`,
                    outline: `1.75px solid ${itemDarkerColor}`,
                    outlineOffset: "-1.25px",
                    color: itemTextColor,
                }}
                className={`
                    ${isSelected ? "translate-y-[4.75px]" : ""}
                    ${!isSelected ? "cursor-pointer group-hover:shadow-none! group-hover:translate-y-[4.75px]" : "cursor-default"}
                    ${isFirst ? getBorderRadiusClassLeft(borderRadius) : ""}
                    ${isLast ? getBorderRadiusClassRight(borderRadius) : ""}
                    transition-all duration-300 
                    self-stretch h-12 px-9 py-3 
                    ${item.buttonClasses || ""}
                    inline-flex justify-center items-center gap-2
                    text-white text-base font-normal font-['Belanosima']
                `}
            >
                {item.title}
            </button>
        </div>
    );
};
