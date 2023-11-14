import axios from 'axios';
import { useEffect, useState } from 'react';
const API_URL = import.meta.env.VITE_API_URL_BACKEND;

export default function useSearch(keyword) {
    const [newsSearch, setNewsSearch] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Función que busca las entradas en la base de datos.
        const fetchEntries = async () => {
          try {
                setLoading(true);
                const res = await axios.get(
                    `${API_URL}/entries/allentries?keyword=${keyword}`
                );

                // Establecemos las entradas en el State.
                setNewsSearch(res.data.data);
            } catch (err) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        // Llamamos a la función anterior.
        fetchEntries();
    }, [keyword]);
    return { newsSearch, setNewsSearch, loading, error };
}
