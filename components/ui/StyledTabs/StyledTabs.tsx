import React from "react";
import { StyledTabsProps } from "./StyledTabs.types";
import { TabButton } from "./TabButton";
import { TabPanel } from "./TabPanel";

/**
 * Composant Tabs stylisé avec gestion des couleurs et animations
 * - Supporte personnalisation des couleurs par tab
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

    const activeContent = items.find((item) => item.key === activeKey)?.content;

    return (
        <div
            className={`${fullWidth ? "w-full" : ""} ${className}`}
            role="tablist"
            aria-label={ariaLabel}
        >
            <div
                className={`inline-flex pt-[5px] ${fullWidth ? "w-full" : ""} overflow-x-auto py-2`}
            >
                {items.map((item, index) => (
                    <TabButton
                        key={item.key}
                        item={item}
                        isSelected={item.key === activeKey}
                        isFirst={index === 0}
                        isLast={index === items.length - 1}
                        defaultBgColor={bgColor}
                        defaultTextColor={textColor}
                        borderRadius={borderRadius}
                        fullWidth={fullWidth}
                        onClick={() => handleTabClick(item.key)}
                    />
                ))}
            </div>

            {/* Tab panel */}
            {!renderContentOutside && activeContent && (
                <TabPanel
                    content={activeContent}
                    floatingPanel={floatingPanel}
                    borderRadius={borderRadius}
                />
            )}
        </div>
    );
};