import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getOompaloompasDetail } from "../../store/slices/oompaloopas";
import { AppDispatch, RootState } from '../../store/index';
import { Detail, Gender } from '../../interfaces/oompaLoompas';
import { checkDateExpired } from '../../helpers/checkDateExpired';


export const DetailPage = () => {

    const params = useParams<{ id: string }>();
    const id = Number(params.id);
    const navigate = useNavigate();

    const [detail, setDetail] = useState<Detail | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading, oompaDetail, error } = useSelector((state: RootState) => state.oompaloompas);


    useEffect(() => {
        if (isNaN(id)) {
            navigate('/');
            return;
        }

        const isExpired = checkDateExpired('oompaLoompasList'); 

        if (isExpired) {
            // Si ha expirado, volvemos a pedir los detalles desde Redux
            dispatch(getOompaloompasDetail(id));
        } else {
            // Si no ha expirado, buscamos los detalles en localStorage
            const storedOompaDetails = JSON.parse(localStorage.getItem('oompaLoompasDetail') || '[]');
            const foundStoredDetail = storedOompaDetails.find((oompa: Detail) => oompa.id === id);

            if (foundStoredDetail) {
                setDetail(foundStoredDetail); // Si está en localStorage, lo usamos
            } else {
                dispatch(getOompaloompasDetail(id)); // Si no está en localStorage, pedimos los detalles
            }
        }
    }, [dispatch, id, navigate]); 


    useEffect(() => {
        if (oompaDetail.length > 0) {
            const foundDetail = oompaDetail.find((oompa) => oompa.id === id);
            
            if (foundDetail && !detail) {
                setDetail(foundDetail);
            }

            const storedOompaDetails = JSON.parse(localStorage.getItem('oompaLoompasDetail') || '[]');
            const isOompaStored = storedOompaDetails.some((oompa: Detail) => oompa.id === id);

            if (!isOompaStored && foundDetail) {
                const updatedOompaDetails = [...storedOompaDetails, foundDetail];
                localStorage.setItem('oompaLoompasDetail', JSON.stringify(updatedOompaDetails));
                localStorage.setItem('oompaLoompasListTimestamp', JSON.stringify(Date.now()));
            }
        }
    }, [oompaDetail, id, detail]);
    

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