import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();



export const getCryptos = createAsyncThunk(
    "crypto/getCryptos", 
    async({ limit }) => await CoinGeckoClient.coins.all({ per_page: limit || 250 })
);

export const getCryptosStatsGainer = createAsyncThunk(
    "crypto/getCryptosStatsGainer", 
    async({ limit }) => await CoinGeckoClient.coins.all({ per_page: limit || 5, order: CoinGecko.ORDER.HOUR_24_DESC })
);

export const getCryptosStatsLoser = createAsyncThunk(
    "crypto/getCryptosStatsLoser", 
    async({ limit }) => await CoinGeckoClient.coins.all({ per_page: limit || 5, order: CoinGecko.ORDER.HOUR_24_ASC })
);

export const getExchanges = createAsyncThunk(
    "crypto/getExchanges", 
    async() => await CoinGeckoClient.exchanges.all()
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
    async({ id }) => await CoinGeckoClient.coins.fetchMarketChart(id, {
        days: 'max',
        vs_currency: 'usd',
    })
);

export const getCryptosSlice = createSlice({
    name: "getCryptos",
    initialState: {
        cryptos: {},
        loading: true,
        connection: true,

    },
    extraReducers: (builder) => {
        builder.addCase(getCryptos.fulfilled, (state, action) => {
            state.cryptos = action.payload?.data;
            state.loading = false
        })
        builder.addCase(getCryptos.rejected, (state) => {
            state.connection = false
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
        loading: true,
        connection: true
    },
    extraReducers: (builder) => {
        builder.addCase(getCryptoDetails.fulfilled, (state, action) => {
            state.details = action.payload?.data;
            state.loading = false
        })
        builder.addCase(getCryptoDetails.rejected, (state) => {
            state.connection = false
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

export const getExchangesSlice = createSlice({
    name: "getExchanges",
    initialState: {
        exchanges: {},
        loading: true,
        connection: true
    },
    extraReducers: (builder) => {
        builder.addCase(getExchanges.fulfilled, (state, action) => {
            state.exchanges = action.payload?.data;
            state.loading = false
        })
        builder.addCase(getExchanges.rejected, (state) => {
            state.connection = false
        })
    }
});
export const getCryptosStatsGainerSlice = createSlice({
    name: "getCryptosStatsGainer",
    initialState: {
        cryptosStatsGainer: {},
        loading: true,
        connection: true
    },
    extraReducers: (builder) => {
        builder.addCase(getCryptosStatsGainer.fulfilled, (state, action) => {
            state.cryptosStatsGainer = action.payload?.data;
            state.loading = false
        })
        builder.addCase(getCryptosStatsGainer.rejected, (state) => {
            state.connection = false
        })
    }
});
export const getCryptosStatsLoserSlice = createSlice({
    name: "getCryptosStatsLoser",
    initialState: {
        cryptosStatsLoser: {},
        loading: true,
        connection: true
    },
    extraReducers: (builder) => {
        builder.addCase(getCryptosStatsLoser.fulfilled, (state, action) => {
            state.cryptosStatsLoser = action.payload?.data;
            state.loading = false
        })
        builder.addCase(getCryptosStatsLoser.rejected, (state) => {
            state.connection = false
        })
    }
});
// export default getCryptosSlice;


