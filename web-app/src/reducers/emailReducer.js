const defaultState = {
    messages: [],
    isOpened: false,
    isNewMessage: false,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case '':
            return { ...state, some: action.payload };
        default:
            return state;
    }
}