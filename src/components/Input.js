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
        text: input
      }
    )
  }
  const handleChange =(e)=>{
    setInput(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type='submit'></button>
      <input type="text" placeholder="Create a new todo..." name='text' value={input} onChange={handleChange} autoFocus/>
    </form>
  )
}

export default Input;