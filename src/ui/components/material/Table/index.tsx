import React, { useCallback, useEffect, useRef, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import MaUTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import {
    useTable,
    Column,
    useSortBy,
    useRowSelect,
    usePagination,
    Row,
} from 'react-table';
import {
    ColumnService,
    EventService,
    NavigatingService,
} from '@/core/services';
import {
    PaginationOptionsDefault,
    RowOptionsDefault,
    StyleOptionsDefault,
    TableEventOptions,
    TableInfiniteScrollOptions,
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
    keyboardEventKey,
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
import _ from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function MaterialTable(props: TableProps) {
    const tableProps = TablePropsDefault(props);

    const { service, GlobalFilterComponent, rowOptions, paginationOptions } =
        tableProps;
    service.setTableProps(tableProps);

    const { enableSearchModelRequestEvent, enableNavigateKeyboardEvent } =
        tableProps.eventOptions as TableEventOptions;

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

    const {
        enablePagination,
        rowsPerPage,
        withPaginationAtTop,
        rowsPerPageOptions,
    } = tableProps.paginationOptions as TablePaginationOptions;

    const { enableInfiniteScroll } =
        tableProps.infiniteScrollOptions as TableInfiniteScrollOptions;

    const initialMount = useRef(true);
    const boardRef = useRef<HTMLDivElement>(null);

    const [requestState, setRequestState] = useState({
        pageIndex: paginationOptions?.pageIndex as number,
        rowsPerPage: rowsPerPage,
    });

    const [responseState, setResponseState] = useState({
        isLoading: true,
        search: service.makeSearchModel(),
        value: SearchResponseModel.makeEmpty(),
    });

    const [navigatingState, setNavigatingState] = useState({
        enable: false,
        isEditing: false,
    });

    const [controlRowSelectedState, setControlRowSelectedState] = useState({
        active: !_.isEmpty(propertyNameForDefaultRowSelected),
        enableDispatchSelectedRowsEvent: true,
        visualizedRows: [] as any[],
        selectedFlatRows: [] as Row<any>[],
    });

    const dispatchSelectedRowsEvent = useCallback(
        (
            selectedRowIds: Record<string, boolean>,
            selectedFlatRows: Row<any>[],
        ) => {
            const rowIds = Object.keys(selectedRowIds);
            const current = [...controlRowSelectedState.selectedFlatRows];
            const currentIds = current.map(x => x.original.id);

            current.push(
                ...selectedFlatRows
                    .filter(x => !current.includes(x))
                    .filter(x => !currentIds.includes(x.original.id)),
            );

            const distinct = (value: any, index: number, self: any) => {
                return self.indexOf(value) === index;
            };

            const values = current
                .filter(distinct)
                .filter(x => rowIds.includes(`${x.original.id}`));

            setControlRowSelectedState({
                ...controlRowSelectedState,
                selectedFlatRows: values,
            });

            EventService.dispatchSelectedRowsEvent(selectedRowIds, values);
        },
        [controlRowSelectedState.selectedFlatRows],
    );

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
        gotoPage,
        setPageSize,
        state: { sortBy, selectedRowIds },
    } = useTable(
        {
            initialState: {
                selectedRowIds: defaultSelectedRowIds,
                pageIndex: paginationOptions?.pageIndex,
                pageSize: paginationOptions?.rowsPerPage,
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
                    : [ColumnService.makeSelectionColumn(service), ...columns],
            );
        },
    );

    const isInitialMount = () => {
        if (initialMount.current) {
            initialMount.current = false;
            return true;
        }

        return false;
    };

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
            const currentValue = responseState.value.data;
            const mergeData = (currentValue as any[]).concat(response.data);

            setResponseState({
                ...responseState,
                value: enableInfiniteScroll
                    ? new SearchResponseModel(mergeData, response.page)
                    : response,
                search: searchModel,
                isLoading: false,
            });

            controlRowSelectedDefaultValue(response.data);

            if (enableSearchModelRequestEvent) {
                EventService.dispatchSearchModelRequestEvent(searchModel);
            }
        });
    };

    const handleInfiniteScrollNext = () => {
        if (enableInfiniteScroll === false) return;

        const searchModel = getCurrentSearchModel();
        const { from, size } = responseState.value.page;
        const currentIndex = from === 0 ? 0 : from / size;

        searchModel.updatePagination(
            currentIndex + 1,
            requestState.rowsPerPage as number,
        );

        requestSearch(searchModel);
    };

    const handleOnChangePage = (event: any, newPage: number) => {
        gotoPage(newPage);
        setRequestState({
            ...requestState,
            pageIndex: newPage,
        });
    };

    const handleOnChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const value = Number(`${event.target.value}`);

        setPageSize(value);
        setRequestState({
            ...requestState,
            pageIndex: 0,
            rowsPerPage: value,
        });
    };

    const handleOnChangeQuery = (criterias: SearchCriteriaModel[]) => {
        const searchModel = getCurrentSearchModel();
        searchModel.updateSearchCriteria(criterias);

        if (requestState.pageIndex !== 0) {
            setResponseState({
                ...responseState,
                search: searchModel,
            });
            handleOnChangePage(null, 0);
        } else {
            requestSearch(searchModel);
        }
    };

    const handleMouseDown = useCallback(
        (event: MouseEvent) => {
            const target = event.target as any;

            if (
                boardRef.current &&
                boardRef?.current?.contains(event.target as any) &&
                target?.closest('thead') === null &&
                target?.closest('tbody') !== null
            ) {
                NavigatingService.navigateToOnMouseDown(target);

                setNavigatingState({
                    ...navigatingState,
                    enable: true,
                    isEditing: target?.className?.includes('input'),
                });
            } else {
                setNavigatingState({
                    ...navigatingState,
                    enable: false,
                    isEditing: false,
                });
            }
        },
        [boardRef, setNavigatingState],
    );

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (!navigatingState.enable) return;

            const currentIndex = NavigatingService.getCurrentIndex();
            const rowId = NavigatingService.getRowId();

            switch (event.key) {
                case keyboardEventKey.ARROW_UP: {
                    const newIndex = currentIndex - 1;
                    NavigatingService.navigateTo(newIndex);
                    EventService.dispatchNavigateBetweenRowWasChangedEvent(
                        currentIndex,
                        newIndex,
                    );
                    break;
                }

                case keyboardEventKey.ARROW_DOWN: {
                    const newIndex = currentIndex + 1;
                    NavigatingService.navigateTo(newIndex);
                    EventService.dispatchNavigateBetweenRowWasChangedEvent(
                        currentIndex,
                        newIndex,
                    );
                    break;
                }

                case keyboardEventKey.ARROW_RIGHT:
                    NavigatingService.quantityIncrement();
                    break;

                case keyboardEventKey.ARROW_LEFT:
                    NavigatingService.quantityDecrement();
                    break;

                case keyboardEventKey.DELETE: {
                    if (rowId.length <= 0) {
                        EventService.dispatchRowNavigateWasDeletedEvent(rowId);
                    }

                    break;
                }
                default:
                    break;
            }
        },
        [navigatingState],
    );

    const onIsNavigatingChange = useCallback(() => {
        if (!navigatingState.enable) {
            NavigatingService.remove();
            EventService.dispatchNavigateBetweenRowWasChangedEvent(-1, -1);
        }
    }, [navigatingState]);

    useEffect(onIsNavigatingChange, [navigatingState, onIsNavigatingChange]);

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

        dispatchSelectedRowsEvent(selectedRowIds, selectedFlatRows);
    }, [selectedRowIds]);

    useEffect(() => {
        if (!enableNavigateKeyboardEvent) return;
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleMouseDown, handleKeyDown]);

    return (
        <ContainerRoot ref={boardRef}>
            {GlobalFilterComponent !== undefined && (
                <ContainerFilter>
                    <GlobalFilterComponent
                        onChangeQuery={handleOnChangeQuery}
                    />
                </ContainerFilter>
            )}
            <InfiniteScroll
                dataLength={responseState.value.page.total}
                hasMore={
                    enableInfiniteScroll === true &&
                    responseState.value.page.from +
                        responseState.value.page.size <=
                        responseState.value.page.total
                }
                next={handleInfiniteScrollNext}
                loader={<></>}
            >
                <ContainerTable
                    data-border={withContainerBorder}
                    data-border-sizing={withContainerBorderSizing}
                    data-zebra-striped={withZebraStriped}
                >
                    {enablePagination &&
                        (withPaginationAtTop || withTableInfoResult) && (
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
                                        rowsPerPage={
                                            requestState.rowsPerPage as number
                                        }
                                        rowsPerPageOptions={
                                            rowsPerPageOptions as number[]
                                        }
                                        count={responseState.value.page.total}
                                        onPageChange={handleOnChangePage}
                                        onRowsPerPageChange={
                                            handleOnChangeRowsPerPage
                                        }
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
                            {enablePagination && (
                                <Pagination
                                    page={requestState.pageIndex}
                                    rowsPerPage={
                                        requestState.rowsPerPage as number
                                    }
                                    rowsPerPageOptions={
                                        rowsPerPageOptions as number[]
                                    }
                                    count={responseState.value.page.total}
                                    onPageChange={handleOnChangePage}
                                    onRowsPerPageChange={
                                        handleOnChangeRowsPerPage
                                    }
                                />
                            )}
                        </TableFooter>
                    </MaUTable>
                </ContainerTable>
            </InfiniteScroll>
        </ContainerRoot>
    );
}

MaterialTable.defaultProps = {
    GlobalFilterComponent: undefined,
    rowOptions: RowOptionsDefault(),
    styleOptions: StyleOptionsDefault(),
    paginationOptions: PaginationOptionsDefault(),
};
