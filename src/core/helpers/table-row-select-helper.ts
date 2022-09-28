import { HeaderCheckboxProps } from '@/index';
import { Row } from 'react-table';

export default class TableRowSelectHelper {
    static getConditionalSelectHeader(props: HeaderCheckboxProps): any {
        const { headerProps, checkIfRowIsSelectable, shouldSelectPage } = props;

        const checkIfAllSelectableRowsSelected = (rows: Row<any>[]) =>
            rows.filter(checkIfRowIsSelectable).every(row => row.isSelected);

        const isSelectPage =
            shouldSelectPage &&
            headerProps.page
                .filter(checkIfRowIsSelectable)
                .some(row => !row.isSelected);

        const checkboxProps = isSelectPage
            ? headerProps.getToggleAllPageRowsSelectedProps()
            : headerProps.getToggleAllRowsSelectedProps();

        const disabled =
            headerProps.rows.filter(checkIfRowIsSelectable).length === 0;
        const checked =
            !disabled && checkIfAllSelectableRowsSelected(headerProps.rows);
        const indeterminate =
            !checked && headerProps.rows.some(row => row.isSelected);

        const onChange = () => {
            if (
                !isSelectPage &&
                checkIfAllSelectableRowsSelected(headerProps.rows)
            ) {
                headerProps.rows.filter(checkIfRowIsSelectable).forEach(row => {
                    headerProps.toggleRowSelected(row.id, false);
                });
            } else {
                const rows = isSelectPage ? headerProps.page : headerProps.rows;
                rows.filter(checkIfRowIsSelectable).forEach(row => {
                    const checked = checkIfRowIsSelectable(row);
                    headerProps.toggleRowSelected(row.id, checked);
                });
            }
        };

        return {
            ...checkboxProps,
            checked,
            indeterminate,
            onChange,
            disabled,
        };
    }
}
