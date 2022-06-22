import styled from 'styled-components';
import { TableCell as TableCellUI } from '@mui/material';

export const TableCell = styled(TableCellUI)`
    .row-action {
        display: flex;
        width: min-content;
        visibility: hidden;

        .action-disabled {
            cursor: no-drop;
        }
    }
`;
