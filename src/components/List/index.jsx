import classNames from 'classnames';
import './list.scss';
import Marker from '../Marker';
import axios from 'axios';
import removeSvg from '../../assets/icons/close.svg';


const List = ({ items, isRemovable, onClick, onRemove }) => {

    const removeListQuestion = (item) => {
        if(window.confirm('Вы действительно хотите удалить список?')) {
            axios.delete('http://localhost:3001/lists/' + item.id).then(() => {    //ф-ция удаления айтема
                onRemove(item.id);
            })
        }
    }

    return (
        <ul onClick={onClick} className="list">
            { 
                items.map((item, index) => 
                    <li 
                        key={index}
                        className={classNames(item.className, { active: item.active } )}
                    >
                        <i>
                            {item.icon 
                            ? item.icon 
                            : <Marker color={item.color.name}/>
                            }
                        </i>
                        <span>{item.name}</span>
                        {isRemovable &&  ( //отображение крестиков удаления в списке
                            <img 
                                src={removeSvg} 
                                className="list__remove-icon" 
                                alt="Remove"
                                onClick={() => removeListQuestion(item)}   //передаем функцие айтем списка
                            />
                        )}
                    </li>
                )
            }
        </ul>
    )
}

export default List;