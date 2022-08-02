import { TableRow } from '@mui/material';
import styled from 'styled-components';

export const TableRowContainer = styled(TableRow)`
    &[data-is-selected='true'][data-enable-row-selected-style='true'] {
        td {
            font-weight: 700;
        }
    }

    &[data-enable-row-action='true'] {
        cursor: pointer;
    }
`;
