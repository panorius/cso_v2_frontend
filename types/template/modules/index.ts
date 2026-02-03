export interface ModuleConfig {
    label?: string;
    fieldCount?: number;
    fieldLabels?: string[];
    diceFormula?: string;
    modFormula?: string;
    hasBonus?: boolean;
    placeholder?: string;
    defaultValue?: string | number;
    options?: string;
    max?: number;
    required?: boolean;
}

export interface ModuleDefinition {
    id: string;
    type: ModuleType;
    category: ModuleCategory;
    label: string;
    config: ModuleConfig;
}

export enum ModuleCategory {
    CARACTERISTIQUE = "Module Caractéristique",
    MINI = "Mini Module",
    SIMPLE = "Module Simple",
    INTELLIGENT = "Module Intelligent",
}

export type ModuleType =
    | "stat_simple"
    | "stat_mod"
    | "stat_cthulhu"
    | "text"
    | "number"
    | "list"
    | "points"
    | "checkbox"
    | "textarea"
    | "aptitude"
    | "balance"
    | "skill"
    | "separator"
    | "separator"
    | "gauge"
    | "battlestatistics"
    | "table"
    | "skills"
    | "inventory"
    | "spellbook";
