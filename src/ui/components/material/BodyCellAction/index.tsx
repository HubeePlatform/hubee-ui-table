import { Action } from '@/core/interfaces';
import { TableCell } from './styles';
import React from 'react';
import { IconButton } from '@mui/material';
import { TableIconsMaterial } from '@/core/models/table';

interface BodyCellActionProps {
    isLastCell: boolean;
    actions?: Action<any>[];
    rowData?: any;
}

export default function BodyCellAction(props: BodyCellActionProps) {
    const { actions, isLastCell, rowData } = props;

    if (!isLastCell || actions === undefined || actions.length === 0) {
        return <></>;
    }

    const isHidden = (action: Action<any>) =>
        action.hidden !== undefined && action.hidden(rowData);

    const isDisabled = (action: Action<any>) =>
        action.disabled !== undefined && action.disabled(rowData);

    const makeTitle = (action: Action<any>) =>
        isDisabled(action) ? action.tooltipDisabled : action.tooltip;

    const makeClassName = (action: Action<any>) =>
        isDisabled(action) ? 'action-disabled' : 'action';

    return (
        <TableCell className="table-cell-action-body">
            <div className="row-action">
                {actions.map(
                    x =>
                        !isHidden(x) && (
                            <div
                                title={makeTitle(x)}
                                className={makeClassName(x)}
                            >
                                <IconButton
                                    key={x.icon}
                                    title={makeTitle(x)}
                                    onClick={event => x.onClick(event, rowData)}
                                    disabled={isDisabled(x)}
                                >
                                    {TableIconsMaterial.get(x.icon)}
                                </IconButton>
                            </div>
                        ),
                )}
            </div>
        </TableCell>
    );
}

BodyCellAction.defaultProps = {
    actions: [],
    rowData: undefined,
};
