import React, { useState, useEffect } from "react";

const List = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/rafalebre", {
      method: "PUT",
      body: JSON.stringify(todos),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }, [todos]);

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      const newTodo = { label: inputValue, done: false };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const handleDelete = index => {
    const newTodos = todos.filter((todo, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <ul>
        <li>
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a task"
          />
        </li>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo.label}{" "}
            <i className="fas fa-trash" onClick={() => handleDelete(index)}></i>
          </li>
        ))}
      </ul>
      <div>
        <p>{todos.length} Jobs to do</p>
      </div>
    </div>
  );
};

export default List;