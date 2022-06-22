import React from 'react';
import { TablePaginationProps } from '@/core/interfaces';
import TablePaginationActions from '../TablePaginationActions';
import { TablePagination } from '@mui/material';
import { Container } from './styles';

export default function Pagination(props: TablePaginationProps): JSX.Element {
    const { page, rowsPerPage, count, rowsPerPageOptions } = props;
    const { onPageChange, onRowsPerPageChange } = props;

    function makeLabelDisplayedRows({
        from,
        to,
        count,
    }: {
        from: number;
        to: number;
        count: number;
    }) {
        return `${from}-${to} de ${count !== -1 ? count : `more than ${to}`}`;
    }
    return (
        <Container className="pagination">
            <TablePagination
                page={page}
                rowsPerPage={rowsPerPage}
                count={count}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                rowsPerPageOptions={rowsPerPageOptions}
                labelRowsPerPage="Linhas por página:"
                labelDisplayedRows={makeLabelDisplayedRows}
                align="right"
                ActionsComponent={TablePaginationActions}
            />
        </Container>
    );
}
