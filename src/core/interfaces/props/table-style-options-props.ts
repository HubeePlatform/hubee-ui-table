import { Sizing } from '@/core/models/common';

export interface TableStyleOptions {
    withContainerBorder?: boolean;
    withContainerBorderSizing?: Sizing;
    globalFilterWithContainerBorder?: boolean;
    withTableInfoResult?: boolean;
    withZebraStriped?: boolean;
    classNameRoot?: string;
    borderInCell?: boolean;
    enableStickyHeader?: boolean;
}

export const StyleOptionsDefault = (options?: TableStyleOptions) => {
    return {
        classNameRoot: options?.classNameRoot ?? '',
        withContainerBorder: options?.withContainerBorder ?? true,
        globalFilterWithContainerBorder:
            options?.globalFilterWithContainerBorder ?? true,
        withContainerBorderSizing:
            options?.withContainerBorderSizing ?? Sizing.MEDIUM,
        withTableInfoResult: options?.withTableInfoResult ?? true,
        withZebraStriped: options?.withZebraStriped ?? false,
        borderInCell: options?.borderInCell ?? false,
        enableStickyHeader: options?.enableStickyHeader ?? false,
    } as TableStyleOptions;
};
