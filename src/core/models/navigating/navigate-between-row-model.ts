export default class NavigateBetweenRowModel {
    previousRowId: string;
    currentRowId: string;
    rowData: any;

    constructor(previousRowId: string, currentRowId: string, rowData: any) {
        this.previousRowId = previousRowId;
        this.currentRowId = currentRowId;
        this.rowData = rowData;
    }
}
