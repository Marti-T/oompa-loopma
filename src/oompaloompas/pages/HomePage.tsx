import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/index';
import { getOompaloompasList } from "../../store/slices/oompaloopas";
import { checkDateExpired } from '../../helpers/checkDateExpired';
import { OompaLoompaCard, Search } from '../components';


export const HomePage = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { isLoading, oompaloompas, page, total, error } = useSelector((state: RootState) => state.oompaloompas); 
    const [hasMoreData, setHasMoreData] = useState(true);


    useEffect(() => {
        const storedOompaLoompas = JSON.parse(localStorage.getItem('oompaLoompasList') || '[]');
        const storedPage = JSON.parse(localStorage.getItem('oompaLoompasPage') || '0');
        const storedTotal = JSON.parse(localStorage.getItem('oompaLoompasTotalPages') || '0');
    
        const hasExpired = checkDateExpired('oompaLoompasList');
    
        if (hasExpired || storedOompaLoompas.length === 0) {
            dispatch(getOompaloompasList(0)).then(() => {
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

    useEffect(() => {
        if (oompaloompas.length > 0) {
            localStorage.setItem('oompaLoompasList', JSON.stringify(oompaloompas));
            localStorage.setItem('oompaLoompasPage', JSON.stringify(page));
            localStorage.setItem('oompaLoompasTotalPages', JSON.stringify(total));
        }
    }, [oompaloompas, page, total]);


    const handleMoreOompaLoompas = useCallback(() => {
        if (page >= total) {
            setHasMoreData(false);
        } else {
            dispatch(getOompaloompasList(page + 1));
        }
    }, [dispatch, page, total]);


    useEffect(() => {
        if(page <= total) {
            const handleScroll = () => {
                if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight && !isLoading) {
                    handleMoreOompaLoompas();
                }
            };

            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, [handleMoreOompaLoompas, isLoading, total, page]);
    

    return (
        <>
            <Search />


            <div className="home-page">
                <div className="container">
                    <h1 className="home-page__title">Find your Oompa Loompa</h1>
                    <h2 className="home-page__sub-title">There are more than 100k</h2>
                </div>
            </div>


            {error && ( <div className="error">Error: {error}</div> )}


            <div className="oompa-loompa-card">
                <div className="container">
                    
                    <ul className="oompa-loompa-card__list">
                        {
                            oompaloompas.length > 0 ? (
                                oompaloompas.map( oompa => (
                                    <OompaLoompaCard key={ oompa.id } { ...oompa } />
                                ))
                            ) : (
                                !isLoading && (
                                    <div className="oompa-loompa-card__list-no-more">
                                        No Oompa Loompas found !!
                                    </div>
                                )
                            )
                        }
                    </ul>

                    
                    {isLoading && (
                        <div className="loader">
                            <div className="loader__spinner"></div>
                        </div>
                    )}

                    
                    {!hasMoreData && !isLoading && (
                        <div className="oompa-loompa-card__list-no-more">
                            No more Oompa Loompas !!
                        </div>
                    )}
                </div>
            </div>            
        </>
    )
}