import {
    Action,
    IGlobalFilterComponent,
    ITableSearchService,
} from '@/core/interfaces';

export default interface TableProps {
    service: ITableSearchService;
    rowsPerPage?: number;
    enableRowActions?: boolean;
    GlobalFilterComponent?: IGlobalFilterComponent;
    actions?: Action<any>[];
    withContainerBorder?: boolean;
    withPaginationAtTop?: boolean;
    withTableInfoResult?: boolean;
    rowsPerPageOptions?: number[];
}
