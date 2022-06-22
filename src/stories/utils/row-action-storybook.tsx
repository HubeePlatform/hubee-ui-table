import { Action } from '@/core/interfaces';
import { TableIcons } from '@/core/models/table';

export default class RowActionStorybook {
    static makeActions(): Action<any>[] {
        return [
            {
                icon: TableIcons.SEARCH,
                tooltip: 'Abrir em uma nova aba',
                onClick: (event, rowData) => console.log(rowData),
            },
            {
                icon: TableIcons.DELETE,
                tooltip: 'Cancelar',
                onClick: (event, rowData) => console.log(rowData),
                hidden: rowData => {
                    return rowData['status'] === 'relationship';
                },
                tooltipDisabled: 'Operação desabilitada',
                disabled: rowData => {
                    return rowData['status'] === 'single';
                },
            },
        ] as Action<any>[];
    }
}
