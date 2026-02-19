export interface SeparatorModuleConfig {
    id: string;
    order: number;
    type: "separator";
    label?: string;
    icons?: {
        left?: string;
        right?: string;
    };
}
