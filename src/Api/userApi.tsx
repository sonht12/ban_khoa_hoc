import { IUsers } from '@/interface/user';
import { pause } from '@/utils/pause';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userApi = createApi({
    reducerPath: 'user',
    tagTypes: ['User'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8088/api",
        fetchFn: async (...args) => {
            await pause(300);
            return fetch(...args);
        }
    }),
    endpoints: (builder) => ({
        GetAllUser: builder.query<IUsers[], void>({
            query: () => `/user`,
            providesTags: ['User']
        }),
        GetOneUser: builder.query<IUsers, number | string>({
            query: (_id) => `/user/${_id}`,
            providesTags: ['User']
        }),
        DeleteUser: builder.mutation<void, number>({
            query: (_id) => ({
                url: `/user/${_id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['User']
        }),
        SignUp: builder.mutation<IUsers, IUsers>({
            query: (user) => ({
                url: `/Signup`,
                method: "POST",
                body: user
            }),
            invalidatesTags: ['User']
        }),
        Login: builder.mutation<IUsers, IUsers>({
            query: (user) => ({
                url: `/Signin`,
                method: "POST",
                body: user
            }),
            invalidatesTags: ['User']
        }),
    })
});

export const {
    useGetAllUserQuery,
    useGetOneUserQuery,
    useDeleteUserMutation,
    useSignUpMutation,
    useLoginMutation
} = userApi;
export const UserReducer = userApi.reducer;
export default userApi;