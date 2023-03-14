/* eslint-disable react/prop-types */
import { ColumnModel } from '@/core/models';
import { ITableSearchService } from '@/index';
import IndeterminateCheckbox from '@/ui/components/material/TableCellSelect';
import React from 'react';
import { Column } from 'react-table';
import TableRowSelectHelper from '../helpers/table-row-select-helper';

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
                align: column.align,
                renderTitleCustom: column.renderTitleCustom,
            } as Column;
        });

        return columns as Column<any>[];
    }

    static makeSelectionColumn(service: ITableSearchService): Column<any> {
        return {
            id: 'selection',
            Header: props => {
                const checkboxProps =
                    TableRowSelectHelper.getConditionalSelectHeader({
                        headerProps: props,
                        shouldSelectPage: true,
                        checkIfRowIsSelectable: row =>
                            !service.verifyDisableRowSelected(row.original),
                    });

                return (
                    <div>
                        <IndeterminateCheckbox
                            isHeader={true}
                            service={service}
                            {...checkboxProps}
                        />
                    </div>
                );
            },
            width: '2%',
            Cell: ({ row }) => (
                <div>
                    <IndeterminateCheckbox
                        isHeader={false}
                        row={row}
                        service={service}
                        {...row.getToggleRowSelectedProps()}
                    />
                </div>
            ),
        } as Column<any>;
    }
}
