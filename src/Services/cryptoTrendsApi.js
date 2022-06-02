import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://api.coingecko.com';

const createRequest = (url) => ({
    url
});

export const cryptoTrendsApi = createApi({
    reducerPath: 'cryptoTrendsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoTrends: builder.query({
            query: () => createRequest(`/api/v3/search/trending`)
        }),
    })
});

export const { useGetCryptoTrendsQuery } = cryptoTrendsApi;