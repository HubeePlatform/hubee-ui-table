import {
    EventOptionsDefault,
    IGlobalFilterComponent,
    LoadOnDemandOptionsDefault,
    ITableSearchService,
    TableEventOptions,
    LoadOnDemandOptions,
} from '@/core/interfaces';
import {
    PaginationOptionsDefault,
    TablePaginationOptions,
} from './table-pagination-options-props';
import { RowOptionsDefault, TableRowOptions } from './table-row-options-props';
import {
    StyleOptionsDefault,
    TableStyleOptions,
} from './table-style-options-props';

export interface TableProps {
    service: ITableSearchService;
    GlobalFilterComponent?: IGlobalFilterComponent;
    paginationOptions?: TablePaginationOptions;
    styleOptions?: TableStyleOptions;
    rowOptions?: TableRowOptions;
    eventOptions?: TableEventOptions;
    loadOnDemandOptions?: LoadOnDemandOptions;
}

export const TablePropsDefault = (props: TableProps) => {
    return {
        service: props.service,
        GlobalFilterComponent: props.GlobalFilterComponent,
        paginationOptions: PaginationOptionsDefault(props.paginationOptions),
        rowOptions: RowOptionsDefault(props.rowOptions),
        styleOptions: StyleOptionsDefault(props.styleOptions),
        eventOptions: EventOptionsDefault(props.eventOptions),
        loadOnDemandOptions: LoadOnDemandOptionsDefault(
            props.loadOnDemandOptions,
        ),
    } as TableProps;
};
