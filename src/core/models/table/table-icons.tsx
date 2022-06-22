import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import PageviewIcon from '@mui/icons-material/Pageview';
import { SvgIcon } from '@mui/material';
import React from 'react';

export enum TableIcons {
    SEARCH = 'search',
    DELETE = 'delete',
}

export type SvgIconComponent = typeof SvgIcon;

export const TableIconsMaterial = new Map<string, JSX.Element>([
    [
        TableIcons.SEARCH,
        <>
            <PageviewIcon />
        </>,
    ],
    [
        TableIcons.DELETE,
        <>
            <CancelPresentationIcon />
        </>,
    ],
]);
