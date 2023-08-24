import React, { useState, useRef } from 'react';

const AddForm = (props) => {
    const [title, setTitle] = React.useState('');
    const inputRef = React.useRef(null);
  
    const handleTextChange = (e) => {
      setTitle(e.currentTarget.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      props.onSubmit(title);
      setTitle('');
      inputRef.current.focus();
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={handleTextChange}
          ref={inputRef}
          className=''
        />
        <button type='submit' className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded p-'>Add</button>
        
      </form>
    );
  };
  
export default AddForm;
  