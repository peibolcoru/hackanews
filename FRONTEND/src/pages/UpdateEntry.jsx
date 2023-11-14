// Importamos los hooks.
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './CreateEntry.css';
// Importamos los servicios.
import { updateEntryService } from '../services/entriesServices';
// Importamos el modulo de notificaciones
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const API_URL = import.meta.env.VITE_API_URL_BACKEND;
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const UpdateEntry = () => {
    let { entryId } = useParams();

    const navigate = useNavigate();

    const [titleInput, setTitleInput] = useState('');
    const [entranceInput, setEntranceInput] = useState('');
    const [textInput, setTextInput] = useState('');
    const [themeInput, setThemeInput] = useState('');
    const [picInput, setPicInput] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetchedCategories, setFetchedCategories] = useState([]);
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState('');

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

    useEffect(() => {
        fetch(`${API_URL}/entries/view/${entryId}`)
            .then((response) => response.json())
            .then((data) => {
                setTitleInput(data.data.results[0].new_title);
                setEntranceInput(data.data.results[0].new_entrance);
                setTextInput(data.data.results[0].new_text);
                setPicInput(data.data.results[0].new_pic);
                setThemeInput(data.data.results[0].themes_themes_id);
            })
            .catch((err) => console.log('Solicitud fallida', err));
    }, [entryId]);

    const handleForm = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const formData = new FormData();

            formData.append('new_title', titleInput);
            formData.append('new_entrance', entranceInput);
            formData.append('new_text', textInput);
            formData.append('new_pic', picInput);
            formData.append('new_theme', themeInput);

            const res = await updateEntryService({ formData, entryId });

            e.target.reset();
            if (!res.ok) {
                //throw new Error(body.message);
                toast.error(res.message);
            }

            setLoading(false);

            toast.success(res.message);
            navigate('/mynews');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create_news">
            <div className="container-form-news">
                <h1>Editar noticia</h1>
                <form className="new-entry" onSubmit={handleForm}>
                    <div className="columna-left-new">
                        <InputGroup className="mb-3">
                            <InputGroup.Text
                                htmlFor="new_title"
                                id="basic-addon1"
                                className="dark-btn-new"
                            >
                                Título
                            </InputGroup.Text>
                            <Form.Control
                                value={titleInput}
                                onChange={(e) => setTitleInput(e.target.value)}
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                type="text"
                                name="new_title"
                                id="new_title"
                                className="dark-btn-new"
                                required
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text
                                htmlFor="new_entrance"
                                id="basic-addon2"
                                className="dark-btn-new"
                            >
                                Entrada
                            </InputGroup.Text>
                            <Form.Control
                                value={entranceInput}
                                onChange={(e) =>
                                    setEntranceInput(e.target.value)
                                }
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                type="text"
                                name="new_entrance"
                                id="new_entrance"
                                className="dark-btn-new"
                                required
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text
                                className="dark-btn-new"
                                htmlFor="new_theme"
                            >
                                Categoria
                            </InputGroup.Text>
                            <select
                                className="dark-btn-new"
                                value={themeInput}
                                name="new_theme"
                                onChange={(e) => setThemeInput(e.target.value)}
                            >
                                {fetchedCategories.map((category) => {
                                    return (
                                        <option
                                            className="color-text-themes"
                                            value={category.id}
                                            key={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text
                                className="dark-btn-new"
                                htmlFor="new_video"
                                id="basic-addon3"
                            >
                                URL de YouTube
                            </InputGroup.Text>
                            <Form.Control
                                value={null}
                                onChange={(e) => setTextInput(e.target.value)}
                                id="basic-url"
                                aria-describedby="basic-addon3"
                                className="dark-btn-new"
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text
                                className="dark-btn-new"
                                htmlFor="new_pic"
                            >
                                Imagen
                            </InputGroup.Text>
                            <input
                                className="dark-btn-new"
                                type="file"
                                name="new_pic"
                                id="new_pic"
                                accept={'image/*'}
                                onChange={(e) => setPicInput(e.target.files[0])}
                            />

                            {picInput ? (
                                typeof picInput === 'string' ||
                                picInput instanceof String ? (
                                    <figure>
                                        <img
                                            src={`${API_URL}/${picInput}`}
                                            style={{ width: '100px' }}
                                            alt="Preview"
                                        />
                                    </figure>
                                ) : (
                                    <figure>
                                        <img
                                            src={URL.createObjectURL(picInput)}
                                            style={{ width: '200px' }}
                                            alt="Preview"
                                        />
                                    </figure>
                                )
                            ) : null}
                        </InputGroup>
                    </div>
                    <InputGroup>
                        <InputGroup.Text htmlFor="new_text">
                            Texto
                        </InputGroup.Text>
                        <Form.Control
                            type="text"
                            name="new_text"
                            id="new_title"
                            value={textInput}
                            onChange={(e) => setTextInput(e.target.value)}
                            required
                            as="textarea"
                            className="text-area-new"
                            aria-label="With textarea"
                        />
                    </InputGroup>

                    <InputGroup className="btn-publish">
                        <button className="btn-publish-css">
                            Editar noticia
                        </button>
                        {error ? <p>{error}</p> : null}
                        {loading ? <p>Editando noticia...</p> : null}
                    </InputGroup>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default UpdateEntry;
