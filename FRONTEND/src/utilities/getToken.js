const { VITE_TOKEN_LOCALSTORAGE_KEY } = import.meta.env;

export const getToken = () => {
    const token = localStorage.getItem(VITE_TOKEN_LOCALSTORAGE_KEY);

    return token || null;
};
