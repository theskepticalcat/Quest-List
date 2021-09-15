import './tasks.scss';
import penSvg from '../../assets/icons/pen.svg';
import axios from 'axios';
import AddTaskForm from './AddTaskForm';
import Task from './Task';


const Tasks = ({ list, onEditTitle, onAddTask, onRemoveTask, onComplete, noEmptyLists }) => {
    
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
            <h2 style={{color: list.color.hex}} className="tasks__title">   {/**цвет заголовка соответствует цвету маркера списка в сайдбаре */}
              {list.name}
                <img 
                    onClick={editTitle} 
                    src={penSvg} 
                    alt="Edit"
                />
            </h2>

            <div className="tasks__items">
                {!noEmptyLists && list.tasks && !list.tasks.length && <h2>Нет новых задач</h2>}   {/*если нет флага noEmptyLists И отрицательное значение количества тасков*/}
                {list.tasks && 
                    list.tasks.map(task => (
                        <Task 
                            key={task.id} 
                            task={task}
                            list={list}   //чтобы таск знал свой родительский список
                            onRemove={onRemoveTask}
                            onComplete={onComplete}
                        />
                    ))
                }
                <AddTaskForm
                    key={list.id}   //по этому ключу решает нужно ли сделать ре-рендер
                    list={list} 
                    onAddTask={onAddTask}
                />
            </div>
        </div>
    );
}

export default Tasks;