export interface IconstatisticModuleValue {
    id: string;
    icon: string;
    label: string;
    defaultValue: string;
}

export interface IconstatisticModuleConfig {
    id: string;
    order: number;
    type: "iconstatistic";
    values: IconstatisticModuleValue[];
}
