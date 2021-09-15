import React from 'react';
import List from '../List';
import Marker from '../Marker';
import axios from 'axios';

import './addList.scss'

import closeSvg from '../../assets/icons/close.svg'


const AddList = ({ colors, onAdd }) => {
    const [visibleListForm, setVisibleListForm] = React.useState(false);   //стэйт мини-формы добавления нового листа
    const [selectedColor, setColor] = React.useState(3);
    const [inputValue, setInputValue] = React.useState('');   //пустое значение, т.к. инпут изначально пустой
    const [isLoading, setIsLoading] = React.useState(false);   //стэйт отправки на сервер нового листа

    React.useEffect(() => {
        if (Array.isArray(colors)) {   //если colors является массивом
            setColor(colors[0].id);   //применить по умолчанию первый маркер цвета
        }
    }, [colors]);   //если colors изменился, то выз-тся ф-ция

    //Если закрытие модалки по крестику:
    const onClose = () => {
        setVisibleListForm(false);
        setInputValue('');
        setColor(colors[0].id);
    }

    //Добавление нового названия списка:
    const addList = () => {
        if(!inputValue) {   //если ничего не написали в input
            alert('Введите название списка');
            return;   //прерывается выполнение
        }

        setIsLoading(true);   //перед тем как отправить запрос -> загрузка

        axios.post('http://localhost:3001/lists', {   //отправка запроса //доб-ем новую сущность - об-кт
            name: inputValue,
            colorId: selectedColor
        })
        .then(({ data }) => {
            const color = colors.find(color => color.id === selectedColor);   //задаём название цвета  //проверяем совпадает ли id цвета с тем цветом, что мы выбрали
            const listObj = { ...data, color, tasks: [] };   //все св-ва из ответа + новый об-кт color
            onAdd(listObj);   //передаем об-кт нового эл-та списка в onAddList
            onClose();
        }).catch(() => {
            alert("Упс! Ошибка при добавлении списка")
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

    return (
        <div className="add-list">
            <List
                items={[
                    {
                        className: 'list__add-button',
                        icon: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 1V11" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M1 6H11" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>,
                        name: 'Добавить список'
                    }
                ]}
                onClick = {
                    () => setVisibleListForm(true)   //Показываем модалку добавления нового списка
                }
            />

            {visibleListForm && (   //Если visibleListForm у нас true, тогда отображается <div>
                <div className="add-list__form">
                    <div className="add-list__form-close-btn">
                    <img 
                        onClick={onClose}
                        src={closeSvg}
                        alt="Close button"
                    />
                    </div>

                    <input 
                        value={inputValue}
                        onChange={event => setInputValue(event.target.value)}
                        type="text" 
                        className="textarea" 
                        placeholder="Название списка"
                    />
                    
                    <div className="add-list__form-colors">  
                    {colors.map(color => (
                            <Marker 
                                onClick={() => setColor(color.id)}   //меняем состояние selectedColor: null на id цвета
                                key={color.id} 
                                color={color.name}
                                className={selectedColor === color.id && 'active'}   //если выбраный цвет соответствует хотя бы одному color.id, тогда добавится .active
                            />
                    ))}
                    </div>
                    <button 
                        onClick={addList} 
                        className="button">
                        {isLoading ? 'Добавление...' : 'Добавить'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddList;