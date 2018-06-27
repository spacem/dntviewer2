export interface DntData {
    data: any[][];
    columnNames: string[];
    columnTypes: number[];
    numRows: number;
    numColumns: number;
    fileName: string;
    colsToLoad: {[colName: string]: boolean};
}
