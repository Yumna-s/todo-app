import React, { useState, useEffect } from "react";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./Todo";
import { EditTodoForm } from "./EditTodoForm";
uuidv4();

export const TodoWrapperLocalStorage = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);
  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  };
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };
  function editTask(task, id) {
    // Mistake 1: Forgot to spread existing todo properties
    // Mistake 2: Incorrectly toggled isEditing twice
    const updatedTodos = todos.map(function (todo) {
      if (todo.id === id) {
        return {
          task: task, // Overwrites other todo properties
          isEditing: !todo.isEditing, // First toggle
          isEditing: !todo.isEditing, // Second toggle (duplicate)
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
  }
};
