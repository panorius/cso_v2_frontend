import React from "react";
import { ModuleCategory, ModuleType, ModuleConfig } from "./types";

export const CATEGORY_ICONS: Record<ModuleCategory, React.ReactNode> = {
    [ModuleCategory.CARACTERISTIQUE]: <i className="w-4 h-4 icon-settings" />,
    [ModuleCategory.MINI]: <i className="w-4 h-4 icon-zap" />,
    [ModuleCategory.SIMPLE]: <i className="w-4 h-4 icon-align-left" />,
    [ModuleCategory.INTELLIGENT]: <i className="w-4 h-4 icon-sparkles" />,
};

export const MODULE_PALETTE: {
    type: ModuleType;
    category: ModuleCategory;
    label: string;
    icon: React.ReactNode;
    initialConfig?: ModuleConfig;
}[] = [
    {
        type: "stat_simple",
        category: ModuleCategory.CARACTERISTIQUE,
        label: "Simple",
        icon: <i className="w-5 h-5 icon-text" />,
        initialConfig: {
            fieldCount: 4,
            fieldLabels: ["Créativité", "Focus", "Harmonie", "Passion"],
        },
    },
    {
        type: "stat_mod",
        category: ModuleCategory.CARACTERISTIQUE,
        label: "avec MOD",
        icon: <i className="w-5 h-5 icon-hash" />,
        initialConfig: {
            fieldCount: 1,
            fieldLabels: ["Force"],
            hasBonus: false,
        },
    },
    {
        type: "stat_cthulhu",
        category: ModuleCategory.CARACTERISTIQUE,
        label: "Cthulhu",
        icon: <i className="w-5 h-5 icon-shield" />,
        initialConfig: { fieldCount: 1, fieldLabels: ["Apparence"] },
    },

    {
        type: "text",
        category: ModuleCategory.MINI,
        label: "Texte",
        icon: <i className="w-5 h-5 icon-type" />,
    },
    {
        type: "number",
        category: ModuleCategory.MINI,
        label: "Nombre",
        icon: <i className="w-5 h-5 icon-hash" />,
    },
    {
        type: "list",
        category: ModuleCategory.MINI,
        label: "Liste",
        icon: <i className="w-5 h-5 icon-list" />,
    },
    {
        type: "points",
        category: ModuleCategory.MINI,
        label: "Points",
        icon: <i className="w-5 h-5 icon-target" />,
    },
    {
        type: "checkbox",
        category: ModuleCategory.MINI,
        label: "Case à cocher",
        icon: <i className="w-5 h-5 icon-check-square" />,
    },

    {
        type: "textarea",
        category: ModuleCategory.SIMPLE,
        label: "Zone de texte",
        icon: <i className="w-5 h-5 icon-align-left" />,
    },
    {
        type: "aptitude",
        category: ModuleCategory.SIMPLE,
        label: "Aptitudes",
        icon: <i className="w-5 h-5 icon-shield" />,
    },
    {
        type: "balance",
        category: ModuleCategory.SIMPLE,
        label: "Balance",
        icon: <i className="w-5 h-5 icon-scale" />,
    },
    {
        type: "skill",
        category: ModuleCategory.SIMPLE,
        label: "Compétence",
        icon: <i className="w-5 h-5 icon-percentage" />,
    },
    {
        type: "separator",
        category: ModuleCategory.SIMPLE,
        label: "Séparateur",
        icon: <i className="w-5 h-5 icon-separator" />,
    },

    {
        type: "gauge",
        category: ModuleCategory.INTELLIGENT,
        label: "Barres",
        icon: <i className="w-5 h-5 icon-icons" />,
    },
    {
        type: "battlestatistics",
        category: ModuleCategory.INTELLIGENT,
        label: "Statistiques",
        icon: <i className="w-5 h-5 icon-icons" />,
    },
    {
        type: "table",
        category: ModuleCategory.INTELLIGENT,
        label: "Tableau",
        icon: <i className="w-5 h-5 icon-table" />,
    },
    {
        type: "skills",
        category: ModuleCategory.INTELLIGENT,
        label: "Compétences",
        icon: <i className="w-5 h-5 icon-list" />,
    },

    {
        type: "inventory",
        category: ModuleCategory.BDD,
        label: "Inventaire",
        icon: <i className="w-5 h-5 icon-bagpack" />,
    },
    {
        type: "spellbook",
        category: ModuleCategory.BDD,
        label: "Livre de sort",
        icon: <i className="w-5 h-5 icon-spellbook" />,
    },
];
