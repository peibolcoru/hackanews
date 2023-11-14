const API_URL = import.meta.env.VITE_API_URL_BACKEND;

//RUTA DE LA IMAGEN PARA ASSETS
import NoImage from '../assets/imageNotFound.jpg';

import { Link } from 'react-router-dom';
import './Entry.css';
import { LoginContext } from '../context/LoginContext';
import { useContext } from 'react';
import Likes from './Likes';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { useLogin } from '../hooks/useLogin';

// {`${API_URL}/${news.new_pic}`}
export const Entry = ({ news }) => {
    const { user } = useLogin();
    //Validacion Temprana de la NoImage
    let entryImage = NoImage;
    if (news.new_pic != null) {
        entryImage = `${API_URL}/${news.new_pic}`;
    }

    return (
        <>
            <Card className="entry" style={{ width: '18rem' }}>
                <div className="container-img-entry">
                    <Card.Img
                        className="imgCard1"
                        variant="top"
                        src={entryImage}
                    />
                </div>
                <Card.Body>
                    <Card.Title className="title">{news.new_title}</Card.Title>

                    <hr className="linea" />
                    <Card.Text className="text_card1">
                        {news.new_entrance}
                    </Card.Text>
                </Card.Body>
                <div className="btn_like">
                    {user && (
                        <div className="btn-like-user">
                            {' '}
                            <Likes newsId={news.id} newsLike={news.new_likes} />
                        </div>
                    )}
                    {!user && (
                        <div className="likes-non">{news.new_likes}❤️</div>
                    )}
                </div>
                <Link className="link_to_new" to={`/entries/${news.id}`}>
                    <Button className="btn_to_new" variant="secondary">
                        Ver Entrada
                    </Button>
                </Link>
            </Card>
        </>
    );
};
