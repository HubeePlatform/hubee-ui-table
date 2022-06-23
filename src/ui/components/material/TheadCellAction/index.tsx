import { TableCell } from '@mui/material';
import React from 'react';

interface TheadCellActionProps {
    label?: string;
    isLastCell: boolean;
    enableRowActions: boolean;
}

export default function TheadCellAction(props: TheadCellActionProps) {
    const { enableRowActions, label, isLastCell } = props;
    if (!enableRowActions || !isLastCell) return <></>;

    return <TableCell className="table-cell-action-thead">{label}</TableCell>;
}

TheadCellAction.defaultProps = {
    label: 'Ações',
};
