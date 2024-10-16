// import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { ConfigProvider } from 'antd';
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
        <ConfigProvider
            theme={{
                token: {
                    boxShadow: 'none',
                },
                components: {
                    Pagination: {
                        itemActiveBg: '#1890FF',
                        colorPrimary: 'white',
                        colorPrimaryHover: 'white',
                    },
                },
            }}
        >
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<ArticlesList />} />
                    <Route path={import.meta.env.VITE_APP_ARTICLES_SLUG} element={<Article />} />
                    <Route path={import.meta.env.VITE_NEW_ARTICLE} element={<NewArticle />} />
                    <Route path={import.meta.env.VITE_PROFILE} element={<Profile />} />
                    <Route path={import.meta.env.VITE_ARTICLE_SLUG_EDIT} element={<EditArticle />} />
                    <Route path={import.meta.env.VITE_SIGN_UP} element={<SignUp />} />
                    <Route path={import.meta.env.VITE_SIGN_IN} element={<SignIn />} />
                    <Route path="*" element={<PageNotFound />} />
                </Route>
            </Routes>
        </ConfigProvider>
    );
}

export default App;
