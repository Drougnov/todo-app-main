import React from 'react';
import crossIcon from '../images/icon-cross.svg';

const ListItem = ({ item, toggleCompleted, deleteTodo, completed }) => {
    const handleChange = (event) => {
        toggleCompleted(item.id, event.target.checked);
    }
    return (
        <li key={item.id} onClick={()=>{toggleCompleted(item.id)}}>
            <input
                title={completed ? 'Mark as incomplete' : 'Mark as complete'}
                type='checkbox'
                checked={completed}
                aria-label='toggle complete-status'
                className='complete-btn'
                onClick={()=>{
                    toggleCompleted(item.id)
                }}
                onChange={handleChange}>
            </input>
            <span className={completed ? 'completed' : undefined}>{item.text}</span>
            <button
                title='Delete todo'
                className='delete-btn'
                onClick={(e)=>{
                    deleteTodo(e, item.id)
                }}>
                <img src={crossIcon} alt=""/>
            </button>
        </li>
    );
};

export default ListItem;