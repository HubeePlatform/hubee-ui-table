import styled from 'styled-components';
import { TableCell as TableCellUI } from '@mui/material';
import { Button as ButtonUI } from '@mui/material';

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

export const ContainerAction = styled.div`
    align-self: center;
`;

export const Button = styled(ButtonUI)`
    padding: 2px 8px !important;
    color: #1580ae !important;
    background-color: transparent !important;
    font-weight: 500 !important;
    font-size: 12px !important;
    text-transform: none !important;
    border: 1px solid rgba(0, 0, 0, 0.12) !important;
`;
