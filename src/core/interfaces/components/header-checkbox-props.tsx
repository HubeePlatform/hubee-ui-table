import { HeaderProps, Row } from 'react-table';

export default interface HeaderCheckboxProps {
    /** react-table's header props */
    headerProps: React.PropsWithChildren<HeaderProps<any>>;
    /** A predicate - based on your business logic - to determine whether a given row should be selectable */
    checkIfRowIsSelectable: (row: Row<any>) => boolean;
    /** Whether to allow page selection. Default: true */
    shouldSelectPage?: boolean;
}
