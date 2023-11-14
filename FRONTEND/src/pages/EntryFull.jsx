import { useParams } from 'react-router-dom';
import useEntry from '../hooks/useEntryFull';
import EditDeleteEntry from '../components/EditDeleteEntry';
import { useLogin } from '../hooks/useLogin';
import Spinner from 'react-bootstrap/Spinner';
import Likes from '../components/Likes';
import './EntryFull.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import EntriesSmall from '../components/EntriesSmall';

const API_URL = import.meta.env.VITE_API_URL_BACKEND;

function EntryFull() {
    const { user: usercontext } = useLogin();

    const { id } = useParams();
    const { news, loading, error } = useEntry(id);
    const { results, user } = news;

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
            <article className="fullEntry">
                <p className="title-entry-full">{results[0].new_title}</p>

                <div className="principal">
                    <div className="columna1">
                        <a
                            href={`${API_URL}/${results[0].new_pic}`}
                            target="_blank"
                        >
                            <img
                                className="pic-full-entry"
                                src={`${API_URL}/${results[0].new_pic}`}
                                alt="Imagen de Entrada"
                            />
                        </a>
                        <p className="theme">Tema: {results[0].new_theme}</p>
                        <p className="author">
                            Autor de la entrada: {user[0].user_name}
                        </p>
                        <p className="date">
                            Publicación hecha el{' '}
                            {new Date(
                                results[0].created_at
                            ).toLocaleDateString()}
                        </p>
                    </div>

                    <div className="columna2">
                        <p className="entrance">{results[0].new_entrance}</p>
                        <p className="text">{results[0].new_text}</p>
                    </div>
                </div>

                <div className="btn_like_full_entry">
                    {usercontext ? (
                        <Likes newsId={id} newsLike={results[0].new_likes} />
                    ) : (
                        <div className="likes">
                            Likes: {results[0].new_likes}❤️
                        </div>
                    )}
                </div>
                <div className="video_entry">
                    {results[0].new_video ? (
                        <Button className="btn_full_entry" variant="secondary">
                            <Link to={results[0].new_video}>TRAILER</Link>
                        </Button>
                    ) : (
                        <div></div>
                    )}
                </div>
                <div className="btn_edit_delete_entryFull">
                    {usercontext &&
                    usercontext.user_email == user[0].user_email ? (
                        <EditDeleteEntry results={results} />
                    ) : null}
                </div>
            </article>
            <hr></hr>
            <section className="mapeo-full-entry">
                <EntriesSmall />
            </section>
        </>
    );
}

export default EntryFull;
