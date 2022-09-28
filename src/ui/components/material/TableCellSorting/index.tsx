import { TableSortLabel } from '@mui/material';
import React from 'react';
import { HeaderGroup } from 'react-table';
import { TableCell } from './styles';

interface TableCellSortingProps {
    column: HeaderGroup<any>;
}

export default function TableCellSorting(
    props: TableCellSortingProps,
): JSX.Element {
    const { column } = props;

    return (
        <TableCell
            {...(column.id === 'selection'
                ? column.getHeaderProps()
                : column.getHeaderProps(
                      column.getSortByToggleProps({
                          title: column.Header as string,
                      }),
                  ))}
            align={column['align'] ?? 'left'}
            style={{
                width: column.width ?? '1%',
                maxWidth: column.maxWidth ?? column.width,
            }}
            className={`sort-by-${!column.disableSortBy}`}
        >
            {column.render('Header')}
            {column.id !== 'selection' && !column.disableSortBy ? (
                <TableSortLabel
                    className="sort-label"
                    title="Ordenação"
                    active={column.isSorted}
                    direction={column.isSortedDesc ? 'desc' : 'asc'}
                />
            ) : null}
        </TableCell>
    );
}
