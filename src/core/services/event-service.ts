import { Row } from 'react-table';
import { EventKey } from '@/core/models/event';
import { NavigatingService, SearchModel, SelectedRowsModel } from '@/index';
import { NavigateBetweenRowModel } from '../models/navigating';

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

    static dispatchNavigateBetweenRowWasChangedEvent(
        previousIndex: number,
        nextIndex: number,
    ): void {
        const previousRowId = NavigatingService.getRowIdByIndex(previousIndex);
        const rowId = NavigatingService.getRowIdByIndex(nextIndex);

        const event = new CustomEvent<any>(
            EventKey.navigateBetweenRowWasChangedEvent,
            {
                detail: new NavigateBetweenRowModel(previousRowId, rowId),
            },
        );

        document.dispatchEvent(event);
    }

    static dispatchRowNavigateWasDeletedEvent(id: string): void {
        const event = new CustomEvent<any>(
            EventKey.rowNavigateWasDeletedEvent,
            {
                detail: { id },
            },
        );

        document.dispatchEvent(event);
    }
}
