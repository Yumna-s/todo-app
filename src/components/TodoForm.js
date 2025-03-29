import React, { useState } from "react";

export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value) {
      value && addTodo(value);
      setValue("");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={value}
        className="todo-input"
        placeholder="What is the task today?"
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="todo-btn">
        Add Task
      </button>
    </form>
  );
};
