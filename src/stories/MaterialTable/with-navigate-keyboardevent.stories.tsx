import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MaterialTable } from '@/ui/components/material';
import TableSearchStorybook from '../utils/table-search-storybook';
import StoryGroupTypes from '../utils/story-group-types';
import { Sizing } from '@/core/models/common';
import RowActionStorybook from '../utils/row-action-storybook';

export default {
    title: StoryGroupTypes.MATERIAL_TABLE,
    component: MaterialTable,
} as ComponentMeta<typeof MaterialTable>;

const TemplateNavigateKeyboardEvent: ComponentStory<
    typeof MaterialTable
> = () => (
    <MaterialTable
        service={new TableSearchStorybook(true)}
        rowOptions={{
            enableRowSelected: true,
            enableRowSelectedStyle: true,
            enableRowActions: true,
            rowActions: RowActionStorybook.makeActions(),
        }}
        eventOptions={{
            enableSearchModelRequestEvent: true,
            enableNavigateKeyboardEvent: true,
        }}
        paginationOptions={{
            rowsPerPage: 10,
            withPaginationAtTop: false,
        }}
        styleOptions={{
            withTableInfoResult: false,
            withContainerBorderSizing: Sizing.SMALL,
        }}
    />
);

export const WithNavigateKeyboardEvent = TemplateNavigateKeyboardEvent.bind({});
