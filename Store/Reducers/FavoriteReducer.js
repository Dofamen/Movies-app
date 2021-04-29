
const initState = {favoritseMovie: []}

 const toggleFavorite = (state= initState, action) => {
    let newState;
    switch (action.type) {
        case 'TOGGLE_FAVORITE':
            const favoriteMovieIndex = state.favoritseMovie.findIndex(item => item.id === action.value.id);
            if (favoriteMovieIndex !==-1){
                // delete the movie if it already on list
                newState = {
                    ...state,
                    favoritseMovie: state.favoritseMovie.filter((item, index) => index !== favoriteMovieIndex)
                }
            }else{
                // adding the a new movie to favorite list
                newState = {
                    ...state,
                    favoritseMovie: [...state.favoritseMovie, action.value]
                }
            }
            return newState || state;
        default:
            return state;
    }
}

export default toggleFavorite;
