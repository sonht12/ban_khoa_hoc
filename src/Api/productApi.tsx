import { pause } from '@/utils/pause';
import { IProduct } from '@/interface/products';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const productApi = createApi({
    reducerPath: 'product',
    tagTypes: ['Product'],
    baseQuery: fetchBaseQuery({
        baseUrl: "  http://localhost:8088/api",
        fetchFn: async (...args) => {
            await pause(300);
            return fetch(...args);
        }
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<IProduct[], void>({
            query: () => `/product`,
            providesTags: ['Product']
        }),
        getProductById: builder.query<IProduct, number | string>({
            query: (_id) => `/product/${_id}`,
            providesTags: ['Product']
        }),
        removeProduct: builder.mutation<void, number>({
            query: (_id) => ({
                url: `/product/${_id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Product']
        }),
        addProduct: builder.mutation<IProduct, IProduct>({
            query: (product) => ({
                url: `/product`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Product']
        }),
        updateProduct: builder.mutation<IProduct, IProduct>({
            query: (product) => ({
                url: `/products/${product._id}`,
                method: "PATCH",
                body: product
            }),
            invalidatesTags: ['Product']
        })
    })
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useRemoveProductMutation,
    useAddProductMutation,
    useUpdateProductMutation
} = productApi;
export const productReducer = productApi.reducer;
export default productApi;