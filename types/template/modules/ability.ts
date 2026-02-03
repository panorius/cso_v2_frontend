export interface AbilityModuleConfig {
    label?: string;
    values: string[];
    rollDiceFormula?: string;
    modFormula?: string;
    hasBonus?: boolean;
    options?: object;
    required?: boolean;
}