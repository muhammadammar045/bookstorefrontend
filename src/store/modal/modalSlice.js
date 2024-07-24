import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showModal: false,
    context: null,
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.showModal = true;
            state.context = action.payload;
        },
        closeModal: (state) => {
            state.showModal = false;
            state.context = null;
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;
export const selectShowModal = (state) => state.modal.showModal;
export const selectModalContext = (state) => state.modal.context;

export default modalSlice.reducer;
