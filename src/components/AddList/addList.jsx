import React from 'react';
import List from '../List/List';
import Marker from '../Marker/Marker';
import './addList.scss'
import closeSvg from '../../assets/icons/close.svg'


const AddList = ({ colors }) => {
    const [visibleListForm, setVisibleListForm] = React.useState(false);
    const [selectedColor, setColor] = React.useState(colors[0].id);   //дефолтно первый маркер будет выделен

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
                    <input type="text" className="textarea" placeholder="Название списка"></input>
                    <div className="add-list__form-colors">  
                    {
                        colors.map(color =>
                            <Marker 
                                onClick={() => setColor(color.id)}   //меняем состояние: null на id цвета
                                key={color.id} 
                                color={color.name}
                                className={selectedColor === color.id && 'active'}   //если выбраный цвет соответствует хотя бы одному color.id, тогда добавится .active
                            />
                        )
                    }
                    </div>
                    <button className="button">Добавить</button>
                </div>
            )}
        </div>
    );
};

export default AddList;