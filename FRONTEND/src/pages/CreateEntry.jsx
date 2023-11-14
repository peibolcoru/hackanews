// Importamos los hooks.
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Importamos los servicios.
import { createEntryService } from '../services/entriesServices';

//importamos el npm de notificaciones
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Importamos la función que retorna un token.
import { getToken } from '../utilities/getToken';
import './CreateEntry.css';

// Importamos los componentes de Bootstrap.
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const CreateEntry = () => {
    const token = getToken();
    const [fetchedCategories, setFetchedCategories] = useState([]); //* mirar tinyMCE para el texto de la entrada
    const API_URL = import.meta.env.VITE_API_URL_BACKEND;
    const navigate = useNavigate();

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

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleForm = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const data = new FormData(e.target);

            const res = await createEntryService({ data, token });

            e.target.reset();

            setImage(null);
            if (!res.ok) {
                //throw new Error(body.message);
                toast.error(res.message, {
                    position: 'top-center',
                    autoclosse: 2000,
                    theme: 'light',
                });
            }

            // setToken(body.data.token);
            setLoading(false);

            toast.success(res.message, {
                position: 'top-center',
                autoclosse: 2000,
                theme: 'light',
            });
            navigate('/mynews');
        } catch (error) {
            console.log(error);
            toast.error(error.message, {
                position: 'top-center',
                autoclosse: 2000,
                theme: 'light',
            });

            setLoading(false);
        }
    };
    return (
        <div className="create_news">
            <div className="container-form-news">
                <h1>Añadir nueva noticia</h1>
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
                                placeholder="Título de la noticia"
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
                                placeholder="Entrada de la noticia"
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
                            <select className="dark-btn-new" name="new_theme">
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
                                placeholder="URL de YouTube"
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
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                            {image ? (
                                <figure>
                                    <img
                                        src={URL.createObjectURL(image)}
                                        style={{ width: '200px' }}
                                        alt="Preview"
                                    />
                                </figure>
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
                            required
                            as="textarea"
                            className="text-area-new"
                            aria-label="With textarea"
                        />
                    </InputGroup>
                    <InputGroup className="btn-publish">
                        <button className="btn-publish-css">
                            Enviar noticia
                        </button>
                        {error ? <p>{error}</p> : null}
                        {loading ? <p>Publicando noticia...</p> : null}
                    </InputGroup>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default CreateEntry;
