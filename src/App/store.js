import { configureStore } from "@reduxjs/toolkit";
import { getCryptoDetailsSlice, getCryptoHistorySlice, getCryptosSlice, getStatisticsSlice } from "../Services/cryptoApi";
import { cryptoNewsApi } from "../Services/cryptoNewsApi";


export default configureStore({
    reducer: {
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
        cryptos: getCryptosSlice.reducer,
        statistics: getStatisticsSlice.reducer,
        details: getCryptoDetailsSlice.reducer,
        cHistory: getCryptoHistorySlice.reducer,
    }
},
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)