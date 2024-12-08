export default function TaskList(props) {
  const { tasks, handleDeleteTask, handleUpdateStatus, isDeletePending } =
    props;

  function returnColor(yourCase) {
    switch (yourCase) {
      case "todo":
        return "bg-secondary";
      case "doing":
        return "bg-primary";
      case "done":
        return "bg-warning";
      default:
        return "bg-white"; // Fallback in case of an undefined status
    }
  }
  return (
    <div>
      {tasks.map((task) => {
        return (
          <div
            key={task._id}
            className={`card ${returnColor(task?.status)} my-2 p-2`}
            style={{ width: "300px" }}
          >
            <h4>{task?.title}</h4>
            <div className="d-flex gap-1">
              <div className="dropdown">
                <button
                  className={`btn btn-secondary  dropdown-toggle`}
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {task.status}
                </button>
                <ul className="dropdown-menu">
                  <li
                    onClick={() => handleUpdateStatus(task._id, "todo")}
                    className="dropdown-item cursor-pointer"
                  >
                    todo
                  </li>
                  <li
                    onClick={() => handleUpdateStatus(task._id, "doing")}
                    className="dropdown-item cursor-pointer"
                  >
                    doing
                  </li>
                  <li
                    onClick={() => handleUpdateStatus(task._id, "done")}
                    className="dropdown-item cursor-pointer"
                  >
                    done
                  </li>
                </ul>
              </div>
              <button
                disabled={isDeletePending}
                onClick={() => handleDeleteTask(task._id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
