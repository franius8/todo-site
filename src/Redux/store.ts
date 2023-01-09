import { configureStore } from '@reduxjs/toolkit'
import { modalSlice } from './modalSlice'
import {contentSlice} from "./contentSlice";

export default configureStore({
    reducer: {
        modal: modalSlice.reducer,
        content: contentSlice.reducer
    }
})