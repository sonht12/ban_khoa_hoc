import { pause } from "@/utils/pause";
import { createApi , fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const paymentApi = createApi({
    reducerPath: 'payment',
    tagTypes:['Payment'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8088/api",
        fetchFn: async (...args) => {
            await pause(300);
            return fetch(...args);
        }
    }),
    endpoints:(builder) => ({
        createPayment: builder.mutation({
            query: (paymentData) => ({
                url: '/create-payment',
                method: 'POST',
                body: paymentData,
            }),
    })
})
});

export const {
    useCreatePaymentMutation,
} = paymentApi
export const paymentReducer = paymentApi.reducer
export default paymentApi 