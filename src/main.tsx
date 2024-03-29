import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App";
import './Stylesheets/index.css'
import "./Stylesheets/style.css";
import { Provider } from "react-redux";
import store from "./Redux/store";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <App />
    </Provider>
)
