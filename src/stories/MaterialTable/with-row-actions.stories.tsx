import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MaterialTable } from '@/ui/components/material';
import TableSearchStorybook from '../utils/table-search-storybook';
import StoryGroupTypes from '../utils/story-group-types';
import RowActionStorybook from '../utils/row-action-storybook';
import { Sizing } from '@/core/models/common';

export default {
    title: StoryGroupTypes.MATERIAL_TABLE,
    component: MaterialTable,
} as ComponentMeta<typeof MaterialTable>;

const TemplateWithActions: ComponentStory<typeof MaterialTable> = () => (
    <MaterialTable
        service={new TableSearchStorybook()}
        rowOptions={{
            enableRowActions: true,
            rowActions: RowActionStorybook.makeActions(),
        }}
        styleOptions={{ withContainerBorderSizing: Sizing.SMALL }}
    />
);

export const WithRowActions = TemplateWithActions.bind({});
