import React from "react";
import Header from './components/Header';
import Input from './components/Input';
import List from './components/List';
import Footer from './components/Footer';

function App() {

  const [darkMode, setDarkMode] = React.useState(true);
  const [todoList, setTodoList] = React.useState(()=> JSON.parse(localStorage.getItem("todoList")) || []);

  React.useEffect(()=>{
    localStorage.setItem("todoList", JSON.stringify(todoList))
  },[todoList])

  const toggleDarkMode =()=>{
    setDarkMode(prevMode => !prevMode);
  }

  const addTodo = (todo) =>{
    if(!todo.text || /^\s*$/.test(todo.text)){ //check if the current todo is empty or only white space
      return;
    }
    todo["text"] = todo["text"].replace(/\s+/g, ' ');  //trim extra spaces
    setTodoList([...todoList, todo]);
  }

  const deleteTodo=(event, todoId)=>{
    event.stopPropagation();
    setTodoList(oldTodos => oldTodos.filter(todo => todo.id !== todoId))
  }

  const toggleCompleted=(todoId)=>{
    const updatedTodoList = todoList.map(todo => {
      if (todo.id === todoId) {
        return {...todo, completed: !todo.completed};
      }
      return todo;
    });
    setTodoList(updatedTodoList);
  }

  const clearCompleted=()=>{
    setTodoList(oldTodos => oldTodos.filter(todo => !todo.completed))
  }

  return (
    <div className={darkMode ? 'container dark' : 'container'}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
      <main>
        <Input darkMode={darkMode} onSubmit={addTodo} />
        <List darkMode={darkMode}
              todoList={todoList}
              deleteTodo={deleteTodo}
              toggleCompleted={toggleCompleted}
              clearCompleted={clearCompleted}/>
      </main>
      <Footer />
    </div>
  );
}

export default App;
