import { configureStore } from "@reduxjs/toolkit";
import userReduser from"../features/userSlice"
export const store=configureStore({
    reducer:{
        user:userReduser,
    },
      middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ⚡ non-serializable warningni o‘chiradi
    }),
})