export interface TableRow {
    cells: string[] | number[] | boolean[];
}

export interface TableModuleConfig {
    id: string;
    type: "table";
    order: number;
    title?: string;
    rollDice?: string;
    headers: string[];
    rows: TableRow[];
    hasSumRow?: boolean;
    hasCheckboxColumn?: boolean;
}
