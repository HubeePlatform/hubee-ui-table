import { TableCell, TableRow } from '@mui/material';
import React from 'react';

interface MakeEmptyRowsProps {
    rows: number;
}

export default function MakeEmptyRows(props: MakeEmptyRowsProps): JSX.Element {
    const { rows } = props;
    return (
        <>
            {Array.from(Array(rows).keys()).map(value => (
                <TableRow key={value}>
                    <TableCell>
                        <span style={{ color: 'transparent' }}>empty</span>
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
}
