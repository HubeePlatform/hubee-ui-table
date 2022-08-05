export interface TableEventOptions {
    enableSearchModelRequestEvent?: boolean;
}

export const EventOptionsDefault = (options?: TableEventOptions) => {
    return {
        enableSearchModelRequestEvent:
            options?.enableSearchModelRequestEvent ?? true,
    } as TableEventOptions;
};
