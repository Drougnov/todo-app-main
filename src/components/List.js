import React from 'react';
import { useMedia } from 'react-use';
import crossIcon from '../images/icon-cross.svg';

const List = (props) => {
  const isLarge = useMedia('(min-width: 750px)');

  const [selectedButton, setSelectedButton] = React.useState('all');

  const handleButtonClick = button =>{
    setSelectedButton(button);
  }

  let todoList = props.todoList.map(item =>(
    <li key={item.id}>
      <input type='checkbox' checked={item.completed} aria-label='toggle complete-status' className='complete-btn' onClick={()=>{props.toggleCompleted(item.id)}}></input>
      <span className={item.completed ? 'completed' : undefined}>{item.text}</span>
      <button className='delete-btn' onClick={(e)=>{props.deleteTodo(e, item.id)}}><img src={crossIcon} alt=""/></button>
    </li>
  ))

  if (selectedButton === 'all') {
    todoList = props.todoList.map(item => (
      <li key={item.id}>
      <input type='checkbox' checked={item.completed} aria-label='toggle complete-status' className='complete-btn' onClick={()=>{props.toggleCompleted(item.id)}}></input>
      <span className={item.completed ? 'completed' : undefined}>{item.text}</span>
      <button className='delete-btn' onClick={(e)=>{props.deleteTodo(e, item.id)}}><img src={crossIcon} alt=""/></button>
    </li>
    ));
  } else if (selectedButton === 'active') {
    todoList = props.todoList
      .filter(item => !item.completed)
      .map(item => (
        <li key={item.id}>
          <input type='checkbox' checked={item.completed} aria-label='toggle complete-status' className='complete-btn' onClick={()=>{props.toggleCompleted(item.id)}}></input>
          <span className={item.completed ? 'completed' : undefined}>{item.text}</span>
          <button className='delete-btn' onClick={(e)=>{props.deleteTodo(e, item.id)}}><img src={crossIcon} alt=""/></button>
        </li>
      ));
  } else if (selectedButton === 'completed') {
    todoList = props.todoList
      .filter(item => item.completed)
      .map(item => (
        <li key={item.id}>
          <input type='checkbox' checked={item.completed} aria-label='toggle complete-status' className='complete-btn' onClick={()=>{props.toggleCompleted(item.id)}}></input>
          <span className={item.completed ? 'completed' : undefined}>{item.text}</span>
          <button className='delete-btn' onClick={(e)=>{props.deleteTodo(e, item.id)}}><img src={crossIcon} alt=""/></button>
        </li>
      ));
  }

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
              <button onClick={()=>handleButtonClick('all')}>All</button>
              <button onClick={()=>handleButtonClick('active')}>Active</button>
              <button onClick={()=>handleButtonClick('completed')}>Completed</button>
            </div>
          )}
          <button className='clear-btn' onClick={()=>{props.clearCompleted()}}>Clear completed</button>
        </div>
      {!isLarge && (
          <div className='filter-small'>
            <button onClick={()=>handleButtonClick('all')}>All</button>
              <button onClick={()=>handleButtonClick('active')}>Active</button>
              <button onClick={()=>handleButtonClick('completed')}>Completed</button>
          </div>
        )}
    </div>
  )
}

export default List;
