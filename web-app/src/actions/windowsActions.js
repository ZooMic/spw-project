export const WINDOWS_OPEN_WINDOW = "WINDOWS@OPEN_WINDOW";
export const openWindow = (windowName) => ({
    type: WINDOWS_OPEN_WINDOW,
    payload: windowName,
});

export const WINDOWS_CLOSE_WINDOW = "WINDOWS@CLOSE_WINDOW";
export const closeWindow = () => ({
    type: WINDOWS_CLOSE_WINDOW,
});