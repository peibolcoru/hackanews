import { useEffect, useState } from "react";
import { getEntryService } from '../services/entriesServices';



const useEntry = (id) => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadNews = async () => {
            try {
                setLoading(true);

                const data = await getEntryService(id);

                setNews(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        loadNews();
    }, [id]);

    return { news, loading, error };
};


export default useEntry;