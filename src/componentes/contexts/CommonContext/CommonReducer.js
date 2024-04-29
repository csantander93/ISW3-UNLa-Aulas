


export const CommonReducer = (state, action) => {

    switch (action.type) {

        case 'setScreenMessage':
            return {
                ...state,
                screenMessage: action.payload
            }
        case 'setLoadingScreen':
            return {
                ...state,
                loadingScreen: action.payload
            }

        default:
            return state;
    }

}