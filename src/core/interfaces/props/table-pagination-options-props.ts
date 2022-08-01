export interface TablePaginationOptions {
    rowsPerPage?: number;
    withPaginationAtTop?: boolean;
    rowsPerPageOptions?: number[];
}

export const PaginationOptionsDefault = (options?: TablePaginationOptions) => {
    return {
        rowsPerPage: options?.rowsPerPage ?? 10,
        rowsPerPageOptions: options?.rowsPerPageOptions ?? [5, 10, 25, 30],
        withPaginationAtTop: options?.withPaginationAtTop ?? true,
    } as TablePaginationOptions;
};
