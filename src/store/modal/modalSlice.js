
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

const getModalsState = (state) => state.modals


export const selectShowModal = (state) => getModalsState(state).showModal;

export default modalSlice.reducer;