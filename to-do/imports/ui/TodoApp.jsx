import React, { useState, useEffect } from 'react';

import styles from './TodoApp.module.css';
import './fonts.css';

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
    <div className = {styles.mainContainer}>
      <div className = {styles.container}>
        <h1 className= {styles.mainHeader}>To-do List</h1>
      <div className = {styles.inputWrapper}>
        <input
          type="text"
          value={input}
          onChange={handleInput}
          className={styles.input}
          placeholder="Adicionar novo item a lista"
        />
        <button onClick={addTask} className={styles.insertButton}>Add Task</button>
        </div>
          <ul className={styles.list}>
            {tasks.map(task => (
              <li className={styles.todoWrapper} key={task.id}>
                <p className={styles.listText}>{task.text}</p>
                <button onClick={() => removeTask(task.id)} className={styles.deleteButton}>Remove</button>
              </li>
            ))}
          </ul>
    </div>
  </div>
  );
};