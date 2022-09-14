import { Sizing } from '@/core/models/common';

export interface TableStyleOptions {
    withContainerBorder?: boolean;
    withContainerBorderSizing?: Sizing;
    withTableInfoResult?: boolean;
    withZebraStriped?: boolean;
    classNameRoot?: string;
}

export const StyleOptionsDefault = (options?: TableStyleOptions) => {
    return {
        classNameRoot: options?.classNameRoot ?? '',
        withContainerBorder: options?.withContainerBorder ?? true,
        withContainerBorderSizing:
            options?.withContainerBorderSizing ?? Sizing.MEDIUM,
        withTableInfoResult: options?.withTableInfoResult ?? true,
        withZebraStriped: options?.withZebraStriped ?? false,
    } as TableStyleOptions;
};
