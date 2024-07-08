import React from "react";
import InputField from "./InputField";
import Proptypes from "prop-types";
const handleTask = ({
  task = () => {},
  index = 0,
  handleTaskChange,
  handleTaskNameChange,
  handleSaveTask,
  handleEditTask = () => {},
  handleDeleteTask = () => {},
}) => {
  return (
    <>
      <div className="task">
        <input
          type="checkbox"
          className="task-check"
          checked={task.completed}
          onChange={() => handleTaskChange(index)}
        />
        {task.editing ? (
          <>
            <InputField
              type="text"
              className="edit-input"
              value={task.editedName}
              onChange={(e) => handleTaskNameChange(index, e.target.value)}
            />
            <button className="save" onClick={() => handleSaveTask(index)}>
              <i className="fa-solid fa-save"></i>
            </button>
          </>
        ) : (
          <>
            <span
              className={task.completed ? "taskname completed" : "taskname"}
            >
              {task.name}
            </span>
            <button className="edit" onClick={() => handleEditTask(index)}>
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
          </>
        )}
        <button className="delete" onClick={() => handleDeleteTask(index)}>
          <i className="fa-solid fa-square-minus"></i>
        </button>
      </div>
    </>
  );
};

const Task = React.memo(handleTask);
export default Task;

handleTask.propTypes = {
  task: Proptypes.object.isRequired,
  index: Proptypes.number,
  handleTaskChange: Proptypes.func,
  handleTaskNameChange: Proptypes.func,
  handleSaveTask: Proptypes.func,
  handleEditTask: Proptypes.func,
  handleDeleteTask: Proptypes.func,
};
