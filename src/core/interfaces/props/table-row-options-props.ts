import { Action } from '@/core/interfaces';

export interface TableRowOptions {
    enableRowActions?: boolean;
    enableRowSelected?: boolean;
    enableRowSelectedStyle?: boolean;
    enableRowTitle?: boolean;
    rowActions?: Action<any>[];
    propertyNameForDisableRow?: string;
    propertyNameForDefaultRowSelected?: string;
    defaultSelectedRowIds?: Record<string, boolean>;
}

export const RowOptionsDefault = (options?: TableRowOptions) => {
    return {
        enableRowActions: options?.enableRowActions ?? false,
        enableRowSelected: options?.enableRowSelected ?? false,
        enableRowSelectedStyle: options?.enableRowSelectedStyle ?? false,
        enableRowTitle: options?.enableRowTitle ?? true,
        rowActions: options?.rowActions ?? [],
        defaultSelectedRowIds: options?.defaultSelectedRowIds ?? {},
        propertyNameForDisableRow: options?.propertyNameForDisableRow ?? '',

        propertyNameForDefaultRowSelected:
            options?.propertyNameForDefaultRowSelected ?? '',
    } as TableRowOptions;
};
