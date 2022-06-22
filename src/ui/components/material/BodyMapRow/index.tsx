import { TableRow } from '@mui/material';
import React from 'react';
import { Row } from 'react-table';
import TableCell from '@mui/material/TableCell';
import { BodyCellAction } from '@/ui/components';
import { Action } from '@/core/interfaces';

interface BodyMapRowProps {
    rows: Row<any>[];
    prepareRow: (row: Row<any>) => void;
    actions?: Action<any>[];
}

export default function BodyMapRow(props: BodyMapRowProps): JSX.Element {
    const { actions, rows, prepareRow } = props;

    return (
        <>
            {rows.map((row, index) => {
                prepareRow(row);
                return (
                    <TableRow {...row.getRowProps()} key={`body-rows-${index}`}>
                        {row.cells.map((cell, index) => {
                            return (
                                <>
                                    <TableCell
                                        title={cell?.value}
                                        {...cell.getCellProps()}
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
                                        isLastCell={
                                            row.cells.length === index + 1
                                        }
                                        actions={actions}
                                        rowData={cell.row?.original}
                                    />
                                </>
                            );
                        })}
                    </TableRow>
                );
            })}
        </>
    );
}
