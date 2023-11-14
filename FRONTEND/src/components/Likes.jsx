import { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../context/LoginContext';
import {
    likesButtomService,
    likesStatusService,
} from '../services/entriesServices';
import './likes.css';

export default function Likes({ newsId, newsLike }) {
    const { token } = useContext(LoginContext);
    //Estado del boton like
    const [initialLike, setInitialLike] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    //  Contador  cambio de like
    const [counterLike, setCounterLike] = useState(newsLike);

    useEffect(() => {
        const loadStatus = async (newsId) => {
            try {
                setLoading(true);

                const data = await likesStatusService(newsId, token);

                setInitialLike(data.likeStatus);
            } catch (error) {
                setError(error.message);
            }
        };
        loadStatus(newsId);
    }, [newsId,initialLike]);

    // Cuando hace like
    const handleLike = async (newsId) => {
        try {
            const data = await likesButtomService(newsId, token);

            setInitialLike(data);
            data
                ? setCounterLike(counterLike + 1)
                : setCounterLike(counterLike - 1);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container-like">
            <div
                className={initialLike ? 'color-rojo' : ''}
                onClick={() => {
                    handleLike(newsId);
                }}
            >
                <div className="corazon">
                    <div className="circle"></div>
                    <div className="circle2"></div>
                    <div className="cube"></div>
                </div>
            </div>
            <div className="likes-user">{counterLike}👍🏼</div>
        </div>
    );
}
