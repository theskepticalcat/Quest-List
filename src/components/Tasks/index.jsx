import './tasks.scss';
import penSvg from '../../assets/icons/pen.svg';
import axios from 'axios';
import AddTaskForm from './AddTaskForm';


const Tasks = ({ list, onEditTitle, onAddTask }) => {

    //Изменение названия списка:
    const editTitle = () => {
        const newTitle = window.prompt('Название списка', list.name);
        if(newTitle) {   //если пользователь что-то ввёл
            onEditTitle(list.id, newTitle);   //меняется состояние
            axios.patch('http://localhost:3001/lists/' + list.id, {   //изменяем название в базе //изменение по указанному list.id
                name: newTitle
            }).catch(() => {
                alert("Не удалось изменить название");
            });
        }
    }

    return (
        <div className="tasks">
            <h2 className="tasks__title">
              {list.name}
                <img 
                    onClick={editTitle} 
                    src={penSvg} 
                    alt="Edit"
                />
            </h2>

            <div className="tasks__items">
                {!list.tasks.length && <h2>Нет новых задач</h2>}   {/*если отрицательное значение количества тасков*/}
                {list.tasks.map(task => (
                    <div key={task.id} className="tasks__items-item">
                        <div className="tasks__checkbox">
                            <input 
                                id={`task-${task.id}`}   //каждый таск уникален
                                type="checkbox"
                            />
                            <label htmlFor={`task-${task.id}`}>
                                <svg 
                                    width="11" 
                                    height="8" 
                                    viewBox="0 0 11 8" 
                                    fill="none" 
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path 
                                        d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" 
                                        stroke="#000" 
                                        strokeWidth="1.5" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </label>
                        </div>

                        <input readOnly value={task.text} />
                    </div>
                    ))
                }
                <AddTaskForm 
                    list={list} 
                    onAddTask={onAddTask}
                />
            </div>
        </div>
    );
}

export default Tasks;