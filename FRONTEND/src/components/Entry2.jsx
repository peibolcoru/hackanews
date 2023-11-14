const API_URL = import.meta.env.VITE_API_URL_BACKEND;
import { Link } from 'react-router-dom';
import './Entry2.css';
import Likes from './Likes';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useLogin } from '../hooks/useLogin';

export const Entry2 = ({ news }) => {
    const { user } = useLogin();
    return (
        <>
            <Card className="entry2" style={{ width: '13rem' }}>
                <div className="container-img-entry2">
                    <Card.Img
                        className="imgCard2"
                        variant="top"
                        src={`${API_URL}/${news.new_pic}`}
                    />
                </div>
                <Card.Body>
                    <Card.Title className="title">{news.new_title}</Card.Title>

                    <Card.Text style={{ color: 'white' }}>
                        {news.new_entrance}
                    </Card.Text>
                </Card.Body>

                <div className="btn_like2">
                    {user && (
                        <div>
                            {' '}
                            <Likes newsId={news.id} newsLike={news.new_likes} />
                        </div>
                    )}
                    {!user && (
                        <div className="likes-non2">{news.new_likes}❤️</div>
                    )}
                </div>
                <Link to={`/entries/${news.id}`} className="btn_position">
                    <Button className="btn_to_new2" variant="secondary">
                        Ver Entrada
                    </Button>
                </Link>
            </Card>
        </>
    );
};
