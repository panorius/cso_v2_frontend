export interface ListModuleConfig {
    label?: string;
    values: string[];
    defaultValue?: string[] | string;
    isMultiple?: boolean;
    isVisible?: boolean;
    required?: boolean;
}