import { TableIcons } from '@/core/models/table';

export default interface Action<RowData extends object> {
    icon: TableIcons | string;
    tooltip?: string;
    tooltipDisabled?: string;
    isRowActionOnClick?: boolean;
    isButton?: boolean;
    buttonName?: string;
    onClick: (event: any, data: RowData | RowData[]) => void;
    hidden?: (data: RowData | RowData[]) => boolean;
    disabled?: (data: RowData | RowData[]) => boolean;
}
