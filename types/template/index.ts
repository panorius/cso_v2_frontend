import { ModuleCategory } from "@types/template/modules";

export interface ThemeConfig {
    primaryColor: string;
    accentColor: string;
    backgroundColor: string;
    headerColor: string;
}

export interface ModuleRights {
    moduleId?: string;
    view: "ALL" | "GM_ONLY" | "NONE";
    edit: "ALL" | "GM_ONLY" | "NONE";
}

export interface SheetSection {
    id: string;
    title: string;
    icon: string;
    order: number;
    rights: {
        tab: ModuleRights;
        modules: ModuleRights[];
    };
    modules: ModuleCategory[];
}

export interface CharacterSheetTemplate {
    name: string;
    gameSystem: string;
    description: string;
    sections: SheetSection[];
    theme: ThemeConfig;
}
