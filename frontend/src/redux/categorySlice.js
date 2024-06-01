import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        selectedCategory: '',
        searchTerm: '',
    },
    reducers: {
        setCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        clearCategory: (state) => {
            state.selectedCategory = '';
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        clearSearchTerm: (state) => {
            state.searchTerm = '';
        },
        clearFilters: (state) => {
            state.selectedCategory = '';
            state.searchTerm = '';
        },
    },
});

export const { setCategory, clearCategory, setSearchTerm, clearSearchTerm, clearFilters } = categorySlice.actions;
export default categorySlice.reducer;