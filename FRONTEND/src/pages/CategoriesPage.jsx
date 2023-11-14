import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AllEntries from '../components/AllEntries';
import UsePageNumber from '../hooks/usePageNumber';

import './CategoriesPage.css';
import { faBackward, faForward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function CategoriesPage() {
    const API_URL = import.meta.env.VITE_API_URL_BACKEND;

    let { categoryId } = useParams();
    const [data, setData] = useState([]);
    const targetId = categoryId;

    const [title, setTitle] = useState('');

    useEffect(() => {
        fetch(`${API_URL}/entries/themes/${targetId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Se ha producido un error');
                }

                return response.json();
            })
            .then((data) => {
                const filteredData = data.data.entry;
                setData(filteredData);
                const ThemeTitle = data.data.theme_name;
                setTitle(ThemeTitle);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [targetId]);

    const { initPage, endPage, setInitPage, setEndPage } = UsePageNumber(6);

    const newsArray = data.slice(initPage, endPage);

    return (
        <div className="categories-page">
            <h2 className="title-categories">{title}</h2>
            <div className="buttons-container">
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
                    <FontAwesomeIcon className="buton-pg" icon={faBackward} />
                </a>
                <a
                    className="button-page-right"
                    onClick={() => {
                        if (endPage <= newsArray.length) {
                            setInitPage(initPage + 6);
                            setEndPage(endPage + 6);
                        }
                    }}
                >
                    <FontAwesomeIcon icon={faForward} />
                </a>
            </div>

            <div>
                <AllEntries news={newsArray} />
            </div>
        </div>
    );
}

export default CategoriesPage;
