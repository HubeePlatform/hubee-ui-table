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

    static dispatchNavigateBetweenRowWasChangedEvent({
        previousIndex = -1,
        nextIndex = -1,
        rows = [] as Row<any>[],
    }): void {
        const previousRowId = NavigatingService.getRowIdByIndex(previousIndex);
        const rowId = NavigatingService.getRowIdByIndex(nextIndex);
        const rowData = rows.find(x => `${x.id}` === `${rowId}`)?.original;

        const event = new CustomEvent<any>(
            EventKey.navigateBetweenRowWasChangedEvent,
            {
                detail: new NavigateBetweenRowModel(
                    previousRowId,
                    rowId,
                    rowData,
                ),
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

    static dispatchLoadOnDemandFinishedEvent(): void {
        const event = new CustomEvent<any>(EventKey.loadOnDemandFinishedEvent, {
            detail: { status: 'finished' },
        });

        document.dispatchEvent(event);
    }

    static dispatchEventOnChange(value: any, input: HTMLInputElement): void {
        if (window === undefined || input === undefined) return;

        const nativeInputValueSetter = Object?.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            'value',
        )?.set;

        if (nativeInputValueSetter === undefined) return;

        nativeInputValueSetter?.call(input, `${value}`);
        const event = new Event('input', { bubbles: true });
        input.dispatchEvent(event);
    }
}
