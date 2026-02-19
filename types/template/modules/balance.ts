export interface BalanceConfigMinMax {
    icon?: string;
    label: string;
    defaultValue?: number;
}

export interface BalanceModuleConfig {
    id: string;
    order: number;
    type: "balance";
    title?: string;
    step: number;
    defaultValue?: number;
    maximum: BalanceConfigMinMax;
    minimum: BalanceConfigMinMax;
}
