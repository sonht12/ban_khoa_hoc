import { IProductApiResponseUser, IUsers, IBlog } from '@/interface/user';
import { pause } from '@/utils/pause';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BlogApi = createApi({
    reducerPath: 'blog',
    tagTypes: ['Blog'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8088/api",
        fetchFn: async (...args) => {
            await pause(300);
            return fetch(...args);
        }
    }),
    endpoints: (builder) => ({
        GetAllBlog: builder.query<IProductApiResponseUser, void>({
            query: () => `/blog`,
            providesTags: ['Blog']
        }),
        GetOneBlog: builder.query<IUsers, number | string>({
            query: (_id) => `/blog/${_id}`,
            providesTags: ['Blog']
        }),
        DeleteBlog: builder.mutation<void, number>({
            query: (_id) => ({
                url: `/blog/${_id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Blog']
        }),
 
        updateBlog: builder.mutation<IUsers, IUsers>({
            query: (blog) => ({
                url: `/blog/${blog._id}`,
                method: "PUT",
                body: blog
            }),
            invalidatesTags: ['Blog']
        }),
   
    })
});

export const {
    useDeleteBlogMutation,
    useGetAllBlogQuery,
    useGetOneBlogQuery,
    useUpdateBlogMutation
} = BlogApi;
export const BlogReducer = BlogApi.reducer;
export default BlogApi;