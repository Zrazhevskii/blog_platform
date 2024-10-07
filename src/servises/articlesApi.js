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
    tagTypes: ['Articles', 'Article', 'User'],
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
                          { type: 'Articles', id: 'Articles-List' },
                      ]
                    : [{ type: 'Articles', id: 'Articles-List' }],
        }),
        getArticleItem: build.query({
            query: (slug) => ({
                url: `articles/${slug}`,
                method: 'GET',
            }),
            providesTags: ['Article'],
        }),
        addNewArticle: build.mutation({
            query(body) {
                console.log(body);
                return {
                    url: 'articles',
                    method: 'POST',
                    body,
                };
            },
            invalidatesTags: [{ type: 'Articles', id: 'Articles-List' }],
        }),
        deletArticle: build.mutation({
            query: (slug) => ({
                url: `articles/${slug}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Articles', id: 'Articles-List' }],
        }),
        editArticle: build.mutation({
            query(response) {
                const { response: body, slug } = response;
                return {
                    url: `articles/${slug}`,
                    method: 'PUT',
                    body,
                };
            },
            invalidatesTags: (result) => [{ type: 'Articles', id: result?.article.slug }, 'Article'],
        }),
    }),
});

export const {
    useGetArticlesQuery,
    useGetArticleItemQuery,
    useAddNewArticleMutation,
    useDeletArticleMutation,
    useEditArticleMutation,
} = articlesApi;
