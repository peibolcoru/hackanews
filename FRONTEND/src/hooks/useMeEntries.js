import { useEffect, useState } from 'react';
import { MeNewsService } from '../services/entriesServices';
import { useLogin } from './useLogin';
import { getToken } from '../utilities/getToken';

const useMeEntries = () => {
    const { user } = useLogin();

    const [meNews, setMeNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = getToken();

        const loadmeNews = async () => {
            try {
                const data = await MeNewsService(token);
                setMeNews(data);
            } catch (error) {
                setError(error.message);
            }
        };

        // Si existe un token llamamos a la función.
        if (token) loadmeNews();
    }, []);

    return { meNews, loading, error };
};

export default useMeEntries;
