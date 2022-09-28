import { ClassNameKey } from '@/core/models/common';
import EventService from './event-service';

export default class NavigatingService {
    static getCurrentIndex(): number {
        return Number(
            document
                ?.querySelector('tr.navigation-active-row')
                ?.getAttribute('data-index') ?? '0',
        );
    }

    static getRowId(): string {
        return (
            document
                ?.querySelector('tr.navigation-active-row')
                ?.getAttribute('data-id') ?? ''
        );
    }

    static getRowIdByIndex(index: number): string {
        const element = document.querySelector(`tr[data-index="${index}"]`);
        return element?.getAttribute('data-id') ?? '';
    }

    static isQuantityOnFocus = () => {
        return (
            document.querySelector(
                'tr.navigation-active-row .quantity input:focus',
            ) !== null
        );
    };

    static quantityIncrement(): void {
        if (!NavigatingService.isQuantityOnFocus()) return;

        const element = document.querySelector(
            'tr.navigation-active-row .quantity input',
        ) as HTMLInputElement;

        if (element !== null && element !== undefined) {
            const newValue = (Number(element?.value ?? '1') + 1).toString();
            EventService.dispatchEventOnChange(newValue, element);
            element.value = newValue;

            element.focus();
            element.setSelectionRange(0, element.value.length);
        }
    }

    static quantityDecrement(): void {
        if (!NavigatingService.isQuantityOnFocus()) return;

        const element = document.querySelector(
            'tr.navigation-active-row .quantity input',
        ) as HTMLInputElement;

        if (element !== null && element !== undefined) {
            const decrementValue = Number(element?.value ?? '0') - 1;
            const newValue =
                decrementValue <= 0 ? '1' : decrementValue.toString();

            EventService.dispatchEventOnChange(newValue, element);
            element.value = newValue;

            element.focus();
            element.setSelectionRange(0, element.value.length);
        }
    }

    static focusToActive(onMouseDown: boolean): void {
        const currentTabIndex = NavigatingService.getTabIndexByInputFocus();

        const query =
            currentTabIndex !== -1 && !onMouseDown
                ? `tr.navigation-active-row input[tabindex="${currentTabIndex}"]`
                : 'tr.navigation-active-row .quantity input';

        const element = document.querySelector(query) as HTMLInputElement;

        if (element !== null && element !== undefined) {
            setTimeout(() => {
                element.focus();
                element.setSelectionRange(0, element.value.length);
            }, 100);
        }
    }

    static getIndexOnMouseDown(element: any): number {
        try {
            return Number(
                element?.closest('tr')?.getAttribute('data-index') ?? '0',
            );
        } catch {
            return 0;
        }
    }

    static navigateToOnMouseDown(element: any): number {
        const index = NavigatingService.getIndexOnMouseDown(element);

        const focusToActive =
            element?.tagName !== 'INPUT' ||
            element?.classList?.contains(ClassNameKey.navigateToFocusActive) ===
                true;

        NavigatingService.navigateTo(index, focusToActive, true);
        return index;
    }

    static makeQuerySelectorByRowIndex = (index: number) => {
        return `div[data-enable-navigation="true"] tr[data-index="${index}"]`;
    };

    static getNextInputFocus = (): HTMLInputElement => {
        const currentIndex = NavigatingService.getCurrentIndex();

        return document.querySelector(
            NavigatingService.makeQuerySelectorByRowIndex(currentIndex) +
                ' input.MuiInputBase-input:not(:focus)',
        ) as HTMLInputElement;
    };

    static getTabIndexByInputFocus = (): number => {
        const currentFocusElement = document.querySelector(
            'div[data-enable-navigation="true"] input.MuiInputBase-input:focus',
        ) as HTMLInputElement;

        if (currentFocusElement === undefined || currentFocusElement == null)
            return -1;

        return Number(currentFocusElement.tabIndex);
    };

    static navigateTo(
        index: number,
        focusToActive = true,
        onMouseDown = false,
    ): boolean {
        const element = document.querySelector(
            NavigatingService.makeQuerySelectorByRowIndex(index),
        );
        if (element === null || element === undefined) return false;

        NavigatingService.remove();

        document
            .querySelector(NavigatingService.makeQuerySelectorByRowIndex(index))
            ?.classList?.add('navigation-active-row');

        if (focusToActive) {
            NavigatingService.focusToActive(onMouseDown);
        }

        return true;
    }

    static tabNavidateTo(): void {
        const nextInputFocus = NavigatingService.getNextInputFocus();
        if (nextInputFocus === undefined) return;

        nextInputFocus.focus();
        nextInputFocus.setSelectionRange(0, nextInputFocus.value.length);
    }

    static toggleSelectionByRowActive(): void {
        const element = document.querySelector(
            'tr.navigation-active-row .table-cell-select',
        ) as HTMLInputElement;

        if (element === undefined || element === null) return;

        element.click();
    }

    static remove(): void {
        document
            .querySelector('tr.navigation-active-row')
            ?.classList?.remove('navigation-active-row');
    }
}
