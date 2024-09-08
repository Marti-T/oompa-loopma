import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/index'; 
import { getOompaloompasList } from '../store/slices/oompaloopas'; 
import { checkDateExpired } from '../helpers/checkDateExpired'; 

export const useOompaLoompasLoader = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const storedOompaLoompas = JSON.parse(localStorage.getItem('oompaLoompasList') || '[]');
        const storedPage = JSON.parse(localStorage.getItem('oompaLoompasPage') || '0');
        const storedTotal = JSON.parse(localStorage.getItem('oompaLoompasTotalPages') || '0');
    
        const hasExpired = checkDateExpired('oompaLoompasList');
    
        if (hasExpired || storedOompaLoompas.length === 0) {
            dispatch(getOompaloompasList(1)).then(() => {
                localStorage.setItem('oompaLoompasListTimestamp', JSON.stringify(Date.now()));
            });
        } else {
            dispatch({
                type: 'oompaloompas/setOompaLoompasList',
                payload: {
                    oompaloompas: storedOompaLoompas,
                    page: storedPage,
                    total: storedTotal
                }
            });
        }
    }, [dispatch]);
}