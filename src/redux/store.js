import { configureStore } from '@reduxjs/toolkit'
import { accountSlice } from './account/account.reducer'

export default configureStore({
    reducer: {
        account: accountSlice.reducer,
    },
})