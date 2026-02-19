import { TextModuleConfig } from "./modules/text";
import { NumberModuleConfig } from "./modules/number";
import { CheckboxModuleConfig } from "./modules/checkbox";
import { ListModuleConfig } from "./modules/list";
import { PointModuleConfig } from "./modules/point";
import { TextareaModuleConfig } from "./modules/textarea";
import { AptitudeModuleConfig } from "./modules/aptitude";
import { BalanceModuleConfig } from "./modules/balance";
import { AbilityModuleConfig } from "./modules/ability";
import { GaugeModuleConfig } from "./modules/gauge";
import { IconstatisticModuleConfig } from "./modules/iconstatistic";
import { TableModuleConfig } from "./modules/table";
import { SkillModuleConfig } from "./modules/skill";
import { SeparatorModuleConfig } from "./modules/separator";
import { MasteriesPercentageModuleConfig } from "./modules/masteriespercentage";
import { InventoryModuleConfig } from "./modules/inventory";

// Type union pour tous les modules disponibles
export type ModuleConfig =
    | TextModuleConfig
    | NumberModuleConfig
    | CheckboxModuleConfig
    | ListModuleConfig
    | PointModuleConfig
    | TextareaModuleConfig
    | AptitudeModuleConfig
    | BalanceModuleConfig
    | AbilityModuleConfig
    | GaugeModuleConfig
    | IconstatisticModuleConfig
    | TableModuleConfig
    | SkillModuleConfig
    | SeparatorModuleConfig
    | MasteriesPercentageModuleConfig
    | InventoryModuleConfig;

// Block contient des modules simples
export interface BlockModule {
    id: string;
    order: number;
    type: "block";
    modules: (
        | TextModuleConfig
        | NumberModuleConfig
        | CheckboxModuleConfig
        | ListModuleConfig
        | PointModuleConfig
    )[];
}

// Type union pour les éléments qui peuvent être dans un tab
export type TabModule =
    | BlockModule
    | AbilityModuleConfig
    | TextareaModuleConfig
    | AptitudeModuleConfig
    | BalanceModuleConfig
    | MasteriesPercentageModuleConfig
    | SeparatorModuleConfig
    | GaugeModuleConfig
    | IconstatisticModuleConfig
    | TableModuleConfig
    | SkillModuleConfig
    | InventoryModuleConfig;

// Droits d'accès
export interface ModuleRights {
    moduleId: string;
    view: "ALL" | "GM_ONLY" | "NONE";
    edit: "ALL" | "GM_ONLY" | "NONE";
}

export interface TabRights {
    tab: {
        view: "ALL" | "GM_ONLY" | "NONE";
        edit: "ALL" | "GM_ONLY" | "NONE";
    };
    modules: ModuleRights[];
}

// Tab (onglet) contient plusieurs modules
export interface SchemaTab {
    id: string;
    title: string;
    icon: string;
    order: number;
    rights: TabRights;
    modules: TabModule[];
}

// Configuration hors tabs (niveau, nom, etc.)
export interface OutsideTabsConfig {
    labelName: string;
    labelBiography: string;
    labelGenre: string;
    level?: {
        labelLevel: string;
        defaultValue: number;
        levels: number[];
    };
}

// Paramètres globaux
export interface GlobalSettings {
    allowCustomFields?: boolean;
    strictMode?: boolean;
}

// Schéma complet (peut être player, creature, dice, npc, item, spell)
export interface Schema {
    _id?: { $oid: string };
    templateId?: { $oid: string };
    type: "player" | "creature" | "dice" | "npc" | "item" | "spell";
    version?: { $numberLong: string };
    outsideTabs: OutsideTabsConfig;
    tabs: SchemaTab[];
    globalSettings?: GlobalSettings;
    createdAt?: { $date: string };
    updatedAt?: { $date: string };
}

// Template complet
export interface TemplateVersion {
    players?: number;
    creature?: number;
    dice?: number;
    npc?: number;
    item?: number;
    spell?: number;
}

export interface Template {
    _id?: { $oid: string };
    name: string;
    image?: string | null;
    version?: TemplateVersion;
    schemaIds: Schema[];
    rules?: any | null;
    isPublished?: boolean;
    userId?: { $oid: string };
    contributors?: string[];
    tags?: string[];
    lang?: string;
    createdAt?: { $date: string };
    updatedAt?: { $date: string };
}
