import { configureStore } from "@reduxjs/toolkit";
import { getCryptoDetailsSlice, getCryptoHistorySlice, getCryptosSlice, getStatisticsSlice, getExchangesSlice } from "../Services/cryptoApi";
import { cryptoNewsApi } from "../Services/cryptoNewsApi";
import { cryptoTrendsApi } from "../Services/cryptoTrendsApi";


export default configureStore({
    reducer: {
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
        [cryptoTrendsApi.reducerPath]: cryptoTrendsApi.reducer,
        cryptos: getCryptosSlice.reducer,
        statistics: getStatisticsSlice.reducer,
        details: getCryptoDetailsSlice.reducer,
        cHistory: getCryptoHistorySlice.reducer,
        exchanges: getExchangesSlice.reducer,
    }
},
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)