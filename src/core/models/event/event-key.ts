export default class EventKey {
    private static baseKey = 'UI-TABLE-EVENT:';
    static selectedRowsEvent = `${this.baseKey}SelectedRowsWasChangedEvent`;
    static searchModelRequestEvent = `${this.baseKey}SearchModelRequestWasChangedEvent`;
    static navigateBetweenRowWasChangedEvent = `${this.baseKey}NavigateBetweenRowWasChangedEvent`;
    static rowNavigateWasDeletedEvent = `${this.baseKey}RowNavigateWasDeletedEvent`;
    static loadOnDemandFinishedEvent = `${this.baseKey}LoadOnDemandFinishedEvent`;
}
