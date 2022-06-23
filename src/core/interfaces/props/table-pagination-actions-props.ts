export default interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onChangePage: (
        event: React.MouseEvent<HTMLElement>,
        newPage: number,
    ) => void;
}
