import { Tabs as HeroTabs, Tab } from "@heroui/tabs";
import React from "react";

// Wrapper pour Tabs compatible avec l'API standard
export function Tabs({
    value,
    onValueChange,
    children,
    className = "",
    ...props
}: any) {
    return (
        <HeroTabs
            selectedKey={value}
            onSelectionChange={onValueChange}
            className={className}
            {...props}
        >
            {children}
        </HeroTabs>
    );
}

export const TabsTrigger = Tab;

export function TabsContent({
    value,
    children,
    className = "",
    ...props
}: any) {
    return (
        <div className={className} {...props}>
            {children}
        </div>
    );
}

export function TabsList({ children, className = "", ...props }: any) {
    return (
        <div className={`flex gap-2 mb-4 ${className}`} {...props}>
            {children}
        </div>
    );
}

// Re-export from the tabs folder
export { ClassicTabs } from "./tabs/ClassicTabs";
export { StyledTabs } from "./StyledTabs";
