import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Search from "../Components/Search";
import FilmDetail from "../Components/FilmDetail";

const Stack = createStackNavigator();

export default class Navigation extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator headerMode="none" initialRouteName="search">
                    <Stack.Screen name="search" component={Search} /> 
                    <Stack.Screen name="filmDetail" component={FilmDetail} />

                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
