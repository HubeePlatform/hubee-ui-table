import { Sizing } from '@/core/models/common';

export interface TableStyleOptions {
    withContainerBorder?: boolean;
    withContainerBorderSizing?: Sizing;
    withTableInfoResult?: boolean;
    withZebraStriped?: boolean;
}

export const StyleOptionsDefault = (options?: TableStyleOptions) => {
    return {
        withContainerBorder: options?.withContainerBorder ?? true,
        withContainerBorderSizing:
            options?.withContainerBorderSizing ?? Sizing.MEDIUM,
        withTableInfoResult: options?.withTableInfoResult ?? true,
        withZebraStriped: options?.withZebraStriped ?? false,
    } as TableStyleOptions;
};
