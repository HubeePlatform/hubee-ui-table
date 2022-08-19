export interface TableInfiniteScrollOptions {
    enableInfiniteScroll?: boolean;
}

export const InfiniteScrollOptionsDefault = (
    options?: TableInfiniteScrollOptions,
) => {
    return {
        enableInfiniteScroll: options?.enableInfiniteScroll ?? false,
    } as TableInfiniteScrollOptions;
};
