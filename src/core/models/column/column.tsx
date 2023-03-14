import React from 'react';
import { AlignType } from './align-type';
import { RenderType, RenderTypeTitle } from './render-type';

export default class ColumnModel<T> {
    name: string;
    property: string;
    sorting: boolean;
    align?: AlignType;
    render: RenderType<T>;
    width?: any;
    maxWidth?: any;
    renderTitleCustom?: RenderTypeTitle<T>;

    constructor(
        name: string,
        property: string,
        {
            sorting = true,
            align = 'left' as AlignType,
            width = undefined as any,
            maxWidth = undefined as any,
        },
    ) {
        this.name = name;
        this.property = property;
        this.sorting = sorting;
        this.align = align;
        this.width = width;
        this.maxWidth = maxWidth;
        this.render = (value: any) => <>{value}</>;
        this.renderTitleCustom = undefined;
    }

    static build<T>(name: string, property: string): ColumnModel<T> {
        return new ColumnModel<T>(name, property, {});
    }

    withRender(render: RenderType<T>): ColumnModel<T> {
        this.render = render;
        return this;
    }

    withRenderTitleCustom(
        renderTitleCustom: RenderTypeTitle<T>,
    ): ColumnModel<T> {
        this.renderTitleCustom = renderTitleCustom;
        return this;
    }
}
