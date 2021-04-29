import React from 'react';
import Navigation from "./Navigations/Navigation";
import { Provider } from "react-redux";
import Store from "./Store/ConfigueStore";



export default class App extends React.Component {
    render() {
        return (
            <Provider store={Store}>
                <Navigation/>
            </Provider>
        );
    }
}
