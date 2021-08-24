import './list.scss';


const List = ({ items }) => {
    return (
        <ul className="list">
            { 
                items.map(item => 
                    <li className={item.active ? 'active' : ''}>
                        <i>{item.icon ? item.icon : <i className={`marker marker--${item.color}`}></i>} </i>
                        <span>{item.name}</span>
                    </li>
                )
            }
        </ul>
    )
}

export default List;