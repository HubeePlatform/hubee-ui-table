import {
    SearchModel,
    SearchResponseModel,
    ColumnModel,
    PaginationModel,
} from '@/core/models';
import {
    ITableSearchService,
    TableProps,
    TableRowOptions,
} from '@/core/interfaces';
import { StringHelper } from '../helpers';
import _ from 'lodash';

export default abstract class TableSearchService
    implements ITableSearchService
{
    tableProps: TableProps;

    verifyDisableRowSelected(data: any): boolean {
        const { propertyNameForDisableRow } = this.tableProps
            .rowOptions as TableRowOptions;

        if (
            _.isEmpty(propertyNameForDisableRow) ||
            _.isUndefined(propertyNameForDisableRow)
        )
            return false;

        return data[propertyNameForDisableRow];
    }

    abstract search<T>(
        searchModel: SearchModel,
    ): Promise<SearchResponseModel<T>>;
    abstract makeSearchModel(): SearchModel;
    abstract makeColumns(): ColumnModel<any>[];
    abstract makeLabelDisplayedResult(
        response: SearchResponseModel<any>,
    ): string;

    setTableProps(tableProps: TableProps) {
        this.tableProps = tableProps;
    }

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

    makeSearchResponseClientSide(
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
