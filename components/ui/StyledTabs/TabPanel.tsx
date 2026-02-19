import React from "react";
import { BorderRadius } from "./StyledTabs.types";

interface TabPanelProps {
    content: React.ReactNode;
    floatingPanel: boolean;
    borderRadius: BorderRadius;
}

/**
 * Composant panel de contenu d'un tab
 */
export const TabPanel: React.FC<TabPanelProps> = ({
    content,
    floatingPanel,
    borderRadius,
}) => {
    return (
        <div
            role="tabpanel"
            style={{
                backgroundColor: floatingPanel
                    ? "var(--color-grey-dark)"
                    : "transparent",
                borderBottomLeftRadius: borderRadius === "xl" ? "30px" : "12px",
                borderBottomRightRadius:
                    borderRadius === "xl" ? "30px" : "12px",
            }}
            className={`p-6 ${floatingPanel ? "mt-20 rounded-3xl bg-grey-dark" : ""}`}
        >
            {content}
        </div>
    );
};
