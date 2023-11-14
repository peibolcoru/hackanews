import useSearch from '../hooks/useSearch';
import AllEntries from '../components/AllEntries';
import { useParams } from 'react-router-dom';
import UsePageNumber from '../hooks/usePageNumber';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faForward } from '@fortawesome/free-solid-svg-icons';

export default function SearchPage() {
    let { word } = useParams();
    const { newsSearch, setNewsSearch } = useSearch(word);
    const { initPage, endPage, setInitPage, setEndPage } = UsePageNumber(9);

    const newsArray = newsSearch.slice(initPage, endPage);
    return (
        <div className="search-page">
            <h2>Resultado de la búsqueda: {word}</h2>
            <section>
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
                        if (endPage <= newsSearch.length) {
                            setInitPage(initPage + 9);
                            setEndPage(endPage + 9);
                        }
                    }}
                >
                    <FontAwesomeIcon icon={faForward} />
                </a>

                <AllEntries news={newsArray} />
            </section>
        </div>
    );
}
