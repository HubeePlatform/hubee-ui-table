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

    static quantityIncrement(): void {
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

    static focusToActive(): void {
        const element = document.querySelector(
            'tr.navigation-active-row .quantity input',
        ) as HTMLInputElement;

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

        NavigatingService.navigateTo(index, focusToActive);
        return index;
    }

    static navigateTo(index: number, focusToActive = true): boolean {
        const makeQuerySelector = (index: number) => {
            return `div[data-enable-navigation="true"] tr[data-index="${index}"]`;
        };

        const element = document.querySelector(makeQuerySelector(index));
        if (element === null || element === undefined) return false;

        NavigatingService.remove();

        document
            .querySelector(makeQuerySelector(index))
            ?.classList?.add('navigation-active-row');

        if (focusToActive) {
            NavigatingService.focusToActive();
        }

        return true;
    }

    static remove(): void {
        document
            .querySelector('tr.navigation-active-row')
            ?.classList?.remove('navigation-active-row');
    }
}
