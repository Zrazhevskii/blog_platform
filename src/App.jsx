// import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import PageNotFound from './pages/PageNotFound/index';
import Layout from './components/Layout/index';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ArticlesList from './components/ArticlesList/index';
import Article from './pages/Article/Article';

function App() {
    // const [count, setCount] = useState(0);

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<ArticlesList />} />
                <Route path="articles/:slug" element={<Article />} />
                <Route path="sign-up" element={<SignUp />} />
                <Route path="sign-in" element={<SignIn />} />
                <Route path="*" element={<PageNotFound />} />
            </Route>
        </Routes>
    );
}

export default App;
