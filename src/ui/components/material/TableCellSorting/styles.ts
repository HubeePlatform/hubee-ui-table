import styled from 'styled-components';
import { TableCell as Cell } from '@mui/material';

export const TableCell = styled(Cell)`
    &.sort-by-false {
        cursor: initial;
    }

    &.sort-by-true {
        cursor: pointer;
    }

    .sort-label {
        position: absolute;
        padding-top: 2.5px;
    }
`;
