import { CircularProgress } from '@mui/material';
import React from 'react';
import { ContainerEmptyResult, ContainerProgress, TableBody } from './styles';

interface TableBodyOperationsProps {
    isLoading: boolean;
    count: number;
    rowsPerPage: number;
}

export default function TableBodyOperations(props: TableBodyOperationsProps) {
    const { isLoading, count } = props;
    return (
        <>
            {isLoading && (
                <TableBody className="table-body-circular-progress">
                    <ContainerProgress>
                        <CircularProgress color="inherit" />
                    </ContainerProgress>
                </TableBody>
            )}
            {!isLoading && count === 0 && (
                <TableBody className="table-body-empty-result">
                    <ContainerEmptyResult>
                        <>Nenhum resultado encontrado</>
                    </ContainerEmptyResult>
                </TableBody>
            )}
        </>
    );
}
