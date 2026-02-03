export interface TableRow {
    cells: string[] | number[] | boolean[];
}

export interface TableModuleConfig {
    title?: string;
    rollDiceFormula?: string;
    headers: string[];
    rows: TableRow[];
    hasSumRow?: boolean;
    hasCheckboxColumn?: boolean;
    required?: boolean;
}