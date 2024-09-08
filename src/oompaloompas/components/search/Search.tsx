import { ChangeEvent, useEffect, useState } from 'react';
import { filterOompaLoompas } from '../../../store/slices/oompaloopas';
import { useDispatch } from 'react-redux';
import { Result } from '../../../interfaces/oompaLoompas';

import './search.scss';


export const Search = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [localStoreOompasList, setLocalStoreOompasList] = useState<Result[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const storedOompasList = JSON.parse(localStorage.getItem('oompaLoompasList') || '[]');
        setLocalStoreOompasList(storedOompasList);
    }, []);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);

        if (localStoreOompasList.length > 0) {
            const filteredOompas = localStoreOompasList.filter((oompa: Result) =>
                oompa.first_name.toLowerCase().includes(value) ||
                oompa.last_name.toLowerCase().includes(value) ||
                oompa.profession.toLowerCase().includes(value)
            );
            dispatch(filterOompaLoompas(filteredOompas));
        }
    };

    const handleClear = () => {
        setSearchTerm('');
        dispatch(filterOompaLoompas(localStoreOompasList));
    };

    return (
        <div className="search">
            <div className="container">
                <div className="search__content">
                    <input
                        type="text"
                        placeholder="Search Oompa Loompas"
                        value={ searchTerm }
                        onChange={ handleSearch }
                        className="search__input"
                    />
                    <button 
                        className="search__btn-clear"
                        onClick={handleClear} 
                    >
                        Clear
                    </button>
                </div>
            </div>
        </div>
    )
}
