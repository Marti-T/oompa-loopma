import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from '../ui';
import { DetailPage, HomePage } from '../oompaloompas/pages';


export const AppRouter = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/detail/:id" element={<DetailPage />} />

                <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
        </>
    )
}
