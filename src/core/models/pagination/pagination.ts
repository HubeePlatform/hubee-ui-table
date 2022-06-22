export default class PaginationModel {
    from: number;
    size: number;
    total: number;

    constructor({ from = 0, size = 0, total = 0 }) {
        this.from = from;
        this.size = size;
        this.total = total;
    }

    static makeByTable(
        pageIndex: number,
        rowsPerPage: number,
    ): PaginationModel {
        return new PaginationModel({
            from: pageIndex * rowsPerPage,
            size: rowsPerPage,
            total: 0,
        });
    }
}
