import React, { useState, useEffect } from 'react';

import styles from './TodoApp.module.css';

export const TodoApp = () => {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
  const [input, setInput] = useState('');

  // update local storage when tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim().length > 0) {
      setTasks([...tasks, { id: Date.now(), text: input }]);
      setInput('');
    }
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  return (
    <div className={styles.container}>
    <h1>Todo List</h1>
    <input
      type="text"
      value={input}
      onChange={handleInput}
      className={styles.input}
      placeholder="New task..."
    />
    <button onClick={addTask} className={styles.button}>Add Task</button>
    <ul className={styles.list}>
      {tasks.map(task => (
        <li key={task.id}>
          {task.text}
          <button onClick={() => removeTask(task.id)} className={styles.button}>Remove</button>
        </li>
      ))}
    </ul>
  </div>
  );
};