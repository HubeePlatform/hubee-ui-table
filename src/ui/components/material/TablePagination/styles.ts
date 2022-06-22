import styled from 'styled-components';
import { TableRow } from '@mui/material';

export const Container = styled(TableRow)`
    p {
        font-size: 12px !important;
        font-weight: 700;
    }

    &.pagination {
        width: 100%;
        margin-left: auto;
        box-sizing: border-box;
        margin-right: auto;
        display: contents;

        td.MuiTableCell-root {
            border: none;
        }
    }

    .MuiTablePagination-selectLabel,
    .MuiTablePagination-displayedRows {
        font-style: normal;
        font-weight: 700;
    }
`;
