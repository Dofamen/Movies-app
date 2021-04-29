import {createStore} from "redux";
import toggleFavorite from "./Reducers/FavoriteReducer.js";


export default createStore(toggleFavorite);
