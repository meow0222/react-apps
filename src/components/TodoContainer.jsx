import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import AddForm from './AddForm';


const TodoContainer = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/todos')
      .then(response => response.json())
      .then(data => {
        setTodos(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading todos:', error);
        setIsLoading(false);
      });
  }, []);

  const updateTodos = (newTodos) => {
    fetch('http://localhost:8080/api/todos', {
      method: 'PUT',
      body: JSON.stringify(newTodos),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        setTodos(newTodos);
        console.log('Todos updated successfully');
      })
      .catch(error => console.error('Error updating todos:', error));
  };

  const handlePurgeClick = () => {
    if (!window.confirm('Sure?')) {
      return;
    }
    const newTodos = todos.filter(todo => !todo.isCompleted);
    updateTodos(newTodos);
  };

  const handleAddFormSubmit = (title) => {
    const newTodo = {
      id: Date.now(),
      title: title,
      isCompleted: false,
    };
    fetch('http://localhost:8080/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error adding todo:', error);
      });
  };

  const handleTodoCheckboxChange = (id) => {
    const newTodos = todos.map(todo => ({
      id: todo.id,
      title: todo.title,
      isCompleted: todo.id === id ? !todo.isCompleted : todo.isCompleted,
    }));
    updateTodos(newTodos);
  };

  const handleTodoDeleteClick = (id) => {
    if (!window.confirm('Sure?')) {
      return;
    }
    const newTodos = todos.filter(todo => todo.id !== id);
    updateTodos(newTodos);
  };

  return (
    <div>
      <h1 className='my-12'>
        My TODOs
        <button
          className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
          onClick={handlePurgeClick}
        >
          Purge
        </button>
      </h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {todos.map(todo => (
            <Todo
              key={todo.id}
              todo={todo}
              onDeleteClick={handleTodoDeleteClick}
              onCheckboxChange={handleTodoCheckboxChange}
            />
          ))}
        </ul>
      )}
      <AddForm onSubmit={handleAddFormSubmit} />
    </div>
  );
};

export default TodoContainer;
