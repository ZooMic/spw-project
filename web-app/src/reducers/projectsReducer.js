// allSize - is required for the lazy loading purpose
// currentRange - is the range of currently loaded projects ids
// names - orered by project ID 

const valuesGenerator = (number) => {
    const v = {};
    for (let i = 0; i < number; i++) {
        v[i] = { name: String(i) };
    }
    return v;
}

const defaultState = {
    // values: {},
    values: valuesGenerator(10),
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case '':
            return { ...state, some: action.payload };
        default:
            return state;
    }
}