export interface AptitudeValue {
    name: string;
    description: string;
}

export interface AptitudeModuleConfig {
    title?: string;
    labelName: string;
    labelDescription: string;
    values?: AptitudeValue[];
    required?: boolean;
}