import React from 'react';
import { useMedia } from 'react-use';
import crossIcon from '../images/icon-cross.svg';

const List = (props) => {

  const isLarge = useMedia('(min-width: 750px)');

  const todoList = props.todoList.map(item =>(
    <li key={item.id}>
      <input type='checkbox' aria-label='toggle complete-status' className='complete-btn' onClick={()=>{props.toggleCompleted(item.id)}}></input>
      <span className={item.completed ? 'completed' : undefined}>{item.text}</span>
      <button className='delete-btn' onClick={(e)=>{props.deleteTodo(e, item.id)}}><img src={crossIcon} alt=""/></button>
    </li>
  ))

  return (
    <div className={props.darkMode ? 'list-container dark':'list-container'}>
      <ul>
        {props.todoList.length === 0 && <li className='no-todo'>All caught up!</li>}
        {todoList}
      </ul>
      <div className='status'>
          <span>{props.todoList.length} items left</span>
          {isLarge && (
            <div>
              <button>All</button>
              <button>Active</button>
              <button>Completed</button>
            </div>
          )}
          <button className='clear-btn' onClick={()=>{props.clearCompleted()}}>Clear completed</button>
        </div>
      {!isLarge && (
          <div className='filter-small'>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
          </div>
        )}
    </div>
  )
}

export default List;
