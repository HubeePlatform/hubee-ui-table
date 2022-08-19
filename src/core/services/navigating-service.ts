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
            element.value = (Number(element?.value ?? '0') + 1).toString();
            element.select();
        }
    }

    static quantityDecrement(): void {
        const element = document.querySelector(
            'tr.navigation-active-row .quantity input',
        ) as HTMLInputElement;

        if (element !== null && element !== undefined) {
            const newValue = Number(element?.value ?? '0') - 1;
            element.value = newValue <= 0 ? '0' : newValue.toString();
            element.select();
        }
    }

    static focusToActive(): void {
        const element = document.querySelector(
            'tr.navigation-active-row .quantity input',
        ) as HTMLInputElement;

        if (element !== null && element !== undefined) {
            element.select();
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

    static navigateToOnMouseDown(element: any): void {
        const index = NavigatingService.getIndexOnMouseDown(element);
        NavigatingService.navigateTo(index);
    }

    static navigateTo(index: number): void {
        const element = document.querySelector(`tr[data-index="${index}"]`);
        if (element === null || element === undefined) return;

        NavigatingService.remove();

        document
            .querySelector(`tr[data-index="${index}"]`)
            ?.classList?.add('navigation-active-row');

        NavigatingService.focusToActive();
    }

    static remove(): void {
        document
            .querySelector('tr.navigation-active-row')
            ?.classList?.remove('navigation-active-row');
    }
}
