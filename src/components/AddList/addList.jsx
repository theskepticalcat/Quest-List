import React from 'react';
import List from '../List/List';
import Marker from '../Marker/Marker';
import './addList.scss'
import closeSvg from '../../assets/icons/close.svg'


const AddList = ({ colors, onAdd }) => {
    const [visibleListForm, setVisibleListForm] = React.useState(false);
    const [selectedColor, setColor] = React.useState(colors[0].id);   //дефолтно первый маркер будет выделен
    const [inputValue, setInputValue] = React.useState('');   //пустое значение, т.к. инпут изначально пустой

    const addList = () => {
        if(!inputValue) {
            alert('Введите название списка');
            return;   //прерывается выполнение
        }
        onAdd({id: Math.random(), name: inputValue, colorId: null, color: colors.find(color => color.id === selectedColor).name });   //проверяем совпадает ли id цвета с тем цветом, что мы выбрали
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
                    <img 
                        onClick={() => setVisibleListForm(false)}
                        src={closeSvg}
                        alt="Close button"
                        className="add-list__form-close-btn"
                    />

                    <input 
                        value={inputValue}
                        onChange={event => setInputValue(event.target.value)}
                        type="text" 
                        className="textarea" 
                        placeholder="Название списка">
                    </input>
                    
                    <div className="add-list__form-colors">  
                    {colors.map(color =>
                            <Marker 
                                onClick={() => setColor(color.id)}   //меняем состояние selectedColor: null на id цвета
                                key={color.id} 
                                color={color.name}
                                className={selectedColor === color.id && 'active'}   //если выбраный цвет соответствует хотя бы одному color.id, тогда добавится .active
                            />
                    )}
                    </div>
                    <button onClick={addList} className="button">Добавить</button>
                </div>
            )}
        </div>
    );
};

export default AddList;