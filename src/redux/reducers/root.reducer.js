const initState = {
    userObj: null,
};

function rootReducer(state = initState, { type, payload }) {
    switch (type) {
        case "user/set":
            return {
                ...state,
                userObj: payload
            }
        case "user/remove":
            return {
                ...state,
                userObj: null
            }
        default:
            return state;
    }
}

export default rootReducer;