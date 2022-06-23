import { TableRow } from '@mui/material';
import React from 'react';
import { HeaderGroup } from 'react-table';
import TableCellSorting from '../TableCellSorting';
import TheadCellAction from '../TheadCellAction';

interface TheadMapRowProps {
    headerGroups: HeaderGroup<any>[];
    enableActions: boolean;
}

export default function TheadMapRow(props: TheadMapRowProps): JSX.Element {
    const { enableActions, headerGroups } = props;

    return (
        <>
            {headerGroups.map((headerGroup, index) => (
                <TableRow
                    {...headerGroup.getHeaderGroupProps()}
                    key={`header-groups-${index}`}
                >
                    {headerGroup.headers.map((column, index) => (
                        <>
                            <TableCellSorting column={column} />
                            <TheadCellAction
                                isLastCell={
                                    headerGroup.headers.length === index + 1
                                }
                                enableRowActions={enableActions as boolean}
                            />
                        </>
                    ))}
                </TableRow>
            ))}
        </>
    );
}
