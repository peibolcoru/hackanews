import { useLogin } from '../hooks/useLogin';
import useMeEntries from '../hooks/useMeEntries';
import AllEntries from '../components/AllEntries';
import { Link, Navigate } from 'react-router-dom';
import UsePageNumber from '../hooks/usePageNumber';
import { faBackward, faForward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './MyNewsPage.css';
export default function MyNewsPage() {
    const { user } = useLogin();

    // Si el usuario no está logueado redirigimos a la página principal.
    if (!user) {
        console.error('No se puede acceder a MyNewsPage');
        return <Navigate to="/" />;
    }

    // Obtenemos las noticias únicamente si existe un usuario...
    const { meNews, error, loading } = useMeEntries();

    const { initPage, endPage, setInitPage, setEndPage } = UsePageNumber(9);

    const newsArray = meNews.slice(initPage, endPage);

    return (
        <section className="section-my-news">
            <h2> MIS NOTICIAS</h2>
            <Link to="/entries/nymnewsrating">
                <h3 className="rating-button"> MEJOR VALORADAS</h3>
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
                className="button-page-right"
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
        </section>
    );
}
