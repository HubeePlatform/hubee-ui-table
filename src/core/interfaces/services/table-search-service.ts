import { SearchModel, SearchResponseModel, ColumnModel } from '@/core/models';
import { TableProps } from '@/index';

export default interface ITableSearchService {
    tableProps: TableProps;
    setTableProps(tableProps: TableProps): void;
    makeSearchModel(): SearchModel;
    makeColumns(): ColumnModel<any>[];
    makeLabelDisplayedResult(response: SearchResponseModel<any>): string;
    search<T>(searchModel: SearchModel): Promise<SearchResponseModel<T>>;
    makeSearchResponseClientSide(
        values: any[],
        searchModel: SearchModel,
    ): SearchResponseModel<any>;
    verifyDisableRowSelected(data: any): boolean;
}
