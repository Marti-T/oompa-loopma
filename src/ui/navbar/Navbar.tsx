import { Link } from 'react-router-dom';
import oompaLumpaLogo from '../../assets/logo-oompa-loompas.png';

import './navbar.scss';


export const Navbar = () => {
  return (
    <>
        <div className="navbar">
            <div className="container">
                <div className="navbar__content">
                    <Link to="/">
                        <img src={ oompaLumpaLogo } alt="Oompa Loompa's Crew" className="navbar__logo" />
                    </Link>
                    <p className="navbar__title">Oompa Loompa's Crew</p>
                </div>
            </div>
        </div>
    </>
  )
}
