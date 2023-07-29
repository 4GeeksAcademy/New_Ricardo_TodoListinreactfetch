import React, { useEffect, useState } from "react";
const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [formValue, setFormValue] = useState("");
  const apiUrl = "https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/ricardochong"
  // useEffect(() => {
  //   fetch("https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/ricardochong")
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setTodos(data);
  //     });
  // },[]);
  // useEffect(() => {
  //   fetch("https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/ricardochong", {
  //     method: "PUT",
  //     body: JSON.stringify(todos),
  //     headers: { "Content-type": "application/json" },
  //   })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((res) => console.log(res))
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // },[todos]);
  const updateFetch = (newTodo) => {
    fetch(apiUrl, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo),
    })
    .then((resp) => resp.json())
    .catch((error) => console.log(error));
    };
  const getSampleTask = () => {
    fetch(apiUrl)
      .then((response)=> response.json()) 
      .then((newTodo)=> setTodos(newTodo)) 
      .catch((error)=> console.log(error))
  }
//   const addTodo = (e) => {
//     setFormValue(e.target.value);
//     // setTodos([...todos, formValue]);
// };
    const inputChange = (e) => {
      e.preventDefault();
      if(e.key=== "Enter" && formValue !=="") 
      {
        const newTodo= todos.concat([{ label: formValue, done: false }]);
        setTodos(newTodo);
        updateFetch(newTodo);
        setFormValue("")
      }
    };
    const removeTodo = (index) => {
      let newTodo= todos.filter((item, i) => index !== i);
      setTodos(newTodo);
      updateFetch(newTodo)
    };
    const clearAll= () => {
      let newList= () => [{ label: "sampleTask", done: false }]
      setTodos(newList);
      updateFetch(newList);
    }
    useEffect(()=>{
      getSampleTask();
    },[]);
    return (
      <div>
        <div className="form-container">
          <input value={formValue} onChange={(e)=>setFormValue(e.target.value)} type="text" 
          onKeyUp={(e)=>inputChange(e)}/>
        </div>
        <h2>Todos</h2>
        {todos.length
          ? todos.map((item, index) => {
              return (
                <h6 key={index}>
                  {item.label}
                  <button onClick={() => removeTodo(index)}>X</button>
                  <button onClick={() => clearAll()}> clearAll </button>
              </h6>
              
              );
            })
          : null}
      </div>
    );
};
export default Todo;