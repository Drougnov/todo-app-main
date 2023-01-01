import React from "react";
import Header from './components/Header';

function App() {

  const [darkMode, setDarkMode] = React.useState(true);
  
  const toggleDarkMode =()=>{
    setDarkMode(prevMode => !prevMode);
  }

  return (
    <div>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
    </div>
  );
}

export default App;
