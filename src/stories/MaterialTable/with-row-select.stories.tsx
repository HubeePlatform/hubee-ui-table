import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MaterialTable } from '@/ui/components/material';
import TableSearchStorybook from '../utils/table-search-storybook';
import StoryGroupTypes from '../utils/story-group-types';
import { Sizing } from '@/core/models/common';

export default {
    title: StoryGroupTypes.MATERIAL_TABLE,
    component: MaterialTable,
} as ComponentMeta<typeof MaterialTable>;

const TemplateRowSelect: ComponentStory<typeof MaterialTable> = () => (
    <MaterialTable
        service={new TableSearchStorybook()}
        rowOptions={{
            enableRowSelected: true,
            enableRowSelectedStyle: true,
            propertyNameForDisableRow: 'rowDisabled',
            propertyNameForDefaultRowSelected: 'isSelectedValue',
            // defaultSelectedRowIds: {
            //     '1': true,
            //     '2': true,
            //     '3': true,
            //     '4': true,
            //     '5': true,
            // },
        }}
        eventOptions={{
            enableSearchModelRequestEvent: false,
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

export const WithRowSelect = TemplateRowSelect.bind({});
