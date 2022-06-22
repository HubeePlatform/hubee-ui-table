export default interface TablePaginationProps {
    count: number;
    page: number;
    rowsPerPage: number;
    rowsPerPageOptions: number[];
    onRowsPerPageChange: (event: any) => void;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        newPage: number,
    ) => void;
}
