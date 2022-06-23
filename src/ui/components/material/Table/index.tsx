import React, { useEffect, useRef, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import MaUTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { useTable, Column, useSortBy } from 'react-table';
import { ColumnService } from '@/core/services';
import { TableProps } from '@/core/interfaces';
import { TableFooter, TableHead } from '@mui/material';
import {
    Pagination,
    TableBodyOperations,
    TableInfoResult,
    TheadMapRow,
    BodyMapRow,
} from '@/ui/components';
import {
    SearchCriteriaModel,
    SearchModel,
    SearchResponseModel,
} from '@/core/models';
import { ObjectHelper } from '@/core/helpers';
import {
    ContainerRoot,
    ContainerTable,
    ContainerFilter,
    ContainerPaginationHeader,
} from './styles';

export default function MaterialTable(props: TableProps) {
    const {
        service,
        rowsPerPage,
        GlobalFilterComponent,
        enableRowActions,
        actions,
        rowsPerPageOptions,
    } = props;

    const { withContainerBorder, withPaginationAtTop, withTableInfoResult } =
        props;

    const isInitialMount = useRef(true);

    const [requestState, setRequestState] = useState({
        pageIndex: 0,
        rowsPerPage: rowsPerPage,
    });

    const [responseState, setResponseState] = useState({
        isLoading: true,
        search: service.makeSearchModel(),
        value: SearchResponseModel.makeEmpty(),
    });

    const columns = React.useMemo<Column<any>[]>(
        () => ColumnService.makeModelToColumn(service.makeColumns()),
        [],
    );

    const initialSearchModel = React.useMemo<SearchModel>(
        () => service.makeSearchModel(),
        [],
    );

    const {
        getTableProps,
        headerGroups,
        rows,
        prepareRow,
        state: { sortBy },
    } = useTable(
        {
            initialState: {
                sortBy: [
                    {
                        id: initialSearchModel.orderBy.defaultField,
                        desc: initialSearchModel.orderBy.isOrderByDesc,
                    },
                ],
            },
            columns,
            data: responseState.value.data,
            autoResetSortBy: false,
            autoResetExpanded: false,
            autoResetPage: false,
            manualSortBy: true,
            disableResizing: true,
        },
        useSortBy,
    );

    const getCurrentSearchModel = (): SearchModel => {
        const searchModel = ObjectHelper.clone(
            SearchModel.makeEmpty(),
            responseState.search,
        );

        searchModel.updatePagination(
            requestState.pageIndex,
            requestState.rowsPerPage as number,
        );

        return searchModel;
    };

    const requestSearch = (searchModel: SearchModel) => {
        setResponseState({
            ...responseState,
            isLoading: true,
        });

        service.search<any>(searchModel).then(response => {
            setResponseState({
                ...responseState,
                value: response,
                search: searchModel,
                isLoading: false,
            });
        });
    };

    const handleOnChangePage = (event: any, newPage: number) => {
        setRequestState({
            ...requestState,
            pageIndex: newPage,
        });
    };

    const handleOnChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setRequestState({
            ...requestState,
            pageIndex: 0,
            rowsPerPage: Number(`${event.target.value}`),
        });
    };

    const handleOnChangeQuery = (criterias: SearchCriteriaModel[]) => {
        const searchModel = getCurrentSearchModel();
        searchModel.updateSearchCriteria(criterias);

        requestSearch(searchModel);
    };

    useEffect(() => {
        const searchModel = getCurrentSearchModel();
        searchModel.updateSearchCriteria(initialSearchModel.criterias);
        requestSearch(searchModel);
    }, []);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        const searchModel = getCurrentSearchModel();
        requestSearch(searchModel);
    }, [requestState.pageIndex, requestState.rowsPerPage]);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        const searchModel = getCurrentSearchModel();
        if (!searchModel.hasChangeOrderBy(sortBy[0])) return;

        searchModel.updateOrderBy(sortBy[0]);
        requestSearch(searchModel);
    }, [sortBy]);

    return (
        <ContainerRoot>
            {GlobalFilterComponent !== undefined && (
                <ContainerFilter>
                    <GlobalFilterComponent
                        onChangeQuery={handleOnChangeQuery}
                    />
                </ContainerFilter>
            )}
            <ContainerTable className={`with-border-${withContainerBorder}`}>
                <ContainerPaginationHeader>
                    {withTableInfoResult && (
                        <TableInfoResult
                            labelDisplayedResult={service.makeLabelDisplayedResult(
                                responseState.value,
                            )}
                        />
                    )}
                    {withPaginationAtTop && (
                        <Pagination
                            page={requestState.pageIndex}
                            rowsPerPage={requestState.rowsPerPage as number}
                            rowsPerPageOptions={rowsPerPageOptions as number[]}
                            count={responseState.value.page.total}
                            onPageChange={handleOnChangePage}
                            onRowsPerPageChange={handleOnChangeRowsPerPage}
                        />
                    )}
                </ContainerPaginationHeader>
                <CssBaseline />
                <MaUTable
                    {...getTableProps()}
                    className={`material-table is-loading-${responseState.isLoading}`}
                >
                    <TableHead className="material-table-head">
                        <TheadMapRow
                            headerGroups={headerGroups}
                            enableActions={enableRowActions as boolean}
                        />
                    </TableHead>
                    <TableBodyOperations
                        count={responseState.value.page.total}
                        isLoading={responseState.isLoading}
                        rowsPerPage={requestState.rowsPerPage as number}
                    />
                    <TableBody className="material-table-body">
                        <BodyMapRow
                            rows={rows}
                            prepareRow={prepareRow}
                            actions={actions}
                        />
                    </TableBody>
                    <TableFooter>
                        <Pagination
                            page={requestState.pageIndex}
                            rowsPerPage={requestState.rowsPerPage as number}
                            rowsPerPageOptions={rowsPerPageOptions as number[]}
                            count={responseState.value.page.total}
                            onPageChange={handleOnChangePage}
                            onRowsPerPageChange={handleOnChangeRowsPerPage}
                        />
                    </TableFooter>
                </MaUTable>
            </ContainerTable>
        </ContainerRoot>
    );
}

MaterialTable.defaultProps = {
    rowsPerPage: 10,
    enableRowActions: false,
    GlobalFilterComponent: undefined,
    actions: [],
    withContainerBorder: true,
    withPaginationAtTop: true,
    withTableInfoResult: true,
    rowsPerPageOptions: [5, 10, 25, 30],
};
