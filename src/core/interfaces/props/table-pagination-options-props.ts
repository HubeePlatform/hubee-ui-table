export interface TablePaginationOptions {
    pageIndex?: number;
    rowsPerPage?: number;
    withPaginationAtTop?: boolean;
    rowsPerPageOptions?: number[];
}

export const PaginationOptionsDefault = (options?: TablePaginationOptions) => {
    return {
        pageIndex: options?.pageIndex ?? 0,
        rowsPerPage: options?.rowsPerPage ?? 10,
        rowsPerPageOptions: options?.rowsPerPageOptions ?? [5, 10, 25, 30],
        withPaginationAtTop: options?.withPaginationAtTop ?? true,
    } as TablePaginationOptions;
};
