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
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    fetch('http://localhost:8080/api/todos')
      .then(response => response.json())
      .then(data => {
        setTodos(data);
        setIsLoading(false); // データ取得が完了したらisLoadingをfalseにする
      })
      .catch(error => {
        console.error('Error loading todos:', error);
        setIsLoading(false); // エラーの場合もisLoadingをfalseにする
      });
  }, []);


  const updateTodos = (newTodos) => {
    // JSONファイルにtodosを保存
    console.log(newTodos);
    fetch('http://localhost:8080/api/todos', {
      method: 'PUT',
      body: JSON.stringify(newTodos),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then( () => {
      // 新しいToDoをリストに追加
      setTodos(newTodos);
      console.log('Todos updated successfully');
    })
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
    const newTodo = {
      id: Date.now(),
      title: title,
      isCompleted: false,
    };
    console.log(newTodo);
    fetch('http://localhost:8080/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    })
    .then(response => {
      console.log("response", response);
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

  /*
  const todoItems = todos.map((todo) => {
    return (
      <Todo
        key={todo.id}
        todo={todo}
        onDeleteClick={handleTodoDeleteClick}
        onCheckboxChange={handleTodoCheckboxChange}
      />
    );
  });*/
{console.log(`todos`,todos)}
  return (

    <div>
      <Navbar />
      <Header />
      <h1>
        My TODOs
        <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent roundeds' 
        onClick={handlePurgeClick}>Purge</button>
      </h1>
      {isLoading ? ( // データ取得中の場合
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
      <ContactForm />
      <Calendar />
      CONTACT FORM
      <ContactForm/>
    </div>
  );
};

export default App;