import { SearchModel, SearchResponseModel, ColumnModel } from '@/core/models';

export default interface ITableSearchService {
    makeSearchModel(): SearchModel;
    makeColumns(): ColumnModel<any>[];
    makeLabelDisplayedResult(response: SearchResponseModel<any>): string;
    search<T>(searchModel: SearchModel): Promise<SearchResponseModel<T>>;
    makeSearchClientSide(
        values: any[],
        searchModel: SearchModel,
    ): SearchResponseModel<any>;
}
