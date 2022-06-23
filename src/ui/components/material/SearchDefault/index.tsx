import React from 'react';
import { InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import { TextField } from './styles';
import GlobalFilterProps from '@/core/interfaces/props/search-filter-props';
import { SearchCriteriaModel } from '@/core/models';

export default function SearchDefault(props: GlobalFilterProps): JSX.Element {
    const { onChangeQuery } = props;

    const handleOnchange = (value: string) => {
        const criteria = new SearchCriteriaModel('searchInput', { value });
        onChangeQuery([criteria]);
    };

    return (
        <TextField
            label="Pesquisar"
            onChange={value => handleOnchange(value.target.value)}
            type="search"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Search />
                    </InputAdornment>
                ),
            }}
        />
    );
}
