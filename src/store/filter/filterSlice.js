import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    filterShow: false,
    currentPage: 1,
    pageSize: 12,
    sort: {
        field: 'createdAt',
        order: 'asc',
    },
    priceRange: 'all',
    selectedCategory: '',
    searchQuery: '',
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilterShow: (state, action) => {
            state.filterShow = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setPageSize: (state, action) => {
            state.pageSize = action.payload;
            state.currentPage = 1;
        },
        setSort: (state, action) => {
            state.sort.field = action.payload;
        },
        setSortOrder: (state, action) => {
            state.sort.order = action.payload;
        },
        setPriceRange: (state, action) => {
            state.priceRange = action.payload;
        },
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
    },
});

export const {
    setFilterShow,
    setCurrentPage,
    setPageSize,
    setSort,
    setSortOrder,
    setPriceRange,
    setSelectedCategory,
    setSearchQuery,
} = filterSlice.actions;


const getFilterState = (state) => state.filter;

export const selectFilterShow = (state) => getFilterState(state)?.filterShow;
export const selectPaginationCurrentPage = (state) => getFilterState(state)?.currentPage;
export const selectPageSize = (state) => getFilterState(state)?.pageSize;
export const selectSort = (state) => getFilterState(state)?.sort?.field;
export const selectSortOrder = (state) => getFilterState(state)?.sort?.order;
export const selectPriceRange = (state) => getFilterState(state)?.priceRange;
export const selectSelectedCategory = (state) => getFilterState(state)?.selectedCategory;
export const selectSearchQuery = (state) => getFilterState(state)?.searchQuery;


export default filterSlice.reducer;
