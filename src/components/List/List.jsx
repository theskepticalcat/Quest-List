import classNames from 'classnames';
import './list.scss';

const List = ({ items }) => {
    return (
        <ul className="list">
            { 
                items.map((item, index) => 
                    <li key={index} className={classNames(item.className, {'active': item.active})}>
                        <i>{item.icon ? item.icon : <i className={`marker marker--${item.color}`}></i>} </i>
                        <span>{item.name}</span>
                    </li>
                )
            }
        </ul>
    )
}

export default List;