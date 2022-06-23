import { PaginationModel } from '@/core/models';

export default class SearchResponseModel<T> {
    page: PaginationModel;
    data: T;

    constructor(data: T, page: PaginationModel) {
        this.data = data;
        this.page = page;
    }

    static makeEmpty(): SearchResponseModel<any> {
        return new SearchResponseModel<any>(
            [] as any[],
            new PaginationModel({}),
        );
    }
}
