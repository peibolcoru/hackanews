import { Entry2 } from './Entry2';
import Spinner from 'react-bootstrap/Spinner';
import './EntriesSmall.css';
import useEntries from '../hooks/useEntries';

export default function EntriesSmall() {
    const { news } = useEntries();

    // const newArray = news.slice(0, 4);

    const getRandomNews = (news, count) => {
        const randomNews = [];
        const usedIndices = [];
        while (randomNews.length < count && randomNews.length < news.length) {
            const randomIndex = Math.floor(Math.random() * news.length);
            if (!usedIndices.includes(randomIndex)) {
                randomNews.push(news[randomIndex]);
                usedIndices.push(randomIndex);
            }
        }
        return randomNews;
    };

    const randomNews = getRandomNews(news, 4);

    return news.length ? (
        <section className="mapeo-array">
            {randomNews.map((newsItem) => (
                <article key={newsItem.id}>
                    <Entry2 news={newsItem} />
                </article>
            ))}
        </section>
    ) : (
        <div className="no-news">
            <Spinner animation="grow" variant="danger" />
            No hay entradas
            <Spinner animation="grow" variant="danger" />
        </div>
    );
}
