export interface SkillModuleValue {
    label: string;
    defaultValue: string;
}

export interface BonusMalusConfig {
    name: string;
    operator: '+' | '-' | '*' | '/';
    value: number;
}

export interface SkillModuleConfig  {
    values: SkillModuleValue[];
    rollDiceFormula?: string;
    listBonusMalus?: BonusMalusConfig[];
    required?: boolean;
}