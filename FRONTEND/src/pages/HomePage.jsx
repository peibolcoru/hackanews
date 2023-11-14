import useEntries from '../hooks/useEntries';
import AllEntries from '../components/AllEntries';
import Carousel from '../components/Carousel';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
import './HomePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UsePageNumber from '../hooks/usePageNumber';
import { faBackward, faForward } from '@fortawesome/free-solid-svg-icons';

export default function HomePage() {
    const { news, loading, error } = useEntries();

    // Funcion que controla las paginas
    const { initPage, endPage, setInitPage, setEndPage } = UsePageNumber(6);

    const newsArray = news.slice(initPage, endPage);

    if (loading)
        return (
            <>
                <Spinner animation="border" />
                <p>Cargando...</p>
            </>
        );
    if (error) return <p>{error}</p>;

    return (
        <>
            <section>
                <h2 className="text-color">NOTICIAS TOP</h2>
                <br />
                <Carousel />
                <br />
            </section>
            <hr className="line-HP"></hr>
            <section>
                <h2 className="text-color">ÚLTIMAS NOTICIAS</h2>
                <Link to="/entries/rating">
                    <h3 className="rating-button">MEJOR VALORADAS</h3>
                </Link>
                <a
                    className="button-page"
                    onClick={() => {
                        setInitPage(initPage - 6);
                        setEndPage(endPage - 6);
                        if (initPage <= 0) {
                            setInitPage(0), setEndPage(6);
                        }
                    }}
                >
                    <FontAwesomeIcon icon={faBackward} />
                </a>
                <a
                    className="button-page-right"
                    onClick={() => {
                        if (endPage <= news.length) {
                            setInitPage(initPage + 6);
                            setEndPage(endPage + 6);
                        }
                    }}
                >
                    <FontAwesomeIcon icon={faForward} />
                </a>

                <br />
                <AllEntries news={newsArray} />
                <br />
            </section>
        </>
    );
}
