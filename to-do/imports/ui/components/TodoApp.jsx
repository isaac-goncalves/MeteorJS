import React, { useState, useEffect } from "react";
import styles from "./TodoApp.module.css";
import "./fonts.css";
import { Login } from "./Login";
import { Registro } from "./Registro";

export const TodoApp = () => {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState("");
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingText, setEditingText] = useState("");

    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);

    // Fetch tasks from the backend when the component mounts
    useEffect(() => {
        fetchTasks();
    }, []);

    useEffect(() => {
        // Get the user ID and token from localStorage
        const storedUserId = localStorage.getItem("userId");
        const storedToken = localStorage.getItem("token");

        // Set the state variables
        setUserId(storedUserId);
        setToken(storedToken);
    }, []);

    // Fetch tasks from the backend API
    const fetchTasks = () => {
        const userId = localStorage.getItem("userId");

        Meteor.call("api.tasks.fetch", userId, (error, result) => {
            if (error) {
                console.error("Error fetching tasks:", error);
            } else {
                console.log("result", result);
                setTasks(result);
            }
        });
    };

    // Create a new task and send it to the backend API
    const addTask = () => {
        if (input.trim().length > 0) {
            const userId = localStorage.getItem("userId"); // get userId from localStorage

            Meteor.call("api.tasks.create", userId, input, (error, result) => {
                if (error) {
                    console.error("Error adding task:", error);
                } else {
                    console.log("result", result);
                    setTasks([...tasks, result]);
                    setInput("");
                }
            });
        }
    };

    // Edit a task and update it on the backend API
    const editTask = (taskId, newText) => {
        const userId = localStorage.getItem("userId");

        Meteor.call("api.tasks.edit", userId, taskId, newText, (error) => {
            if (error) {
                console.error("Error editing task:", error);
            } else {
                const updatedTasks = tasks.map((task) => {
                    if (task._id === taskId) {
                        return { ...task, text: newText };
                    }
                    return task;
                });
                setTasks(updatedTasks);
                setEditingTaskId(null);
                setEditingText("");
            }
        });
    };

    // Delete a task from the backend API
    const removeTask = (taskId) => {
        const userId = localStorage.getItem("userId");

        Meteor.call("api.tasks.remove", userId, taskId, (error) => {
            if (error) {
                console.error("Error deleting task:", error);
            } else {
                setTasks(tasks.filter((task) => task._id !== taskId));
            }
        });
    };

    const handleInput = (event) => {
        setInput(event.target.value);
    };

    const startEditing = (taskId, taskText) => {
        setEditingTaskId(taskId);
        setEditingText(taskText);
    };

    const cancelEditing = () => {
        setEditingTaskId(null);
        setEditingText("");
    };

    const saveEditing = (taskId) => {
        editTask(taskId, editingText);
    };

    return (
        <div className={styles.mainContainer} >
        <Login />
        <Registro />
            <div className={styles.container}>
                <h1 className={styles.mainHeader}>To-do List</h1>
                <h1 className={styles.mainHeader}>Bem Vindo, {userId}</h1>
                <div className={styles.inputWrapper}>
                    <input
                        type="text"
                        value={input}
                        onChange={handleInput}
                        className={styles.input}
                        placeholder="Adicionar novo item a lista"
                    />
                    <button onClick={addTask} className={styles.insertButton}>
                        Add Task
                    </button>
                </div>
                <ul className={styles.list}>
                    {tasks.map((task) => (
                        <li className={styles.todoWrapper} key={task.id}>
                            {editingTaskId === task._id ? (
                                <input
                                    type="text"
                                    value={editingText}
                                    onChange={(e) =>
                                        setEditingText(e.target.value)
                                    }
                                />
                            ) : (
                                <p className={styles.listText}>{task.text}</p>
                            )}
                            <div>
                                {editingTaskId === task._id ? (
                                    <div>
                                        <button
                                            onClick={() =>
                                                saveEditing(task._id)
                                            }
                                        >
                                            Save
                                        </button>
                                        <button onClick={cancelEditing}>
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <button
                                            className={styles.insertButton}
                                            onClick={() =>
                                                startEditing(
                                                    task._id,
                                                    task.text
                                                )
                                            }
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className={styles.insertButton}
                                            onClick={() => removeTask(task._id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
