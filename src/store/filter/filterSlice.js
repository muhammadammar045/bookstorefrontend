import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    sort: {
        field: 'createdAt',
        order: 'asc',
    },
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setPageSize: (state, action) => {
            state.pageSize = action.payload;
            state.currentPage = 1; // Reset page on size change
        },
        setTotalItems: (state, action) => {
            state.totalItems = action.payload;
        },
        setSort: (state, action) => {
            state.sort = action.payload;
        },
    },
});

export const {
    setCurrentPage,
    setPageSize,
    setTotalItems,
    setSort,
} = filterSlice.actions;

export const selectPaginationCurrentPage = (state) => state.filters.currentPage;
export const selectPageSize = (state) => state.filters.pageSize;
export const selectTotalItems = (state) => state.filters.totalItems;
export const selectSort = (state) => state.filters.sort;

export default filterSlice.reducer;