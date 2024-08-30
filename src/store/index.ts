import { configureStore } from '@reduxjs/toolkit';
import { oompaLoompasSlice } from './slices/oompaloopas';


export const store = configureStore({
    reducer: {
        oompaloompas: oompaLoompasSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;