export interface GaugeValue {
    label: string;
    defaultMinValue?: number;
    defaultMaxValue?: number;
    color?: string;
}

export interface GaugeModuleConfig {
    values: GaugeValue[];
}