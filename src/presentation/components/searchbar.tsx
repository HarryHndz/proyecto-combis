import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');

const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
};

return (
    <TextField
        label="Buscar"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        inputProps={{
        startAdornment: (
            <InputAdornment position="start">
                <SearchIcon />
            </InputAdornment>
        ),
        }}
    />
    );
};

export default SearchBar;
