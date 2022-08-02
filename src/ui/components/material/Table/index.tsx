/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import MaUTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import {
    useTable,
    Column,
    useSortBy,
    useRowSelect,
    usePagination,
} from 'react-table';
import { ColumnService, EventService } from '@/core/services';
import {
    PaginationOptionsDefault,
    RowOptionsDefault,
    StyleOptionsDefault,
    TablePaginationOptions,
    TableProps,
    TablePropsDefault,
    TableRowOptions,
    TableStyleOptions,
} from '@/core/interfaces';
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
import IndeterminateCheckbox from '../TableCellSelect';
import TableRowSelectHelper from '@/core/helpers/table-row-select-helper';
import _ from 'lodash';

export default function MaterialTable(props: TableProps) {
    const tableProps = TablePropsDefault(props);

    const { service, GlobalFilterComponent, rowOptions } = tableProps;
    service.setTableProps(tableProps);

    const {
        enableRowActions,
        enableRowSelected,
        defaultSelectedRowIds,
        propertyNameForDefaultRowSelected,
    } = tableProps.rowOptions as TableRowOptions;

    const {
        withContainerBorder,
        withContainerBorderSizing,
        withZebraStriped,
        withTableInfoResult,
    } = tableProps.styleOptions as TableStyleOptions;

    const { pageIndex, rowsPerPage, withPaginationAtTop, rowsPerPageOptions } =
        tableProps.paginationOptions as TablePaginationOptions;

    const initialMount = useRef(true);

    const [requestState, setRequestState] = useState({
        pageIndex: pageIndex as number,
        rowsPerPage: rowsPerPage,
    });

    const [responseState, setResponseState] = useState({
        isLoading: true,
        search: service.makeSearchModel(),
        value: SearchResponseModel.makeEmpty(),
    });

    const [controlRowSelectedState, setControlRowSelectedState] = useState({
        active: !_.isEmpty(propertyNameForDefaultRowSelected),
        enableDispatchSelectedRowsEvent: true,
        visualizedRows: [] as any[],
    });

    const columns = React.useMemo<Column<any>[]>(
        () => ColumnService.makeModelToColumn(service.makeColumns()),
        [],
    );

    const getRowId = React.useCallback(row => {
        return row.id;
    }, []);

    const initialSearchModel = React.useMemo<SearchModel>(
        () => service.makeSearchModel(),
        [],
    );

    const {
        getTableProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows,
        toggleRowSelected,
        state: { sortBy, selectedRowIds },
    } = useTable(
        {
            initialState: {
                selectedRowIds: defaultSelectedRowIds,
                sortBy: [
                    {
                        id: initialSearchModel.orderBy.defaultField,
                        desc: initialSearchModel.orderBy.isOrderByDesc,
                    },
                ],
            },
            columns,
            getRowId,
            data: responseState.value.data,
            autoResetSortBy: false,
            autoResetExpanded: false,
            autoResetSelectedRows: false,
            autoResetPage: false,
            manualSortBy: true,
            disableResizing: true,
        },
        useSortBy,
        usePagination,
        useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns =>
                !enableRowSelected
                    ? columns
                    : [
                          {
                              id: 'selection',
                              Header: props => {
                                  const checkboxProps =
                                      TableRowSelectHelper.getConditionalSelectHeader(
                                          {
                                              headerProps: props,
                                              shouldSelectPage: true,
                                              checkIfRowIsSelectable: row =>
                                                  !service.verifyDisableRowSelected(
                                                      row.original,
                                                  ),
                                          },
                                      );

                                  return (
                                      <div>
                                          <IndeterminateCheckbox
                                              isHeader={true}
                                              service={service}
                                              {...checkboxProps}
                                          />
                                      </div>
                                  );
                              },
                              width: '2%',
                              Cell: ({ row }) => (
                                  <div>
                                      <IndeterminateCheckbox
                                          isHeader={false}
                                          row={row}
                                          service={service}
                                          {...row.getToggleRowSelectedProps()}
                                      />
                                  </div>
                              ),
                          },
                          ...columns,
                      ],
            );
        },
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

    const controlRowSelectedDefaultValue = (responseData: any[]) => {
        if (controlRowSelectedState.active && !_.isEmpty(responseData)) {
            const values = responseData;
            const visualizedRows = [...controlRowSelectedState.visualizedRows];

            const propertyName = propertyNameForDefaultRowSelected as string;

            const filterRow = (item: any) =>
                visualizedRows.findIndex(id => id === item.id) === -1 &&
                item[propertyName] === true;

            values.filter(filterRow).map((x: any) => {
                toggleRowSelected(x.id, x[propertyName] as boolean);
            });

            const newRows = values
                .filter(
                    value =>
                        visualizedRows.findIndex(id => id === value.id) === -1,
                )
                .map(x => x.id);

            const updateVisualizedRows = visualizedRows.concat(newRows);

            setControlRowSelectedState({
                ...controlRowSelectedState,
                visualizedRows: updateVisualizedRows,
                enableDispatchSelectedRowsEvent: true,
            });

            toggleRowSelected('-999', false);
        }
    };

    const requestSearch = (searchModel: SearchModel) => {
        setResponseState({
            ...responseState,
            isLoading: true,
        });

        if (controlRowSelectedState.active) {
            setControlRowSelectedState({
                ...controlRowSelectedState,
                enableDispatchSelectedRowsEvent: false,
            });
        }

        service.search<any>(searchModel).then(response => {
            setResponseState({
                ...responseState,
                value: response,
                search: searchModel,
                isLoading: false,
            });

            controlRowSelectedDefaultValue(response.data);
            EventService.dispatchSearchModelRequestEvent(searchModel);
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

    const isInitialMount = () => {
        if (initialMount.current) {
            initialMount.current = false;
            return true;
        }

        return false;
    };

    useEffect(() => {
        const searchModel = getCurrentSearchModel();
        searchModel.updateSearchCriteria(initialSearchModel.criterias);
        requestSearch(searchModel);
    }, []);

    useEffect(() => {
        if (isInitialMount()) return;

        const searchModel = getCurrentSearchModel();

        requestSearch(searchModel);
    }, [requestState.pageIndex, requestState.rowsPerPage]);

    useEffect(() => {
        if (isInitialMount()) return;

        const searchModel = getCurrentSearchModel();
        if (!searchModel.hasChangeOrderBy(sortBy[0])) return;

        searchModel.updateOrderBy(sortBy[0]);
        requestSearch(searchModel);
    }, [sortBy]);

    useEffect(() => {
        if (isInitialMount()) return;
        if (!enableRowSelected) return;
        if (!controlRowSelectedState.enableDispatchSelectedRowsEvent) return;

        EventService.dispatchSelectedRowsEvent(selectedFlatRows);
    }, [selectedRowIds]);

    return (
        <ContainerRoot>
            {GlobalFilterComponent !== undefined && (
                <ContainerFilter>
                    <GlobalFilterComponent
                        onChangeQuery={handleOnChangeQuery}
                    />
                </ContainerFilter>
            )}
            <ContainerTable
                data-border={withContainerBorder}
                data-border-sizing={withContainerBorderSizing}
                data-zebra-striped={withZebraStriped}
            >
                {(withPaginationAtTop || withTableInfoResult) && (
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
                                rowsPerPageOptions={
                                    rowsPerPageOptions as number[]
                                }
                                count={responseState.value.page.total}
                                onPageChange={handleOnChangePage}
                                onRowsPerPageChange={handleOnChangeRowsPerPage}
                            />
                        )}
                    </ContainerPaginationHeader>
                )}
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
                            rowOptions={RowOptionsDefault(rowOptions)}
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
    GlobalFilterComponent: undefined,
    rowOptions: RowOptionsDefault(),
    styleOptions: StyleOptionsDefault(),
    paginationOptions: PaginationOptionsDefault(),
};
