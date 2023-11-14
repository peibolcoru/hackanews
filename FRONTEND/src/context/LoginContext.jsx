// Importamos la función que crea un contexto y l;os hooks.
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Importamos los servicios.
import {
    registerService,
    loginService,
    getPrivateProfileService,
} from '../services/userServices';

// Importamos la función que retorna un token.
import { getToken } from '../utilities/getToken';

// Importamos la variable que contiene el nombre del token.
const { VITE_TOKEN_LOCALSTORAGE_KEY } = import.meta.env;

// Creamos un contexto.
const LoginContext = createContext();

// Creamos el componente provider.
const LoginContextProvider = ({ children }) => {
    const navigate = useNavigate();

    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
   
    useEffect(() => {
        // Función que retorna los datos del usuario.
        const fetchUser = async () => {
            try {
                const data = await getPrivateProfileService(token);
                
                setUser(data.user);
                
            } catch (err) {
                setError(err.message);
            }
        };

        // Si existe un token tratamos de obtener los datos del usuario.
        if (token) fetchUser();
    }, [token]);

    // Función que logea a un usuario.
    const authLogin = async ({ email, password }) => {
        try {
            setLoading(true);

            const data = await loginService({ email, password });

            // Guardamos el token en el localStorage.
            localStorage.setItem(VITE_TOKEN_LOCALSTORAGE_KEY, data.token);

            // Establecemos el token en el State.
            setToken(data.token);

            // Redirigimos a la página principal.
            navigate('/');
        } catch (err) {
           throw new Error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const authLogout = () => {
        localStorage.removeItem(VITE_TOKEN_LOCALSTORAGE_KEY);
        setToken("");
        setUser(null);
    };


    return (
        <LoginContext.Provider
            value={{ user, setUser, token, authLogin, authLogout, loading }}
        >
            {children}
        </LoginContext.Provider>
    );
};

export { LoginContext, LoginContextProvider };
