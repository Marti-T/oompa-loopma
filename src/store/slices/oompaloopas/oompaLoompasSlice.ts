import { createSlice } from '@reduxjs/toolkit';
import { Result, Detail } from '../../../interfaces/oompaLoompas';
import { filterDuplicates } from '../../../helpers/filterDuplicates';


interface OompaLoompasState {
    page: number;
    total: number;
    oompaloompas: Result[];
    isLoading: boolean;
    id: number;
    oompaDetail: Detail[];
    error: string | null;
}

const initialState: OompaLoompasState = {
    page:  0,
    total: 0,
    oompaloompas: [],
    isLoading: false,
    id: 0,
    oompaDetail: [],
    error: null,
};

export const oompaLoompasSlice = createSlice({
    name: 'oompaloompas',
    initialState,
    reducers: {
        startLoadingOompaloompas: (state) => {
            state.isLoading = true;
        },
        setOompaLoompasList: (state, action) => {
            state.isLoading = false;
            state.page = action.payload.page;

            state.oompaloompas = filterDuplicates(state.oompaloompas, action.payload.oompaloompas);
            state.total = action.payload.total;
        },
        setOompaLoompasDetail: (state, action) => {
            state.isLoading = false;

            const newDetail = {
                id: action.payload.id,
                ...action.payload.oompaloompas,
            };

            state.oompaDetail = filterDuplicates(state.oompaDetail, [newDetail]);          
        },
        filterOompaLoompas: (state, action) => {
            state.oompaloompas = action.payload;
        },
        errorsFetchingOompaloompas: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    },
})

export const { 
    startLoadingOompaloompas, 
    setOompaLoompasList, 
    setOompaLoompasDetail, 
    filterOompaLoompas,
    errorsFetchingOompaloompas
} = oompaLoompasSlice.actions;