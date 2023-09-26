import React, { useState, useEffect } from "react";
import List from "./list"


//create your first component
const Home = () => {

  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([])
  const url = "https://playground.4geeks.com/apis/fake/todos/user/fraanuni"

  //Llamada a la API solo cuando se carga la pagina.
  useEffect(() => {
    fetch(url).then(resp => resp.json()).then(data => setTasks(data)).catch(err => console.log("err", err))
  }, []);

  //Llamo a la API cada vez que se modifica mi lista de tareas
  useEffect(() => {
    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tasks)
    },).then(resp => resp.json()).then(data => data).catch(err => console.log("ERR", err))
  }, [tasks]);


  const enterInput = (event) => {
    if (event.key === "Enter" && inputValue) {
      setTasks([...tasks, inputValue])
      setInputValue("")
    };
  };

  const deleteTask = (event) => {
    let index = parseInt(event.target.getAttribute("data-remove-id"));
    if (!isNaN(index)) {
      const updatedTasks = [...tasks]; 
      updatedTasks.splice(index, 1); 
      setTasks(updatedTasks); 
    }

  };

  return (
    <div className="cont container-fluid vh-100 d-flex justify-content-center">
      <div className="containerTodo bg-white m-auto p-5">
        <h1>List tasks</h1>
        <input type="text" placeholder="Add new tasks..." onKeyDown={enterInput} onChange={(event) => setInputValue(event.target.value)} value={inputValue} />
        <ul className="todolist my-3">
          {tasks.map((element, index) => {
            return <List key={index} text={element} deleteTask={deleteTask} itemIndex={index} />
          })}
        </ul>
        <div className="footer">
          <div>{tasks.length} items left.</div>
          <button className="">Delete all list</button>
        </div>
      </div>
    </div>
  )
};

export default Home;
