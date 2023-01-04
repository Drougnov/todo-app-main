import React from 'react';
import { useMedia } from 'react-use';
import crossIcon from '../images/icon-cross.svg';

const List = (props) => {

  const isLarge = useMedia('(min-width: 750px)');
  console.log(props.todoList)

  const todoList = props.todoList.map(item =>(
    <li key={item.id}>
      <button type='submit' aria-label='add todo' className='add-btn'></button>
      <span>{item}</span>
      <button className='delete-btn'><img src={crossIcon} alt=""/></button>
    </li>
  ))

  return (
    <div className={props.darkMode ? 'list-container dark':'list-container'}>
      <ul>
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
          <button className='clear-btn'>Clear completed</button>
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
