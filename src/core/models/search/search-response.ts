import { PaginationModel, SearchModel } from '@/core/models';

export default class SearchResponseModel<T> {
    searchModel: SearchModel;
    page: PaginationModel;
    data: T;

    constructor(data: T, page: PaginationModel, searchModel: SearchModel) {
        this.data = data;
        this.page = page;
        this.searchModel = searchModel;
    }

    static makeEmpty(): SearchResponseModel<any> {
        return new SearchResponseModel<any>(
            [] as any[],
            new PaginationModel({}),
            new SearchModel('', '', []),
        );
    }
}
