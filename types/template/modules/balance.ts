export interface BalanceConfigMinMax {
    icon?: string;
    label: string;
    defaultValue?: number;
}

export interface BalanceModuleConfig {
    title?: string;
    step: number;
    defaultValue?: number;
    maximum: BalanceConfigMinMax;
    minimum: BalanceConfigMinMax;
    required?: boolean;
}