//à revoir, mettre une clé de traduction i18nternationale pour label
export enum ModuleCategory {
    ABILITY = "Module Caractéristique",
    MINI = "Mini Module",
    SIMPLE = "Module Simple",
    INTELLIGENT = "Module Intelligent",
    STOCKAGE = "Module de Stockage",
}

export type ModuleType =
    | "ability"
    | "text"
    | "number"
    | "list"
    | "points"
    | "checkbox"
    | "textarea"
    | "aptitude"
    | "balance"
    | "masteriespercentage"
    | "separator"
    | "gauge"
    | "iconstatistics"
    | "table"
    | "skills"
    | "inventory"
    | "spellbook";

export interface ThemeConfig {
    primaryColor: string;
    accentColor: string;
    backgroundColor: string;
    headerColor: string;
}

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
    min?: number;
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

export interface SheetSection {
    id: string;
    title: string;
    icon: string;
    modules: ModuleDefinition[];
}

export interface CharacterSheetTemplate {
    name: string;
    gameSystem: string;
    description: string;
    sections: SheetSection[];
    theme: ThemeConfig;
}
