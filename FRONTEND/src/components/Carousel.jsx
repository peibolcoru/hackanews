import Carousel from 'react-bootstrap/Carousel';
const API_URL = import.meta.env.VITE_API_URL_BACKEND;
import './Carousel.css';
import { Link } from 'react-router-dom';
import useEntries from '../hooks/useEntries';

function UncontrolledExample() {
    const { news } = useEntries();

    const newsRating = news.toSorted((x, y) => {
        return y.new_likes - x.new_likes;
    });
    const threeTopNews = newsRating.slice(0, 3);

    return (
        <div className="carousel">
            {threeTopNews.length != 0 && (
                <Carousel className="carousel-completo">
                    {threeTopNews.map((news)=>{                  
                        return (
                    <Carousel.Item>
                        <Link to={`/entries/${news.id}`}>
                            {' '}
                            <img
                                className="img_carousel"
                                src={`${API_URL}/${news.new_pic}`}
                                text="slide"
                            />
                        </Link>
                        <Carousel.Caption>
                            <h3>{news.new_title}</h3>
                        </Carousel.Caption>
                    </Carousel.Item>)}
                    )}                    
                </Carousel>
            )}
        </div>
    ); 
}

export default UncontrolledExample;
