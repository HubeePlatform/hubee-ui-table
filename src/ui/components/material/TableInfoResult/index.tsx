import React from 'react';
import { Container } from './styles';

interface TableInfoResultProps {
    labelDisplayedResult: string;
}

export default function TableInfoResult(props: TableInfoResultProps) {
    const { labelDisplayedResult } = props;

    return (
        <Container>
            <span>{labelDisplayedResult}</span>
        </Container>
    );
}
