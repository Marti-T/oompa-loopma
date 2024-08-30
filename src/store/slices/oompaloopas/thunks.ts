
import oompaLoompasApi from '../../../api/oompaLoompasApi';
import { setOompaLoompasList, setOompaLoompasDetail, startLoadingOompaloompas, errorsFetchingOompaloompas } from './oompaLoompasSlice';
import { Welcome } from '../../../interfaces/oompaLoompas';
import { AppDispatch } from '../..';


export const getOompaloompasList = ( page: number ) => {
    return async (dispatch: AppDispatch) => {
        dispatch(startLoadingOompaloompas());

        try {
            const { data } = await oompaLoompasApi.get<Welcome>(`?page=${page + 1}`);

            if (data.results.length === 0) {
                dispatch(setOompaLoompasList({ oompaloompas: [], page: page }));
            } else {
                dispatch(setOompaLoompasList({ oompaloompas: data.results, page: page + 1 }));
            }

        } catch (error) {
            const err = error as Error;
            dispatch(errorsFetchingOompaloompas(err?.message || 'Error fetching list Oompa Loompas'));
        }
    };
};


/* export const getOompaloompasDetail = ( id: number ) => {
    return async (dispatch: AppDispatch) => {
        dispatch( startLoadingOompaloompas() );

        const { data } = await oompaLoompasApi.get<Welcome>(`/${id}`);
        dispatch( setOompaLoompasDetail({ oompaloompas: data, id: id }));
    };
}; */

export const getOompaloompasDetail = (id: number) => {
    return async (dispatch: AppDispatch) => {
        dispatch(startLoadingOompaloompas());

        try {

            const { data } = await oompaLoompasApi.get<Welcome>(`/${id}`);
            dispatch(setOompaLoompasDetail({ oompaloompas: data, id: id }));

        } catch (error) {
            const err = error as Error;
            dispatch(errorsFetchingOompaloompas(err?.message || 'Error fetching detail Oompa Loompa'));
        }
    };
};
