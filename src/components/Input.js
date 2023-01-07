import React from 'react';
import { nanoid } from 'nanoid';

const Input = (props) => {
  const [input, setInput] = React.useState('');

  const handleSubmit =(e)=>{
    e.preventDefault();
    setInput('');

    props.onSubmit(
      {
        id: nanoid(),
        text: input,
        completed: false
      }
    )
  }

  const handleChange =(e)=>{
    setInput(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit} className={props.darkMode ? "form dark" : "form"}>
      <button
        type='submit'
        aria-label='add todo'
        className='add-btn'>
      </button>
      <input
        type="text" placeholder="Create a new todo..."
        name='text'
        value={input}
        onChange={handleChange}
        autoFocus
        className='form__input'/>
    </form>
  )
}

export default Input;