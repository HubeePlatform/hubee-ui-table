export default class SearchSortModel {
    field: string;
    defaultField: string;
    isOrderByDesc: boolean;

    constructor(defaultField: string, { isOrderByDesc = false }) {
        this.field = defaultField;
        this.defaultField = defaultField;
        this.isOrderByDesc = isOrderByDesc;
    }

    updateByTable(field: string, isOrderByDesc: boolean) {
        this.field = field.length === 0 ? this.defaultField : field;
        this.isOrderByDesc = isOrderByDesc;
    }
}
