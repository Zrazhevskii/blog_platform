import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authUserApi = createApi({
    reducerPath: 'authUserApi',
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
    tagTypes: ['User'],
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (body) => ({
                url: 'users',
                method: 'POST',
                body,
            }),
        }),
        getCurrentUser: builder.query({
            query: () => ({
                url: 'user/login',
                method: 'GET',
            }),
            providesTags: ['User'],
            transformResponse: (result) => {
                const { username, email, image = '' } = result.user;
                return { username, email, image };
            },
        }),
    }),
});

export const { useRegisterUserMutation, useGetCurrentUserQuery } = authUserApi;
