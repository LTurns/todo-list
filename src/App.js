import TodoList from './TodoList'
import Header from './Header'
import React, { useState, useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './App.css';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))

    if (storedTodos) setTodos(storedTodos)
  }, [])
  // keeping this parameter empty means it will only be called once on load

  // enables you to save in local storeage so you can keep data on page reload
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])
  // adding todos to this array parameter means this function will be re-called and save data everytime the todos change

  function toggleTodo(id) {
    const newTodos = [...todos]

    const todo = newTodos.find(todo => todo.id === id)

    todo.complete = !todo.complete
    
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value

    if (name === '') return

    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })

    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)

    setTodos(newTodos)
  }

  return (
    <div className="todo-list">
    <Header header={'My Todos'} />
    <TodoList todos={todos} toggleTodo={toggleTodo} />
    <input className="todo-input" ref={todoNameRef} type="text" />
    <br></br>
    <button onClick={handleAddTodo}>Add Todo</button>
    <button onClick={handleClearTodos}>Clear Complete</button>
    <div>{ todos.filter(todo => !todo.complete).length} left to do</div>
    </div>
  );
}

export default App;
