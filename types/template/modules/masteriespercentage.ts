export interface MasteriesPercentageValue {
    label: string;
    value: string;
    isReadOnly?: boolean;
}

export interface MasteriesPercentageModuleConfig {
    label?: string;
    values: MasteriesPercentageValue[];
    rollDiceFormula?: string;
    required?: boolean;
}