import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MaterialTable, SearchDefault } from '@/ui/components/material';
import TableSearchStorybook from '../utils/table-search-storybook';
import StoryGroupTypes from '../utils/story-group-types';

export default {
    title: StoryGroupTypes.MATERIAL_TABLE,
    component: MaterialTable,
} as ComponentMeta<typeof MaterialTable>;

const TemplateWithFilter: ComponentStory<typeof MaterialTable> = () => (
    <MaterialTable
        service={new TableSearchStorybook()}
        GlobalFilterComponent={SearchDefault}
    />
);

export const WithFilter = TemplateWithFilter.bind({});
