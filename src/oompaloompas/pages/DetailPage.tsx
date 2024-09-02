import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getOompaloompasDetail } from "../../store/slices/oompaloopas";
import { AppDispatch, RootState } from '../../store/index';
import { Detail, Gender } from '../../interfaces/oompaLoompas';


export const DetailPage = () => {

    const params = useParams<{ id: string }>();
    const id = Number(params.id);
    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>();
    const { isLoading, oompaDetail, error } = useSelector((state: RootState) => state.oompaloompas);
    const [detail, setDetail] = useState<Detail | null>(null);


    useEffect(() => {

        if (isNaN(id)) {
            navigate('/');
            return;
        }

        const storedOompaDetails = JSON.parse(localStorage.getItem('oompaLoompasDetail') || '[]');
        const foundStoredDetail = storedOompaDetails.find((oompa: Detail) => oompa.id === id);

        if (foundStoredDetail) {
            setDetail(foundStoredDetail);
        } else {  
            dispatch(getOompaloompasDetail(id));
        }
        
    }, [dispatch, id, navigate]);   


    useEffect(() => {
        if (detail) {
            const storedOompaDetails = JSON.parse(localStorage.getItem('oompaLoompasDetail') || '[]');
            const isOompaStored = storedOompaDetails.some((oompa: Detail) => oompa.id === detail.id);

            if (!isOompaStored) {
                const updatedOompaDetails = [...storedOompaDetails, detail];
                localStorage.setItem('oompaLoompasDetail', JSON.stringify(updatedOompaDetails));
            }
        }
    }, [detail]);


    useEffect(() => {
        if (!detail && oompaDetail.length > 0) {
            const foundDetail = oompaDetail.find((oompa) => oompa.id === id);

            if (foundDetail) {
                setDetail(foundDetail);
            }
        }
    }, [oompaDetail, detail, id]);


    return (
        <>
            {isLoading && (
                <div className="loader">
                    <div className="loader__spinner"></div>
                </div>
            )}

            {error && (<div className="error">Error: {error}</div>)}

            {detail && (
                <div className="oompa-loompa-detail animate__animated animate__fadeIn">
                    <div className="container">
                        <div className="oompa-loompa-detail__content">
                            <div>
                                <img
                                    src={detail.image}
                                    alt={`${detail.first_name} ${detail.last_name}`}
                                    className="oompa-loompa-detail__image"
                                />
                            </div>
                            <div>
                                <div className="oompa-loompa-detail__info">
                                    <h1 className="oompa-loompa-detail__title">{detail.first_name} {detail.last_name}</h1>
                                    <p className="oompa-loompa-detail__gender">{detail.gender === Gender.F ? 'Women' : 'Men'}</p>
                                    <p className="oompa-loompa-detail__profession">{detail.profession}</p>
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