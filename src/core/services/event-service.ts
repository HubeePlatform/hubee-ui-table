import { Row } from 'react-table';
import { EventKey } from '@/core/models/event';
import { SearchModel, SelectedRowsModel } from '@/index';

export default class EventService {
    static dispatchSelectedRowsEvent(
        selectedRowIds: Record<string, boolean>,
        selectedFlatRows: Row<any>[],
    ): void {
        const event = new CustomEvent<any>(EventKey.selectedRowsEvent, {
            detail: new SelectedRowsModel(
                Object.keys(selectedRowIds),
                selectedFlatRows.map(x => x.original),
            ),
        });

        document.dispatchEvent(event);
    }

    static dispatchSearchModelRequestEvent(searchModel: SearchModel): void {
        const event = new CustomEvent<any>(EventKey.searchModelRequestEvent, {
            detail: { searchModelRequest: searchModel },
        });

        document.dispatchEvent(event);
    }
}
