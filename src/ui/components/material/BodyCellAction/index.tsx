import { Action } from '@/core/interfaces';
import { Button, ContainerAction, TableCell } from './styles';
import React from 'react';
import Icon from '@mui/material/Icon';
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

    const makeIcon = (icon: string) => {
        const element = TableIconsMaterial.get(icon);

        if (element === undefined) {
            return <Icon>{icon}</Icon>;
        }

        return element;
    };

    return (
        <TableCell className="table-cell-action-body">
            <div className="row-action">
                {actions.map(
                    x =>
                        !isHidden(x) && (
                            <ContainerAction
                                key={`container-${x.icon}`}
                                title={makeTitle(x)}
                                className={makeClassName(x)}
                            >
                                {x.isButton !== true && (
                                    <IconButton
                                        key={x.icon}
                                        title={makeTitle(x)}
                                        onClick={event => {
                                            event.stopPropagation();
                                            x.onClick(event, rowData);
                                        }}
                                        disabled={isDisabled(x)}
                                    >
                                        {makeIcon(x.icon)}
                                    </IconButton>
                                )}

                                {x.isButton == true && (
                                    <Button
                                        key={x.buttonName}
                                        variant="outlined"
                                        onClick={event => {
                                            event.stopPropagation();
                                            x.onClick(event, rowData);
                                        }}
                                        disabled={isDisabled(x)}
                                    >
                                        {x.buttonName}
                                    </Button>
                                )}
                            </ContainerAction>
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
