import { Action } from '@/core/interfaces';
import { TableIcons } from '@/core/models/table';

export default class RowActionStorybook {
    static makeActions(): Action<any>[] {
        return [
            {
                icon: TableIcons.OPEN_IN_NEW,
                tooltip: 'Abrir em uma nova aba',
                isRowActionOnClick: true,
                onClick: (event, rowData) =>
                    console.log('OPEN_IN_NEW', rowData),
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
            {
                icon: '',
                isButton: true,
                tooltip: 'Sample button',
                buttonName: 'Adicionar produto',
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
