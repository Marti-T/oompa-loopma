import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/';

import { OompaLoompasApp } from './OompaLoompasApp';

import './styles/index.scss';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={ store }>
            <BrowserRouter>
                <OompaLoompasApp />
            </BrowserRouter>
        </Provider>
    </StrictMode>,
)
