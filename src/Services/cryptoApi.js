// import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();


export const getCryptos = createAsyncThunk(
    "crypto/getCryptos", 
    async({ limit }) => await CoinGeckoClient.coins.all({ per_page: limit || 250 })
);

export const getStatistics = createAsyncThunk(
    "crypto/getStatistics", 
    async() => await CoinGeckoClient.global()
);

export const getCryptoDetails = createAsyncThunk(
    "crypto/getCryptoDetails", 
    async({ id }) => await CoinGeckoClient.coins.fetch(id, {})
);

export const getCryptoHistory = createAsyncThunk(
    "crypto/getCryptoHistory", 
    async({ id }) => await CoinGeckoClient.coins.fetchMarketChartRange(id, {
        from: 1653511154,
        to: 1653597554
    })
);

export const getCryptosSlice = createSlice({
    name: "getCryptos",
    initialState: {
        cryptos: {},
        loading: true
    },
    extraReducers: (builder) => {
        builder.addCase(getCryptos.fulfilled, (state, action) => {
            state.cryptos = action.payload?.data;
            state.loading = false
        })
    }
});

export const getStatisticsSlice = createSlice({
    name: "getStatistics",
    initialState: {
        statistics: {},
        loading: 'idle'
    },
    extraReducers: (builder) => {
        builder.addCase(getStatistics.fulfilled, (state, action) => {
            state.statistics = action.payload?.data?.data;
        })
    }
});
export const getCryptoDetailsSlice = createSlice({
    name: "getCryptoDetails",
    initialState: {
        details: {},
        loading: true
    },
    extraReducers: (builder) => {
        builder.addCase(getCryptoDetails.fulfilled, (state, action) => {
            state.details = action.payload?.data;
            state.loading = false
        })
    }
});
export const getCryptoHistorySlice = createSlice({
    name: "getCryptoHistory",
    initialState: {
        cHistory: {},
        loading: true
    },
    extraReducers: (builder) => {
        builder.addCase(getCryptoHistory.fulfilled, (state, action) => {
            state.cHistory = action.payload?.data;
            state.loading = false
        })
    }
});
// export default getCryptosSlice;


