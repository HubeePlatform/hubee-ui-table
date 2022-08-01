import { Row } from 'react-table';
import { EventKey } from '@/core/models/event';

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
}
