
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOompaloompasDetail } from "../../store/slices/oompaloopas";
import { AppDispatch, RootState } from '../../store/index';
import { Detail, Gender } from '../../interfaces/oompaLoompas';

export const DetailPage = () => {

    const params = useParams<{ id: string }>();
    const id = Number(params.id);

    const dispatch = useDispatch<AppDispatch>();
    const { isLoading, error } = useSelector((state: RootState) => state.oompaloompas);
    const storeOompaLompasDetail = useSelector((state: RootState) => state.oompaloompas.detail);

    const [detail, setDetail] = useState<Detail | null>(null);

    useEffect(() => {
        const storedDetails = JSON.parse(localStorage.getItem('oompaLoompasDetail') || '[]');
        const localDetail = storedDetails.find((item: Detail) => item.id === id);

        if (localDetail) {
            setDetail(localDetail);
        } else {
            dispatch(getOompaloompasDetail(id));
        }
    }, [dispatch, id]);

    
    useEffect(() => {
        if (storeOompaLompasDetail && storeOompaLompasDetail.id === id && !detail) {
            setDetail(storeOompaLompasDetail);
        }
    }, [storeOompaLompasDetail, id, detail]);
    

    return (
        <>
            {isLoading && (
                <div className="loader">
                    <div className="loader__spinner"></div>
                </div>
            )}

            {error && ( <div className="error">Error: {error}</div> )}

            {detail && (
                <div className="oompa-loompa-detail animate__animated animate__fadeInUp">
                    <div className="container">
                        <div className="oompa-loompa-detail__content">
                            <div>
                                <img 
                                    src={ detail.image } 
                                    alt={ `${detail.first_name} ${detail.last_name}` } 
                                    className="oompa-loompa-detail__image"
                                />
                            </div>
                            <div>
                                <div className="oompa-loompa-detail__info">
                                    <h1 className="oompa-loompa-detail__title">{ detail.first_name } { detail.last_name }</h1>
                                    <p className="oompa-loompa-detail__gender">{ detail.gender === Gender.F ? 'Women' : 'Men' }</p>
                                    <p className="oompa-loompa-detail__profession">{ detail.profession }</p>
                                </div>
                                <div 
                                    className="oompa-loompa-detail__description" 
                                    dangerouslySetInnerHTML={{ __html: detail.description }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}