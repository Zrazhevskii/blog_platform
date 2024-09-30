import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const articlesApi = createApi({
    reducerPath: 'articlesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://blog.kata.academy/api/',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Token ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Articles', 'Article'],
    endpoints: (build) => ({
        getArticles: build.query({
            query: ({ limit = 5, currentPage = 1 }) => ({
                url: 'articles',
                params: { limit, offset: (currentPage - 1) * limit },
                metod: 'GET',
            }),
            providesTags: (result) =>
                result
                    ? [
                          ...result.articles.map(({ slug }) => ({ type: 'Articles', id: slug })),
                          { type: 'Articles', id: 'List' },
                      ]
                    : [{ type: 'Articles', id: 'List' }],

            // transformResponse: (response) => response,
        }),
        getArticleItem: build.query({
            query: (slug) => ({
                url: `articles/${slug}`,
                method: 'GET',
            }),
            providesTags: ['Article'],
            // transformResponse: (response) => response,
        }),
    }),
});

export const { useGetArticlesQuery, useGetArticleItemQuery } = articlesApi;
