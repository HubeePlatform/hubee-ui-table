import {
    SearchModel,
    SearchResponseModel,
    ColumnModel,
    PaginationModel,
} from '@/core/models';
import { ITableSearchService } from '@/core/interfaces';
import { StringHelper } from '../helpers';

export default abstract class TableSearchService
    implements ITableSearchService
{
    abstract search<T>(
        searchModel: SearchModel,
    ): Promise<SearchResponseModel<T>>;
    abstract makeSearchModel(): SearchModel;
    abstract makeColumns(): ColumnModel<any>[];
    abstract makeLabelDisplayedResult(
        response: SearchResponseModel<any>,
    ): string;

    makeCriteriaToUrl(searchModel: SearchModel): string {
        const { endpoint, criterias, orderBy, pagination } = searchModel;
        criterias.map(x => (x.Key = StringHelper.capitalize(x.Key)));

        return StringHelper.format(
            endpoint,
            JSON.stringify(criterias),
            StringHelper.capitalize(orderBy.field),
            `${pagination.from}`,
            `${pagination.size}`,
            `${orderBy.isOrderByDesc}`,
        );
    }

    makeSearchClientSide(
        values: any[],
        searchModel: SearchModel,
    ): SearchResponseModel<any> {
        const total = values?.length;
        const { from, size } = searchModel.pagination;
        const items = values.slice(from, from + size);

        const response = new SearchResponseModel<any>(
            items,
            new PaginationModel({
                from,
                size,
                total,
            }),
        );

        return response;
    }
}
