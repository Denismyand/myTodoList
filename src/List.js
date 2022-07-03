import { useState } from "react";

export default function ListOfTodos({
  onToggle,
  onDelete,
  onEdit,
  chooseMode,
}) {
  let filteredList = chooseMode();
  return (
    <ul>
      {filteredList.map((todo) => (
        <li key={todo.id}>
          {todo.done ? (
            <Task
              className="Done Todo"
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onChange={onEdit}
            ></Task>
          ) : (
            <Task
              className="Todo"
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onChange={onEdit}
            ></Task>
          )}
          <hr></hr>
        </li>
      ))}
    </ul>
  );
}

function Task({ todo, onToggle, onDelete, className, onChange }) {
  const [inEdit, setInEdit] = useState(false);
  let editableTask;

  function changeEditMode() {
    setInEdit(!inEdit);
  }

  inEdit
    ? (editableTask = (
        <>
          <input
            value={todo.task}
            onChange={(e) => onChange(todo.id, e.target.value)}
          />
          <button onClick={changeEditMode}>Save</button>
        </>
      ))
    : (editableTask = (
        <>
          <span className={className}>{todo.task}</span>
          <button onClick={changeEditMode}>Edit</button>
        </>
      ));

  return (
    <>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={(e) => {
          onToggle(todo.id, e.target.checked);
        }}
      ></input>
      {editableTask}
      <button type="button" onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </>
  );
}
