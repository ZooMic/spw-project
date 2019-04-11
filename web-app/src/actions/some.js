export function someActionCreator () {
    return (dispatch) => {
        setTimeout({
            type: 'SOME_TYPE',
            payload: '',
        });
    }
};

export function someAction () {
    return {
        type: 'SOME_OTHER_TYPE',
        payload: '',
    };
};