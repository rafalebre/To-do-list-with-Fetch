import React, { useState, useEffect } from "react";
import "./List.css";

const List = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/rafalebre", {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Error");
        }
      })
      .catch(error => {
        console.error("There was a problem creating the list:", error);
      });

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

  const handleMouseEnter = index => {
    const listItems = document.querySelectorAll(".list-item");
    listItems[index].classList.add("hovered");
  };

  const handleMouseLeave = index => {
    const listItems = document.querySelectorAll(".list-item");
    listItems[index].classList.remove("hovered");
  };

  const handleClearAll = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/rafalebre", {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setTodos([]);
      })
      .catch(error => console.error(error));
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
          <li
            key={index}
            className="list-item"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            {todo.label}{" "}
            {index !== -1 && (
              <i
                className="fas fa-trash"
                onClick={() => handleDelete(index)}
              ></i>
            )}
          </li>
        ))}
      </ul>
      <div>
        <p>
          {!todos.length ? (
            <h5>No tasks, add a task</h5>
          ) : (
            todos.length + " jobs to do"
          )}
        </p>
        <button className="clear-all-btn" onClick={handleClearAll}>
          Clear all tasks
        </button>
      </div>
    </div>
  );
};

export default List;