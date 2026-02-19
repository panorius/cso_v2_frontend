export interface AptitudeValue {
    id: string;
    name: string;
    defaultValues: number;
}

export interface AbilityModuleConfig {
    id: string;
    type: "ability";
    title?: string;
    values: AptitudeValue[];
    order: number;
    rolldice?: string;
    modificator?: string;
    hasBonus?: boolean;
    display: "classic" | "dnd" | "cthulhu";
}
