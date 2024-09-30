import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authUserApi = createApi({
    reducerPath: 'authUserApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://blog.kata.academy/api/',
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (body) => ({
                url: 'users',
                method: 'POST',
                body,
            }),
            transformResponse: (response) => {
                console.log(response);
                return response;
            },
            // transformErrorResponse:
        }),
    }),
});

export const { useRegisterUserMutation } = authUserApi;
