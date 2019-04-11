export default (state = {}, action) => {
    switch (action.type) {
        case 'SOME_ACTION':
            return { ...state, some: action.payload };
        default:
            return state;
    }
}