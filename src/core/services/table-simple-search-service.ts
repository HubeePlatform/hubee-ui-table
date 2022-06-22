import { SearchModel, SearchResponseModel, ColumnModel } from '@/core/models';
import TableSearchService from './table-search-service';

export default abstract class TableSimpleSearchService extends TableSearchService {
    abstract search<T>(
        searchModel: SearchModel,
    ): Promise<SearchResponseModel<T>>;

    abstract makeSearchModel(): SearchModel;
    abstract makeColumns(): ColumnModel<any>[];

    makeLabelDisplayedResult(response: SearchResponseModel<any>): string {
        return '';
    }
}
