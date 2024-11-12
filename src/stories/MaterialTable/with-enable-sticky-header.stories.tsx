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

const TemplateEnableStickyHeader: ComponentStory<typeof MaterialTable> = () => (
    <MaterialTable
        service={new TableSearchStorybook(true)}
        rowOptions={{
            enableRowSelected: true,
            enableRowSelectedStyle: true,
            propertyNameForDisableRow: 'rowDisabled',
            propertyNameForDefaultRowSelected: 'isSelectedValue',
        }}
        eventOptions={{
            enableSearchModelRequestEvent: true,
            enableNavigateKeyboardEvent: true,
        }}
        loadOnDemandOptions={{
            enableLoadOnDemand: true,
            loadOnDemandShowLoading: true,
            loadOnDemandInterval: 1000,
        }}
        paginationOptions={{
            enablePagination: false,
            rowsPerPage: 5,
        }}
        styleOptions={{
            withTableInfoResult: false,
            withContainerBorderSizing: Sizing.SMALL,
            enableStickyHeader: true,
        }}
    />
);

export const EnableStickyHeader = TemplateEnableStickyHeader.bind({});
