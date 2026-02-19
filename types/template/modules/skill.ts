export interface SkillModuleValue {
    id: string;
    label: string;
    defaultValue: string | number;
}

export interface BonusMalusConfig {
    id: string;
    name: string;
    operator: "+" | "-" | "*" | "/";
    value: string | number;
}

export interface SkillModuleConfig {
    id: string;
    type: "skill";
    order: number;
    values: SkillModuleValue[];
    rollDice?: string;
    listBonusMalus?: BonusMalusConfig[];
}
