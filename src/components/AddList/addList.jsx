import React from 'react';
import List from '../List/List';
import '../List/list.scss';
import './addList.scss'

const AddList= () => {
    return (
        <div className="add-list">
            <List 
                items={[
                    {
                        className: 'list__add-button',
                        icon: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 1V11" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M1 6H11" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>,
                        name: 'Добавить список'
                    }
                ]}
            />
            <div className="add-list__form"></div>
        </div>
    );
};

export default AddList;