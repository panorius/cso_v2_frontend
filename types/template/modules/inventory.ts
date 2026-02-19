import { TextModuleConfig } from "./text";
import { CheckboxModuleConfig } from "./checkbox";
import { NumberModuleConfig } from "./number";
import { ListModuleConfig } from "./list";
import { PointModuleConfig } from "./point";

export type CategoryValue =
    | TextModuleConfig
    | CheckboxModuleConfig
    | NumberModuleConfig
    | ListModuleConfig
    | PointModuleConfig;

export interface CategoryItem {
    id: string;
    icon: string;
    title: string;
    values: CategoryValue[];
}

export interface Currency {
    id: string;
    title: string;
    referencyValue: number;
}

export interface InventoryModuleConfig {
    labels: {
        name: string;
        rarity: string;
        quantity: string;
        description: string;
        weight: string;
    };
    hasRarity?: boolean;
    hasWeight?: boolean;
    categories?: CategoryItem[];
    currencies?: {
        mainReferencyLabel: string;
        others: Currency[];
    };
}
