import "../app.css";
import useTodos from "../hooks/useTodos";
import { useState } from "preact/hooks";

export function Todoapp() {
  const { todos, create, deleteItem } = useTodos();
  const [todoItem, setTodoItem] = useState("");

  const todoObj = {
    id: Date.now(),
    title: todoItem,
  };
  function handleTodo() {
    create(todoObj);
    setTodoItem("");
  }
  function handleDelete(id) {
    deleteItem(id);
  }

  return (
    <>
      <div>
        <h2>RTK Query Example</h2>

        <div className="py-3">
          <input
            type="text"
            value={todoItem}
            onChange={(event) => setTodoItem(event.target.value)}
          />
          <button onClick={handleTodo}>Add Todo</button>
        </div>

        <div>
          {todos.length > 0 &&
            todos.map((todo) => (
              <li key={todo.id} className="mb-2">
                {todo.title} -{" "}
                <button onClick={() => handleDelete({ id: todo.id })}>
                  Delete {todo.id}
                </button>{" "}
              </li>
            ))}
        </div>
      </div>
    </>
  );
}
