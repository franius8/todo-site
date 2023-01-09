import { createSlice} from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        modalVisible: false,
        toDoFormVisible: false,
        projectFormVisible: false,
        modalText: '',
        contentClass: ""
    },

    reducers: {
        toggleToDoForm: (state) => {
            state.toDoFormVisible = !state.toDoFormVisible;
            state.contentClass = state.toDoFormVisible ? "blurred" : "";
        },

        toggleProjectForm: (state) => {
            state.projectFormVisible = !state.projectFormVisible;
            state.contentClass = state.projectFormVisible ? "blurred" : "";
        },

        toggleModal: (state) => {
            state.modalVisible = !state.modalVisible;
            state.contentClass = state.contentClass ? "blurred" : "";

        },
        openModal: (state, action) => {
            state.modalVisible = true;
            state.modalText = action.payload;
            state.contentClass = "blurred";
        },
        setModalText: (state, action) => {
            state.modalText = action.payload;
        }
    }
})

export const { toggleModal, openModal, toggleToDoForm, toggleProjectForm } = modalSlice.actions;

export default modalSlice.reducer;