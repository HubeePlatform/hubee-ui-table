import {
    SearchModel,
    SearchResponseModel,
    PaginationModel,
    ColumnModel,
    SearchCriteriaModel,
    SearchConditionType,
} from '@/core/models';
import { PersonTestModel } from '@/core/models/test';
import { TableSearchService } from '@/core/services';
import { MakeDataHelper, StringHelper } from '@/core/helpers';
import React from 'react';

export default class TableSearchStorybook extends TableSearchService {
    constructor() {
        super();
        TableSearchService.call(this);

        //sample
        // this.verifyDisableRowSelected = function (data: any): boolean {
        //     return false;
        // };
    }

    makeLabelDisplayedResult(response: SearchResponseModel<any>): string {
        if (response === undefined) return '';
        if (response.page === undefined || response.page.total === 0) return '';

        const textPlural = StringHelper.pluralize({
            count: response.page.total,
        });

        return `${response.page.total} registro${textPlural} encontrado${textPlural}`;
    }

    makeSearchModel(): SearchModel {
        return new SearchModel('endpoint', 'firstName', {
            isOrderByDesc: true,
            criterias: [
                new SearchCriteriaModel('base', {
                    value: '2',
                    condition: SearchConditionType.and,
                }),
            ],
        });
    }

    async search<T>(searchModel: SearchModel): Promise<SearchResponseModel<T>> {
        const range = (len: any) => {
            const arr = [];
            for (let i = 0; i < len; i++) {
                arr.push(i);
            }
            return arr;
        };

        const newPerson = (index: any): PersonTestModel => {
            const statusChance = Math.random();
            return {
                id: index === 0 ? 1 : Math.floor(Math.random() * 30),
                rowDisabled: index === 0 ? true : false,
                isSelectedValue: index === 0 || index === 2 ? true : false,
                firstName: index === 0 ? ' Miranda' : MakeDataHelper.makeName(),
                lastName: index === 0 ? 'Assis' : MakeDataHelper.makeName(),
                age: index === 0 ? 29 : Math.floor(Math.random() * 30),
                visits: index === 0 ? 2 : Math.floor(Math.random() * 100),
                progress: index === 0 ? 4 : Math.floor(Math.random() * 100),
                status:
                    index === 0
                        ? 'relationship'
                        : statusChance > 0.66
                        ? 'relationship'
                        : statusChance > 0.33
                        ? 'complicated'
                        : 'single',
            } as PersonTestModel;
        };

        const makeDataLevel = (depth = 0): any => {
            const lens = [10];
            const len = lens[depth];

            const data = range(len).map((d: any, index) => {
                return {
                    ...newPerson(index),
                    subRows: lens[depth + 1]
                        ? makeDataLevel(depth + 1)
                        : undefined,
                };
            });

            return data;
        };

        const response = new SearchResponseModel<T>(
            makeDataLevel(),
            new PaginationModel({
                from: searchModel.pagination.from,
                size: 0,
                total: 10,
            }),
        );

        return new Promise<SearchResponseModel<T>>(resolve => {
            setTimeout(() => resolve(response), 1000);
        });
    }

    makeColumns(): ColumnModel<PersonTestModel>[] {
        return [
            new ColumnModel<PersonTestModel>('First Name', 'firstName', {
                width: 152,
                maxWidth: 152,
            }).withRender((value: string) => {
                return <span>{value}</span>;
            }),
            new ColumnModel<PersonTestModel>('Last Name', 'lastName', {
                width: 121,
                maxWidth: 121,
            }),
            new ColumnModel<PersonTestModel>('Age', 'age', {
                width: 40,
                align: 'right',
            }),
            new ColumnModel<PersonTestModel>('Visits', 'visits', {
                width: 40,
                align: 'right',
            }),
            new ColumnModel<PersonTestModel>('Status', 'status', {
                sorting: false,
                width: 152,
            }),
        ];
    }
}
