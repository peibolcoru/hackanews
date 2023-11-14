import './App.css';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Footer from './components/Footer.jsx';
import Header from './components/Header';

import Themes from './components/Themes.jsx';
import HomePage from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CategoriesPage from './pages/CategoriesPage';
import MyNewsPage from './pages/MyNewsPage';
import EntryFull from './pages/EntryFull';
import CreateEntry from './pages/CreateEntry';
import UpdateEntry from './pages/UpdateEntry';
import RatingPage from './pages/RatingPage';
import MyNewsRatingPage from './pages/MyNewsRatingPage';
import SearchPage from './pages/SearchPage';

import { useContext } from 'react';
import { LoginContext } from './context/LoginContext';





function App() {
    const { user } = useContext(LoginContext);

    return (
        <div className="App-full">
            <Header className="header-app" />
            <div className="aside-main">
                <Themes />
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/entries/:id" element={<EntryFull />} />
                        <Route path="/mynews" element={<MyNewsPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/themes/:categoryId"element={<CategoriesPage />}/>
                        <Route path="/createentry" element={<CreateEntry />} />
                        <Route path="/entries/update/:entryId" element={<UpdateEntry />} />
                        <Route path="/entries/rating" element={<RatingPage />} />
                        <Route path="/entries/nymnewsrating" element={<MyNewsRatingPage />} />
                        <Route path="/entries/search/:word" element={<SearchPage />} />

                    </Routes>
                </main>
            </div>
            <Footer />
            <ToastContainer />
        </div>
    );
}

export default App;
