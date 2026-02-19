export interface MasteriesPercentageValue {
    label: string;
    value: string;
    isReadOnly?: boolean;
}

export interface MasteriesPercentageModuleConfig {
    id: string;
    order: number;
    type: "masteriespercentage";
    label?: string;
    values: MasteriesPercentageValue[];
    rollDice?: string;
}
