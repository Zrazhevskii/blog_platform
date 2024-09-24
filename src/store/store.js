import { configureStore } from '@reduxjs/toolkit';
import { articlesApi } from '../servises/articlesApi';
// import ArticlesListReduser from '../redusers/ArticlesListReduser';

const store = configureStore({
    reducer: {
        [articlesApi.reducerPath]: articlesApi.reducer,
        // posts: ArticlesListReduser,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articlesApi.middleware),
});

export default store;
