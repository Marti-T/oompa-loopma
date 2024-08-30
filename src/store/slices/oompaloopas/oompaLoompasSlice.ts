import { createSlice } from '@reduxjs/toolkit';
import { Result, Detail } from '../../../interfaces/oompaLoompas';
import { checkDateExpired } from '../../../helpers/checkDateExpired';


interface OompaLoompasState {
    page: number;
    oompaloompas: Result[];
    isLoading: boolean;
    detail: Detail | null;
    hasMoreData: boolean;
    error: string | null;
}

const initialState: OompaLoompasState = {
    page:  JSON.parse(localStorage.getItem('oompaLoompasPage') || '0'),
    oompaloompas: checkDateExpired('oompaLoompasList') ? [] : JSON.parse(localStorage.getItem('oompaLoompasList') || '[]'),
    isLoading: false,
    detail: checkDateExpired('oompaLoompasDetail') ? null : JSON.parse(localStorage.getItem('oompaLoompasDetail') || 'null'),
    hasMoreData: true,
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

            const newOompas = action.payload.oompaloompas.filter((newOompa: Result) => {
                return !state.oompaloompas.some(existingOompa => existingOompa.id === newOompa.id);
            });

            const updatedOompas = [...state.oompaloompas, ...newOompas];
            state.oompaloompas = updatedOompas;
            
            localStorage.setItem('oompaLoompasPage', JSON.stringify(state.page));

            if (updatedOompas.length > 0) {
                localStorage.setItem('oompaLoompasList', JSON.stringify(updatedOompas));
                localStorage.setItem('oompaLoompasListTimestamp', JSON.stringify(Date.now()));
            }

            state.hasMoreData = newOompas.length > 0;
        },
        setOompaLoompasDetail: (state, action) => {
            state.isLoading = false;
            const newDetail = {
                id: action.payload.id,
                ...action.payload.oompaloompas,
            };
        
            const storedDetails = JSON.parse(localStorage.getItem('oompaLoompasDetail') || '[]');
        
            const nonDuplicateDetails = storedDetails.filter(
                (existingDetail: { id: number }) => existingDetail.id !== newDetail.id
            );
        
            const updatedDetails = [...nonDuplicateDetails, newDetail];
        
            localStorage.setItem('oompaLoompasDetail', JSON.stringify(updatedDetails));
        
            state.detail = newDetail;
        },
        filterOompaLoompas: (state, action) => {
            const searchTerm = action.payload.toLowerCase();
            const localStoreOompasList = JSON.parse(localStorage.getItem('oompaLoompasList') || '[]');
            
            if (localStoreOompasList.length > 0) {
                state.oompaloompas = localStoreOompasList.filter((oompa: Result) =>
                    oompa.first_name.toLowerCase().includes(searchTerm) ||
                    oompa.last_name.toLowerCase().includes(searchTerm) ||
                    oompa.profession.toLowerCase().includes(searchTerm)
                );
            }
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