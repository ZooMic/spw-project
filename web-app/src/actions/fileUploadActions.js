export const FILE_UPLOAD_SET_OPEN = 'FILE_UPLOAD_SET_OPEN';
export const fileUploadSetOpen = (shouldOpen) => ({
    type: FILE_UPLOAD_SET_OPEN,
    payload: shouldOpen,
});