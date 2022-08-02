import React from 'react';
import { Row } from 'react-table';
import TableCell from '@mui/material/TableCell';
import { BodyCellAction } from '@/ui/components';
import { Action, TableRowOptions } from '@/core/interfaces';
import { TableRowContainer } from './styles';

interface BodyMapRowProps {
    rows: Row<any>[];
    prepareRow: (row: Row<any>) => void;
    actions?: Action<any>[];
    rowOptions: TableRowOptions;
}

export default function BodyMapRow(props: BodyMapRowProps): JSX.Element {
    const { rows, prepareRow } = props;
    const { rowActions, enableRowSelectedStyle } = props.rowOptions;

    const enableRowAction = () => {
        if (rowActions === null || rowActions === undefined) return false;

        const action = rowActions?.find(x => x.isRowActionOnClick);
        if (action === undefined || action === null) return false;

        return true;
    };

    const handleOnClick = (event: any, row: Row<any>) => {
        event.stopPropagation();

        if (!enableRowAction()) return;

        const action = rowActions?.find(x => x.isRowActionOnClick);
        action?.onClick(event, row.original);
    };

    return (
        <>
            {rows.map((row, index) => {
                prepareRow(row);
                return (
                    <TableRowContainer
                        {...row.getRowProps()}
                        key={`body-rows-${index}`}
                        data-is-selected={row.isSelected}
                        data-enable-row-selected-style={enableRowSelectedStyle}
                        data-enable-row-action={enableRowAction()}
                        onClick={e => handleOnClick(e, row)}
                    >
                        {row.cells.map((cell, index) => {
                            return (
                                <>
                                    <TableCell
                                        title={cell?.value}
                                        {...cell.getCellProps({
                                            key: `table-cell${index}`,
                                        })}
                                        style={{
                                            width: cell.column.width ?? '1%',
                                            maxWidth:
                                                cell.column.maxWidth ??
                                                cell.column.width,
                                        }}
                                    >
                                        {cell.render('Cell')}
                                    </TableCell>
                                    <BodyCellAction
                                        key={`body-cell-action-${index}`}
                                        isLastCell={
                                            row.cells.length === index + 1
                                        }
                                        actions={rowActions}
                                        rowData={cell.row?.original}
                                    />
                                </>
                            );
                        })}
                    </TableRowContainer>
                );
            })}
        </>
    );
}
