
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showModal: false,
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state) => {
            state.showModal = true;
        },
        closeModal: (state) => {
            state.showModal = false;
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;

export const selectShowModal = (state) => state.modals.showModal;

export default modalSlice.reducer;