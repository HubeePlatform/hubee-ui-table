import { SearchConditionType, SearchOperatorType } from '@/core/models';

export default class SearchCriteriaModel {
    Key: string;
    Value: string;
    Condition: SearchConditionType;
    Operator: SearchOperatorType;

    constructor(
        key: string,
        {
            value = '',
            condition = SearchConditionType.or as SearchConditionType,
            operator = SearchOperatorType.equal as SearchOperatorType,
        },
    ) {
        this.Key = key;
        this.Value = value;
        this.Condition = condition;
        this.Operator = operator;
    }

    setValue(value: string): void {
        this.Value = value;
    }
}
