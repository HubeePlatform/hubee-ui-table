import styled from 'styled-components';
import { Container as ContainerBase } from '@mui/material';

export const ContainerRoot = styled.div`
    thead {
        th.MuiTableCell-root {
            font-style: normal;
            font-weight: 700;
        }
    }
`;

export const ContainerTable = styled.div`
    position: relative;
    display: inline-table;
    width: 100%;

    &&[data-zebra-striped='true'] {
        tbody {
            tr:nth-child(odd) {
                background-color: #f4f4f4;
            }
        }
    }

    &&[data-border='true'] {
        min-height: 500px;
        padding-left: 16px;
        padding-right: 16px;
        border: 1px solid #cccccc;
    }

    &&[data-border-sizing='small'] {
        padding-bottom: 0px;
    }

    &&[data-border='true'][data-border-sizing='small'] {
        min-height: 364px;
    }

    &&[data-border-sizing='medium'] {
        padding-bottom: 140px;
    }

    input[type='checkbox'].table-cell-select {
        accent-color: #1580ae;
        height: 18px;
        width: 18px;
    }

    .material-table-head {
        tr th {
            box-sizing: border-box;
        }
    }

    table.is-loading-true {
        background-color: white;
        opacity: 0.5;
    }

    table {
        border-collapse: separate;
        border-spacing: 0;

        .table-cell-action-thead {
            min-width: 140px !important;
            width: 1%;
        }

        .table-cell-action-body {
            width: 1% !important;
            min-width: 140px !important;
            padding-top: 4px !important;
            padding-bottom: 4px !important;
        }

        .material-table-body {
            td {
                border: none;
                border-color: transparent;
                padding: 10px 16px;
                box-sizing: border-box;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            tr td {
                border: 1.2px solid #eeeeee;
                border-style: solid none;
            }

            tr {
                min-height: 48px;
            }

            td:first-of-type {
                border-left-style: solid;
                border-left-color: transparent;
            }

            tr:hover td:first-of-type {
                border-left-style: solid;
                border-top-style: solid;
            }

            tr:hover td:last-child {
                border-right-style: solid;
                border-top-style: solid;
            }

            tr:hover td {
                border: 1.2px solid rgba(0, 0, 0, 0.6);
                border-style: solid none;
            }

            tr:hover .row-action {
                visibility: visible;
            }
        }
    }
`;

export const ContainerFilter = styled.div`
    margin-bottom: 24px;
    border: 1px solid #cccccc;
    padding: 20px;
    border-radius: 4px;
    padding-right: 0px;
`;

export const ContainerPaginationHeader = styled(ContainerBase)`
    &.MuiContainer-root {
        height: 52px;
        margin: 0;
        padding: 0;
        display: flex;
        max-width: inherit;
        align-items: center;
        justify-content: space-between;
    }
`;
