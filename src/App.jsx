import { useState } from "react";

import "./App.css";
import {
  useAddTasksMutation,
  useDeleteTaskMutation,
  useGetTasksQuery,
  useUpdateStatusMutation,
} from "./features/tasks/tasksSlice";
import TaskList from "./TaskList";

function App() {
  const [taskItem, setTaskItem] = useState("");

  const { data: tasks, isError, isLoading } = useGetTasksQuery();
  const [addTasks] = useAddTasksMutation();
  const [deleteTask, { isLoading: isDeletePending }] = useDeleteTaskMutation();
  const [updateStatus] = useUpdateStatusMutation();

  async function handleAddTask() {
    try {
      await addTasks({
        title: taskItem,
        //status enum:["todo","doing","done"]
        status: "todo",
      }).unwrap();
      // alert("Task added");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteTask(id) {
    try {
      await deleteTask(id).unwrap();
      // add anything like informing
    } catch (error) {
      console.log(error);
    }
  }
  async function handleUpdateStatus(id, status) {
    try {
      await updateStatus({ id, status: status }).unwrap();
      // add anything like informing
    } catch (error) {
      console.log(error);
    }
  }

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>Error occured</h2>;
  }
  return (
    <>
      <div>
        <h2>Task List</h2>
        <div>
          <input
            value={taskItem}
            onChange={(ev) => setTaskItem(ev.target.value)}
            type="text"
          />
          <button onClick={handleAddTask}>Add</button>
        </div>
        {tasks && (
          <TaskList
            tasks={tasks}
            handleDeleteTask={handleDeleteTask}
            handleUpdateStatus={handleUpdateStatus}
            isDeletePending={isDeletePending}
          />
        )}
      </div>
    </>
  );
}

export default App;

