import React, { useEffect, useState } from 'react'
import db from "../config/firebase.js"
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import "./todo.css"

function Todo() {

  const [inputValue, setInputValue] = useState("");
  const [todo, setTodo] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(async () => {
    const dbRef = collection(db, "todos");
    const getData = await getDocs(dbRef);
    let getTodo = [];
    getData.forEach((doc) => {

      getTodo.push({ key: doc.id, todo: doc.data().todo });
    });
    setTodo(getTodo);
    // console.log("getTodo", getTodo);
  }, [refresh]);

  const addTodo = async () => {
    const dbRef = collection(db, "todos");

    try {
      const addData = await addDoc(dbRef, {
        todo: inputValue,
      });

      setInputValue("");
    } catch (error) {
      console.log(error);
    }
  };

  const editTodo = async (key) => {
    const editValue = prompt("enter value");
    const dbRef = doc(db, "todos", key);
    const updateData = await updateDoc(dbRef, {
      todo: editValue,
    });
    setRefresh(!refresh);
  };

  const deleteTodo = async (key) => {
    const dbRef = doc(db, "todos", key);
    const delTodo = await deleteDoc(dbRef);
    setRefresh(!refresh);
  };

  const deleteAllData = () => {
    todo.forEach(val => {
      // console.log(val.key)
      deleteTodo(val.key)
    
     })
  }

  return (
   
    <div className='main-cont container-fluid pt-4'>
      <div className='heading pt-4'>
        <h1 className='h1'>React Todo App</h1>
      </div>
      <div className="mt-4 container-fluid inp-cont">
        <input
          value={inputValue}
          type="text"
          placeholder="Enter Todo"
          className="input-group form-control"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="btn-div">
          <button className="btn mx-1 my-btn" onClick={addTodo}>
          <i className="fas fa-plus"></i>
          </button>
          <button className="btn my-btn" onClick={deleteAllData}><i className="fas fa-trash-alt"></i></button>
        </div>
      </div>

      <div className="text-cont">
        <ul className='my-ul m-auto'>
          {todo.map((val, ind) => {
            return (
              <div className='list-box' key={ind}>
                <li className='list'> {val.todo} </li>
                <button className='btn mx-1 my-btn' onClick={() => editTodo(val.key)}> <i className='far fa-edit'></i> </button>
                <button className='btn my-btn' onClick={() => deleteTodo(val.key)}> <i className='fas fa-trash'></i> </button>
              </div>
            );
          })}
        </ul>
      </div>
    </div>

  )
}

export default Todo
