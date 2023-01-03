import React from "react";
import Header from './components/Header';
import Input from './components/Input';
import List from './components/List';

function App() {

  const [darkMode, setDarkMode] = React.useState(true);
  const [todoList, setTodoList] = React.useState([]);
  
  const toggleDarkMode =()=>{
    setDarkMode(prevMode => !prevMode);
  }

  const addTodo = (todo) =>{
    if(!todo.text || /^\s*$/.test(todo.text)){ //check if the current todo is empty or only white space
      return;
    }
    todo = todo["text"].replace(/\s+/g, ' ');  //trim extra spaces
    setTodoList([todo, ...todoList]);
  }

  return (
    <div className={darkMode ? 'container dark' : 'container'}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
      <main>
        <Input darkMode={darkMode} onSubmit={addTodo} />
        <List darkMode={darkMode} todoList={todoList} />
      </main>
    </div>
  );
}

export default App;
