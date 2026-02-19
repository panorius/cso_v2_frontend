export interface ListModuleConfig {
    id: string;
    type: "list";
    order: number;
    title: string;
    values: string[];
    defaultValue?: string[] | string;
    isMultiple: boolean;
    hasLabelVisible: boolean;
}
