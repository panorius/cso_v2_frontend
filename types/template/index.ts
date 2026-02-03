import { ModuleCategory } from "@types/template/modules";

export interface ThemeConfig {
    primaryColor: string;
    accentColor: string;
    backgroundColor: string;
    headerColor: string;
}

export interface SheetSection {
    id: string;
    title: string;
    icon: string;
    modules: ModuleCategory[];
}

export interface CharacterSheetTemplate {
    name: string;
    gameSystem: string;
    description: string;
    sections: SheetSection[];
    theme: ThemeConfig;
}
