import {configureStore} from '@reduxjs/toolkit'
import { modalSlice } from './modalSlice'
import {contentSlice} from "./contentSlice";
import thunkMiddleware from 'redux-thunk'

export const store = configureStore({
    reducer: {
        modal: modalSlice.reducer,
        content: contentSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunkMiddleware),
})

export default store

