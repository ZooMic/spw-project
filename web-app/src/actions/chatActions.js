export const CHAT_NEW_MESSAGE = 'CHAT_NEW_MESSAGE';
const addNewMessage = () => ({
    type: CHAT_NEW_MESSAGE,
});

export const CHAT_OPEN = 'CHAT_OPEN';
const openChat = (token) => ({
    type: REGISTRATION_LOGIN_FETCHING_FINISHED,
    payload: { token },
});