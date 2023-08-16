import React, { useState, useEffect } from 'react';
import './Container.css'; 

function Container() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [expandedTodoIndex, setExpandedTodoIndex] = useState(null);

useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);
  
  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos((prevTodos) => {
        const updatedTodos = [...prevTodos, newTodo];
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        return updatedTodos;
      });
      setNewTodo('');
    }
  };
  
  const handleRemoveTodo = (index) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.filter((_, i) => i !== index);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };
  
  const toggleAccordion = (index) => {
    setExpandedTodoIndex(expandedTodoIndex === index ? null : index);
  };
  
  return (
    <div className="todo-container">
      <div className="todo-content">
        <h1 className='headingtodo'>Todo App</h1>
        <div className="input-container">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter a new todo"
          />
          <button className="add-button" onClick={handleAddTodo}>
          <i class="fa-sharp fa-solid fa-plus fa-beat" style={{color: "#ffffff",}}></i> Add Todo
          </button>
        </div>
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={index} className="todo-item">
              <div className="accordion-header" onClick={() => toggleAccordion(index)}>
                {expandedTodoIndex === index ? <i class="fa-solid fa-angle-up fa-bounce fa-xl" style={{color: "#0561ff",}}></i> : <i class="fa-solid fa-angle-down fa-bounce fa-xl" style={{color: "#0561ff",}}></i>}{' '}
                {expandedTodoIndex === index ? todo : todo.substring(0, 20) + (todo.length > 20 ? '...' : '')}
                <span>&nbsp;&nbsp;</span>
                <button className="remove-button" onClick={() => handleRemoveTodo(index)}>
                <i class="fa-solid fa-minus fa-beat-fade" style={{color: "#ffffff",}}></i> Remove
                </button>
              </div>
              {expandedTodoIndex === index && (<div className="accordion-content">{todo}</div>)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Container;
