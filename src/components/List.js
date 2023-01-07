import React from 'react';
import { useMedia } from 'react-use';
import ListItem from './ListItem';

const List = (props) => {
  const isLarge = useMedia('(min-width: 750px)');

  const [selectedButton, setSelectedButton] = React.useState('all');

  const handleButtonClick = button =>{
    setSelectedButton(button);
  }

  const updateCompleted = (id, completed) => {
    props.toggleCompleted(id, completed);
  }


  let todoList = props.todoList.map(item =>(
    <ListItem key={item.id} item={item} toggleCompleted={updateCompleted} deleteTodo={props.deleteTodo} completed={item.completed} />
  ))

  if (selectedButton === 'all') {
    todoList = props.todoList.map(item => (
      <ListItem key={item.id} item={item} toggleCompleted={updateCompleted} deleteTodo={props.deleteTodo} completed={item.completed} />
    ));
  } else if (selectedButton === 'active') {
    todoList = props.todoList
      .filter(item => !item.completed)
      .map(item => (
        <ListItem key={item.id} item={item} toggleCompleted={updateCompleted} deleteTodo={props.deleteTodo} completed={item.completed} />
      ));
  } else if (selectedButton === 'completed') {
    todoList = props.todoList
      .filter(item => item.completed)
      .map(item => (
        <ListItem key={item.id} item={item} toggleCompleted={updateCompleted} deleteTodo={props.deleteTodo} completed={item.completed} />
      ));
  }

  return (
    <div className={props.darkMode ? 'list-container dark':'list-container'}>
      <ul>
        {props.todoList.length === 0 && <li className='no-todo'>All caught up!</li>}
        {todoList}
      </ul>
      <div className='status'>
          <span>{props.todoList.filter(todo => !todo.completed).length} items left</span>
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
