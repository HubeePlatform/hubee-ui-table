import { Row } from 'react-table';
import { EventKey } from '@/core/models/event';
import { SearchModel } from '@/index';

export default class EventService {
    static dispatchSelectedRowsEvent(selectedFlatRows: Row<any>[]): void {
        const event = new CustomEvent<any>(EventKey.selectedRowsEvent, {
            detail: {
                ids: selectedFlatRows.map(x => x.original?.id),
                values: selectedFlatRows.map(x => x.original),
            },
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
