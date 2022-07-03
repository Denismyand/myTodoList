import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { initialTodos } from "./data.js";
import { useState, useEffect } from "react";
import ListOfTodos from "./List.js";

export default function TodoList() {
  let cached = JSON.parse(localStorage.getItem("stored"));
  const [list, setList] = useState(readCached());
  const [taskName, setTaskName] = useState("");
  const [filterDone, setFilterDone] = useState(false);
  const [filterUndone, setFilterUndone] = useState(false);

  function readCached() {
    if (cached) {
      return cached;
    } else return initialTodos;
  }

  useEffect(() => {
    localStorage.setItem("stored", JSON.stringify(list));
  }, [list]);

  let done = list.filter((task) => task.done === true);
  let undone = list.filter((task) => task.done === false);

  function handleToggleDone() {
    setFilterDone(!filterDone);
  }

  function handleToggleUndone() {
    setFilterUndone(!filterUndone);
  }

  function chooseMode() {
    if (filterDone) {
      return done;
    } else if (filterUndone) {
      return undone;
    }
    return list;
  }

  function handleAddClick() {
    setTaskName("");
    setList([...list, { id: uuidv4(), task: taskName, done: false }]);
  }

  function handleToggle(todoId, value) {
    setList(
      list.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, done: value };
        } else {
          return todo;
        }
      })
    );
  }

  function handleDeleteClick(todoId) {
    setList(list.filter((t) => t.id !== todoId));
  }

  function handleEdit(todoId, todoTask) {
    setList(
      list.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, task: todoTask };
        } else return todo;
      })
    );
  }

  return (
    <div className="TodoList">
      <h1>Todo List</h1>
      <div className="ListContent">
        <ViewModes
          filterDone={filterDone}
          filterUndone={filterUndone}
          handleToggleDone={handleToggleDone}
          handleToggleUndone={handleToggleUndone}
        ></ViewModes>
        <Input
          className="Input"
          taskName={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          onAdd={handleAddClick}
        ></Input>
        <ListOfTodos
          list={list}
          onToggle={handleToggle}
          onDelete={handleDeleteClick}
          onEdit={handleEdit}
          chooseMode={chooseMode}
        ></ListOfTodos>
      </div>
    </div>
  );
}

function ViewModes({
  filterDone,
  filterUndone,
  handleToggleDone,
  handleToggleUndone,
}) {
  return (
    <>
      <input
        type="checkbox"
        checked={filterDone}
        onChange={handleToggleDone}
        disabled={filterUndone}
      />
      View only done todos
      <br></br>
      <input
        type="checkbox"
        checked={filterUndone}
        onChange={handleToggleUndone}
        disabled={filterDone}
      />
      View only undone todos
      <br></br>
    </>
  );
}

function Input({ taskName, onChange, onAdd, className }) {
  return (
    <div className={className}>
      <input className="InputAdd" value={taskName} onChange={onChange}></input>
      <button type="button" onClick={onAdd}>
        Add todo
      </button>
    </div>
  );
}
