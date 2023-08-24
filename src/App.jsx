import React, { useState, useEffect } from 'react';
import Todo from './components/Todo';
import AddForm from './components/AddForm';
import Container from './components/Container';
import ContactForm from './components/ContactForm';
import Calendar from './components/Calendar';
import Header from './components/Header';
import Navbar from './components/Navbar';

import './App.css';


const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // JSONファイルからtodosを読み込む
    fetch('todos.json')
      .then(response => response.json())
      .then(data => setTodos(data))
      .catch(error => console.error('Error loading todos:', error));
  }, []);

  const updateTodos = (newTodos) => {
    setTodos(newTodos);
    // JSONファイルにtodosを保存
    fetch('todos.json', {
      method: 'PUT',
      body: JSON.stringify(newTodos),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(() => console.log('Todos updated successfully'))
    .catch(error => console.error('Error updating todos:', error));
  };

  const handlePurgeClick = () => {
    if (!confirm('Sure?')) {
      return;
    }
    const newTodos = todos.filter((todo) => {
      return todo.isCompleted === false;
    });
    updateTodos(newTodos);
  };

  const handleAddFormSubmit = (title) => {
    const newTodos = [...todos];
    newTodos.push({
      id: Date.now(),
      title: title,
      isCompleted: false,
    });
    updateTodos(newTodos);
  };

  const handleTodoCheckboxChange = (id) => {
    const newTodos = todos.map((todo) => {
      return {
        id: todo.id,
        title: todo.title,
        isCompleted: todo.id === id ? !todo.isCompleted : todo.isCompleted,
      };
    });
    updateTodos(newTodos);
  };

  const handleTodoDeleteClick = (id) => {
    if (!confirm('Sure?')) {
      return;
    }
    const newTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    updateTodos(newTodos);
  };

  const todoItems = todos.map((todo) => {
    return (
      <Todo
        key={todo.id}
        todo={todo}
        onDeleteClick={handleTodoDeleteClick}
        onCheckboxChange={handleTodoCheckboxChange}
      />
    );
  });

  return (
    <div>
      <Navbar />
      <Header />
      <Container>
        <h1>
          My TODOs
          <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent roundeds' onClick={handlePurgeClick}>Purge</button>
        </h1>
        <ul id="todos">
          {todoItems}
        </ul>
        <AddForm
          onSubmit={handleAddFormSubmit}
        />
      </Container>
      <Calendar />
      CONTACT FORM
      <ContactForm/>
    </div>
  );
};

export default App;
