import { ColumnModel } from '@/core/models';
import { Column } from 'react-table';

export default class ColumnService {
    static makeModelToColumn(value: ColumnModel<any>[]): Column<any>[] {
        const columns = value.map(column => {
            return {
                Header: column.name,
                accessor: column.property,
                disableSortBy: !column.sorting,
                Cell: v => column.render(v.value, v.row.original),
                disableResizing: false,
                width: column.width,
                maxWidth: column.maxWidth,
            } as Column;
        });

        return columns as Column<any>[];
    }
}
