import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/index';
import { getOompaloompasList } from "../../store/slices/oompaloopas";
import { checkDateExpired } from '../../helpers/checkDateExpired';
import { OompaLoompaCard, Search } from '../components';


export const HomePage = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { isLoading, oompaloompas = [], page, hasMoreData, error } = useSelector((state: RootState) => state.oompaloompas); 
    const currentPage = localStorage.getItem('oompaLoompasPage');

    const handleMoreOompaLoompas = useCallback(() => {
        const nextPage = page + 1;
        localStorage.setItem('oompaLoompasPage', JSON.stringify(nextPage));
        dispatch(getOompaloompasList(nextPage));
    }, [dispatch, page]);


    useEffect(() => {
        const hasExpired = checkDateExpired('oompaLoompasListTimestamp');
        if (hasExpired || oompaloompas.length === 0) {
            dispatch(getOompaloompasList(Number(currentPage)));
        }
    }, []);
    

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100 && !isLoading) {
                handleMoreOompaLoompas();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleMoreOompaLoompas, isLoading, hasMoreData]);
    

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