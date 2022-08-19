export interface TablePaginationOptions {
    enablePagination?: boolean;
    pageIndex?: number;
    rowsPerPage?: number;
    withPaginationAtTop?: boolean;
    rowsPerPageOptions?: number[];
}

export const PaginationOptionsDefault = (options?: TablePaginationOptions) => {
    return {
        pageIndex: options?.pageIndex ?? 0,
        rowsPerPage: options?.rowsPerPage ?? 10,
        enablePagination: options?.enablePagination ?? true,
        withPaginationAtTop: options?.withPaginationAtTop ?? true,
        rowsPerPageOptions: options?.rowsPerPageOptions ?? [5, 10, 25, 30],
    } as TablePaginationOptions;
};
