import { useLogin } from '../hooks/useLogin';
import useMeEntries from '../hooks/useMeEntries';
import AllEntries from '../components/AllEntries';
import { Link, Navigate } from 'react-router-dom';
import UsePageNumber from '../hooks/usePageNumber';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBackward, faForward } from '@fortawesome/free-solid-svg-icons';
import './MyNewsRatingPage.css'
export default function MyNewsRatingPage() {
    const { user } = useLogin();

    // Si el usuario no está logueado redirigimos a la página principal.
    if (!user) {
        console.error('No se puede acceder a MyNewsPage');
        return <Navigate to="/" />;
    }

    // Obtenemos las noticias únicamente si existe un usuario...
    const { meNews, error, loading } = useMeEntries();

    const meNewsRating = [...meNews].sort((x, y) => {
        return y.new_likes - x.new_likes;
    });

    const { initPage, endPage, setInitPage, setEndPage } = UsePageNumber(9);

    const newsArray = meNewsRating.slice(initPage, endPage);

    return (
        <>
            <h2>Mis noticias mejor valoradas</h2>

            <Link to="/mynews">
                <FontAwesomeIcon
                    className="narrowButton"
                    icon={faArrowLeft}
                    size="1x"
                />
            </Link>

            <a 
                className="button-page"
                onClick={() => {
                    setInitPage(initPage - 9);
                    setEndPage(endPage - 9);
                    if (initPage <= 0) {
                        setInitPage(0), setEndPage(9);
                    }
                }}
            >
                <FontAwesomeIcon icon={faBackward} />
            </a>
            <a
                className="button-page"
                onClick={() => {
                    if (endPage <= meNews.length) {
                        setInitPage(initPage + 9);
                        setEndPage(endPage + 9);
                    }
                }}
            >
                <FontAwesomeIcon icon={faForward} />
            </a>
            <AllEntries news={newsArray} />
        </>
    );
}
