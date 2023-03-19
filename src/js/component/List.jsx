import React, {useState} from "react";

const List = () => {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState ([]);
	 
	return (
		<div className="container">
			<h1>To-Do List</h1>
			<ul>
				<li>
					<input 
					type="text" 
					onChange={(e) => setInputValue(e.target.value)}
					value={inputValue}
					onKeyDown={(e) => e.key === "Enter" ? setTodos(todos.concat(inputValue)) (setInputValue("")) : null}								
					placeholder="Add a task"></input>
					</li>
					{todos.map((item, index) => (
						<li>
							 {item}{""} 
							 <i className="fas fa-trash"  onClick={() => 
								setTodos(todos.filter((t, currentIndex) =>	index != currentIndex))
								}></i>
								</li>
					))}
							
			</ul>
			<div><p>{todos.length} Jobs to do</p></div>
		</div>
	);
};

export default List;
