export interface LoadOnDemandOptions {
    enableLoadOnDemand?: boolean;
    /** This is  number a milliseconds for load demand interval. */
    loadOnDemandInterval?: number;
    loadOnDemandShowLoading?: boolean;
}

export const LoadOnDemandOptionsDefault = (options?: LoadOnDemandOptions) => {
    return {
        loadOnDemandInterval: options?.loadOnDemandInterval ?? 500,
        loadOnDemandShowLoading: options?.loadOnDemandShowLoading ?? true,
        enableLoadOnDemand: options?.enableLoadOnDemand ?? false,
    } as LoadOnDemandOptions;
};
