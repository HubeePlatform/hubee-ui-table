import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import PageviewIcon from '@mui/icons-material/Pageview';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { SvgIcon } from '@mui/material';
import React from 'react';

export enum TableIcons {
    SEARCH = 'search',
    DELETE = 'delete',
    OPEN_IN_NEW = 'open_in_new',
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
        TableIcons.OPEN_IN_NEW,
        <>
            <OpenInNewIcon />
        </>,
    ],
    [
        TableIcons.DELETE,
        <>
            <CancelPresentationIcon />
        </>,
    ],
]);
