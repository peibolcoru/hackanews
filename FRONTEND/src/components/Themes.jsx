import { Link } from 'react-router-dom';
import { useEffect, useState, useContext, createRef } from 'react';
import './Themes.css';
import Button from 'react-bootstrap/Button';
import { LoginContext } from '../context/LoginContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

export default function Themes() {
    const API_URL = import.meta.env.VITE_API_URL_BACKEND;
    const [fetchedCategories, setFetchedCategories] = useState([]);
    const { user } = useContext(LoginContext);
    const [isSticky, setIsSticky] = useState(false);

    const handleScroll = () => {
        if (window.pageYOffset >= 600) {
            console.log(window.pageYOffset);
            setIsSticky(true);
        } else {
            setIsSticky(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const asideRef = createRef();

    useEffect(() => {
        let results = {};
        fetch(`${API_URL}/entries/themes`)
            .then((response) => response.json())
            .then((data) => {
                results = data.data.map((obj) => {
                    let hash = {};
                    hash['name'] = obj.theme_name;
                    hash['id'] = obj.themes_id;
                    return hash;
                });
                setFetchedCategories(results);
            });
    }, []);

    document.addEventListener('DOMContentLoaded', function () {
        const textContainer = document.getElementById('text-container');
        if (textContainer) {
            textContainer.textContent = textContainer.textContent.replace(
                /_/g,
                ' '
            );
        }
    });

    return (
        <div
            ref={asideRef}
            className={`themes-container ${isSticky ? 'sticky' : ''}`}
        >
            {/* <FontAwesomeIcon className="narrow-to-up" icon={faArrowUp} /> */}

            <aside className="menu-lateral">
                <h2 className="category">CATEGORIAS</h2>
                <div className="nav2">
                    <Link to={`/`}>
                        <Button
                            className="btn_themes"
                            variant="secondary"
                            size="lg"
                        >
                            Inicio
                        </Button>
                    </Link>
                    <Link to={`/entries/rating`}>
                        <Button
                            className="btn_themes"
                            variant="secondary"
                            size="lg"
                        >
                            Más valoradas
                        </Button>
                    </Link>
                    {user && (
                        <Link to={`/mynews`}>
                            <Button
                                className="btn_themes"
                                variant="secondary"
                                size="lg"
                            >
                                Mis noticias
                            </Button>
                        </Link>
                    )}{' '}
                    {!user && (
                        <Link to={`/login`}>
                            <Button
                                className="btn_themes"
                                variant="secondary"
                                size="lg"
                            >
                                Mis noticias
                            </Button>
                        </Link>
                    )}
                    <hr className="line-sep"></hr>
                    {fetchedCategories.map((category) => {
                        return (
                            <Link
                                to={`/themes/${category.id}`}
                                key={category.id}
                            >
                                <Button
                                    className="btn_themes"
                                    variant="secondary"
                                    size="lg"
                                >
                                    <div
                                        className="formatted-text"
                                        id="text-container"
                                    >
                                        {category.name}
                                    </div>
                                </Button>
                            </Link>
                        );
                    })}
                </div>
            </aside>
        </div>
    );
}
