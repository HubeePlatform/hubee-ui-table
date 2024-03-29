import {
    PaginationModel,
    SearchCriteriaModel,
    SearchSortModel,
} from '@/core/models';
import { SortingRule } from 'react-table';

export default class SearchModel {
    endpoint: string;
    criterias: SearchCriteriaModel[];
    pagination: PaginationModel;
    orderBy: SearchSortModel;
    enableInfiniteScroll: boolean;

    constructor(
        endpoint: string,
        defaultOrderByField: string,
        {
            criterias = [] as SearchCriteriaModel[],
            isOrderByDesc = false,
            enableInfiniteScroll = false,
        },
    ) {
        this.endpoint = endpoint;
        this.criterias = criterias;
        this.enableInfiniteScroll = enableInfiniteScroll;
        this.pagination = PaginationModel.makeByTable(0, 0);
        this.orderBy = new SearchSortModel(defaultOrderByField, {
            isOrderByDesc,
        });
    }

    static makeEmpty(): SearchModel {
        return new SearchModel('', '', {});
    }

    updatePagination(pageIndex: number, rowsPerPage: number): void {
        this.pagination = PaginationModel.makeByTable(pageIndex, rowsPerPage);
    }

    updateOrderBy(sorting: SortingRule<any>): void {
        const newOrderBy = new SearchSortModel(this.orderBy.defaultField, {});

        if (sorting !== undefined) {
            newOrderBy.updateByTable(sorting.id, sorting.desc as boolean);
        }

        this.orderBy = newOrderBy;
    }

    updateSearchCriteria(criterias: SearchCriteriaModel[]): void {
        this.criterias = criterias;
    }

    hasChangeOrderBy(sorting: SortingRule<any>): boolean {
        return (
            this.orderBy.field !== sorting?.id ||
            this.orderBy.isOrderByDesc !== sorting?.desc
        );
    }
}
