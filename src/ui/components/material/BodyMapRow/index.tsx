import React from 'react';
import { Cell, Row } from 'react-table';
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
    const {
        rowActions,
        enableRowSelectedStyle,
        enableRowActions,
        enableRowTitle,
    } = props.rowOptions;

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

    const makeRowTitle = (cell: Cell<any, any>) => {
        if (!enableRowTitle) return undefined;

        return cell?.value;
    };

    return (
        <>
            {rows.map((row, index) => {
                prepareRow(row);
                return (
                    <TableRowContainer
                        {...row.getRowProps()}
                        key={`body-rows-${index}`}
                        data-id={row.id}
                        data-index={index}
                        data-is-selected={row.isSelected}
                        data-enable-row-selected-style={enableRowSelectedStyle}
                        data-enable-row-action={enableRowAction()}
                        onClick={e => handleOnClick(e, row)}
                    >
                        {row.cells.map((cell, index) => {
                            return (
                                <>
                                    <TableCell
                                        align={cell.column['align'] ?? 'left'}
                                        title={makeRowTitle(cell)}
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
                                    {enableRowActions && (
                                        <BodyCellAction
                                            key={`body-cell-action-${index}`}
                                            isLastCell={
                                                row.cells.length === index + 1
                                            }
                                            actions={rowActions}
                                            rowData={cell.row?.original}
                                        />
                                    )}
                                </>
                            );
                        })}
                    </TableRowContainer>
                );
            })}
        </>
    );
}
