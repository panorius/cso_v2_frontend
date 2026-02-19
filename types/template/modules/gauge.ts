export interface GaugeValue {
    id: string;
    label: string;
    hasNegativeValues?: boolean;
    defaultMinValue?: number;
    defaultMaxValue?: number;
    color?: string;
}

export interface GaugeModuleConfig {
    id: string;
    type: "gauge";
    order: number;
    values: GaugeValue[];
}
