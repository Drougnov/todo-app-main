import React from "react";
import Header from './components/Header';
import Input from './components/Input';

function App() {

  const [darkMode, setDarkMode] = React.useState(true);
  
  const toggleDarkMode =()=>{
    setDarkMode(prevMode => !prevMode);
  }

  return (
    <div>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
      <main>
        <Input />
      </main>
    </div>
  );
}

export default App;
