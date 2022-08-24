import styled from 'styled-components';
import { TableBody as Body } from '@mui/material';

export const TableBody = styled(Body)`
    position: relative;

    &.table-body-circular-progress {
        position: absolute !important;
        padding-top: 150px;
        left: 50%;
        width: 40px;
    }

    .MuiTableCell-root {
        border: none;
        padding: 10px 16px;
    }

    tr {
        min-height: 48px;
    }

    td {
        border: none;
        border-color: transparent;
        padding: 10px 16px;
        box-sizing: border-box;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

export const ContainerProgress = styled.div`
    position: absolute;
    width: 100%;
    text-align: center;
`;

export const ContainerEmptyResult = styled.div`
    position: absolute;
    padding-top: 100px;
    width: 100%;
    text-align: center;
`;
