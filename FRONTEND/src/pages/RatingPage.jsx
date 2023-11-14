import useEntries from '../hooks/useEntries';
import AllEntries from '../components/AllEntries';
import { Link } from 'react-router-dom';

import './HomePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowLeft,
    faBackward,
    faForward,
} from '@fortawesome/free-solid-svg-icons';
import UsePageNumber from '../hooks/usePageNumber';
export default function RatingPage() {
    const { news, loading, error } = useEntries();
    const newsRating = news.toSorted((x, y) => {
        return y.new_likes - x.new_likes;
    });

    const { initPage, endPage, setInitPage, setEndPage } = UsePageNumber(6);

    const newsArray = newsRating.slice(initPage, endPage);
    return (
        <>
            <section className="section-rating">
                <h2>MEJOR VALORADAS</h2>
                <Link to="/">
                    <FontAwesomeIcon
                        className="narrowButton"
                        icon={faArrowLeft}
                        size="1x"
                    />
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

                <AllEntries news={newsArray} />
            </section>
        </>
    );
}
