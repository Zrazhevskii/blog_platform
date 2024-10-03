// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { articlesApi } from './articlesApi';

export const authUserApi = articlesApi.injectEndpoints({
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
                url: 'user',
                method: 'GET',
            }),
            providesTags: ['User'],
            transformResponse: (result) => {
                console.log(result);
                const { username, email, image = '' } = result.user;
                return { username, email, image };
            },
        }),
        getExistingUser: builder.mutation({
            query: (body) => ({
                url: 'users/login',
                method: 'POST',
                body,
            }),
            providesTags: ['User'],
        }),
    }),
});

export const { useRegisterUserMutation, useGetCurrentUserQuery, useGetExistingUserMutation } = authUserApi;
