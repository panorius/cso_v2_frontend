export interface AptitudeValue {
    id: string;
    name: string;
    description: string;
}

export interface AptitudeModuleConfig {
    id: string;
    type: "aptitude";
    order: number;
    title: string;
    labelName: string;
    labelDescription: string;
    values?: AptitudeValue[];
}
