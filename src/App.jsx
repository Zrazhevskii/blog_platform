// import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';
import PageNotFound from './pages/PageNotFound';
import Layout from './components/Layout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ArticlesList from './components/ArticlesList';
import Article from './pages/Article';
import NewArticle from './pages/NewArticle';
import Profile from './pages/Profile';
import EditArticle from './pages/EditArticle';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<ArticlesList />} />
                <Route path="articles/:slug" element={<Article />} />
                <Route path="new-article" element={<NewArticle />} />
                <Route path="profile" element={<Profile />} />
                <Route path="articles/:slug/edit" element={<EditArticle />} />
                <Route path="sign-up" element={<SignUp />} />
                <Route path="sign-in" element={<SignIn />} />
                <Route path="*" element={<PageNotFound />} />
            </Route>
        </Routes>
    );
}

export default App;
