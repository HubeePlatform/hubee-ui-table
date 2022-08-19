export interface TableEventOptions {
    enableNavigateKeyboardEvent?: boolean;
    enableSearchModelRequestEvent?: boolean;
}

export const EventOptionsDefault = (options?: TableEventOptions) => {
    return {
        enableNavigateKeyboardEvent:
            options?.enableNavigateKeyboardEvent ?? false,

        enableSearchModelRequestEvent:
            options?.enableSearchModelRequestEvent ?? true,
    } as TableEventOptions;
};
