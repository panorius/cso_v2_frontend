export interface CategoryValue {
    label: string;
}

export interface CategoryItem {
    icon: string;
    label: string;
    values: CategoryValue[];
}

export interface Currency {
    label: string;
    referencyValue: number;
}


export interface InventoryModuleConfig {
    labelName?: string;
    hasRarity?: boolean;
    labelRarity?: string;
    labelQuantity?: string;
    labelDescription?: string;
    hasWeight?: boolean;
    labelWeight?: string;
    categories?: CategoryItem[];
    currencies?: {
        mainReferencyLabel: string;
        others: Currency[];
    }
    required?: boolean;
}