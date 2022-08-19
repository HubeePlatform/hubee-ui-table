export default class NavigateBetweenRowModel {
    previousRowId: string;
    currentRowId: string;

    constructor(previousRowId: string, currentRowId: string) {
        this.previousRowId = previousRowId;
        this.currentRowId = currentRowId;
    }
}
