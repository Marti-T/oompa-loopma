import { Link } from 'react-router-dom';
import { Result, Gender } from '../../interfaces/oompaLoompas';


export const OompaLoompaCard = ({ id, image, first_name, last_name, gender, profession }: Result) => {
  return (
    <>
        <li className="oompa-loompa-card__item" key={ id }>
            <div className="oompa-loompa-card__content">
                <Link to={`/detail/${ id }`}>
                    <div className="oompa-loompa-card__image-content">
                        <img src={ image } className="oompa-loompa-card__image" alt={`${first_name} ${last_name}`}/>
                    </div>
                </Link>
                <div className="oompa-loompa-card__info">
                    <Link to={`/detail/${ id }`} className="oompa-loompa-card__link">
                        <h2 className="oompa-loompa-card__name">{ first_name } { last_name }</h2>
                    </Link>
                    <p className="oompa-loompa-card__gender">{ gender === Gender.F ? 'Women' : 'Men' }</p>
                    <p className="oompa-loompa-card__profession">{ profession }</p>
                </div>
            </div>
        </li>
    </>
  )
}
