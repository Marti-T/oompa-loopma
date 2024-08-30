import { ChangeEvent, useState } from 'react';
import { filterOompaLoompas } from '../../store/slices/oompaloopas';
import { useDispatch } from 'react-redux';


export const Search = () => {

    const [ searchTerm, setSearchTerm ] = useState('');
    const dispatch = useDispatch();

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        dispatch(filterOompaLoompas(value));
    };

    const handleClear = () => {
        setSearchTerm('');
        dispatch(filterOompaLoompas(''));
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
