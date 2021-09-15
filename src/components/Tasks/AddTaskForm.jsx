import React from 'react';
import axios from 'axios';

import addSvg from '../../assets/icons/plus.svg';


const AddTaskForm = ({ list, onAddTask }) => {
    const [visibleForm, setVisibleForm] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const [isSending, setIsSending] = React.useState('');   //стэйт загрузки тасков

    //Появление-скрытие формы:
    const toggleForm = () => {
        setVisibleForm(!visibleForm);
        setInputValue('');
    }

    //Добавление нового таска:
    const addTask = () => {
        const newTask = {   //формируем об-кт нового таска
            "listId": list.id,   //указываем в какой именно список нужно добавить->
            "text": inputValue,
            "completed": false
        };
        setIsSending(true);
        axios.post('http://localhost:3001/tasks', newTask).then(({ data }) => {
            onAddTask(list.id, data);   //->и прокидываем данные сюда
            toggleForm();
        }).catch(e => {
            alert("Упс! Ошибка при добавлении задачи")
        })
        .finally(() => {
            setIsSending(false);
        });
    }


    return (
        <div>
            <div className="tasks__form">
                {!visibleForm 
                ? 
                (<div onClick={toggleForm} className="tasks__form-new">   {/**передаём true в стэйт */}
                    <img src={addSvg} alt="Add"/>
                    <span>Новая задача</span>
                </div>)
                :
                (<div className="tasks__form-fields">
                    <input
                        value={inputValue}
                        type="text" 
                        className="textarea" 
                        placeholder="Текст задачи"
                        onChange={e => setInputValue(e.target.value)}   //при каждом изменении инпута получаем событие и передаём с стэйт
                    />
                    <button disabled={isSending} onClick={addTask} className="button">   {/**если isSending=true, то кнопка блокируется */}
                        {isSending ? 'Добавление...' : 'Добавить задачу'}</button>
                    <button onClick={toggleForm} className="button button--grey">Отмена</button>
                </div>)
                }
            </div>
        </div>
    )
}

export default AddTaskForm;