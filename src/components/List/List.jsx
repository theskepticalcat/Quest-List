import classNames from 'classnames';
import './list.scss';
import Marker from '../Marker/Marker';


const List = ({ items, isRemovable, onClick }) => {
    return (
        <ul onClick={onClick} className="list">
            { 
                items.map((item, index) => 
                    <li 
                        key={index}
                        className={classNames(item.className, {'active': item.active})}>
                        <i>
                            {item.icon 
                            ? item.icon 
                            : <Marker color={item.color}/>
                            }
                        </i>
                        <span>{item.name}</span>
                    </li>
                )
            }
        </ul>
    )
}

export default List;