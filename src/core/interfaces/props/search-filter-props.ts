import { SearchCriteriaModel } from '@/core/models';

export default interface GlobalFilterProps {
    onChangeQuery: (
        filters: SearchCriteriaModel[],
        resetPage?: boolean,
    ) => void;
}
