export default class EventKey {
    private static baseKey = 'UI-TABLE-EVENT:';
    static selectedRowsEvent = `${this.baseKey}SelectedRowsWasChangedEvent`;
    static searchModelRequestEvent = `${this.baseKey}SearchModelRequestWasChangedEvent`;
}
