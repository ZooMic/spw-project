export const FILES_ADD_NEW_FILE = 'FILES_ADD_NEW_FILE';
export const addNewFile = (path, value) => ({
    type: FILES_ADD_NEW_FILE,
    payload: { [path]: value },
});

export const FILES_SET_SELECTION = 'FILES_SET_SELECTION';
export const setSelection = (path) => ({
    type: FILES_SET_SELECTION,
    payload: path,
});