import React, { useState, useCallback, lazy } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../assets/css/todo.style.css";
import Baselayout from "../components/layout/Baselayout";
import Button from "../components/Button";
import InputField from "../components/InputField";
const Task = lazy(() => import("../components/Task"));
function HandleTodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [taskCount, setTaskCount] = useState(0);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const addTask = useCallback(() => {
    const taskName = newTask.trim();
    if (!taskName) {
      setError(true);
      console.log("Error: Task name cannot be empty");
      return;
    }
    setError(false);
    const updatedTasks = [
      ...tasks,
      {
        name: taskName,
        completed: false,
        editing: false,
        editedName: taskName,
      },
    ];
    setTasks(updatedTasks);
    setTaskCount(taskCount + 1);
    setNewTask("");
    console.log("Task added:", taskName);
    console.log("Updated tasks:", updatedTasks);
  }, [newTask, tasks, taskCount]);

  const handleTaskChange = useCallback(
    (index) => {
      const updatedTasks = [...tasks];
      updatedTasks[index].completed = !updatedTasks[index].completed;
      setTasks(updatedTasks);
      setTaskCount(taskCount + (updatedTasks[index].completed ? -1 : 1));
      console.log("Task status changed:", updatedTasks[index]);
      console.log("Updated tasks:", updatedTasks);
    },
    [tasks, taskCount]
  );

  const handleDeleteTask = useCallback(
    (index) => {
      const taskToDelete = tasks[index];
      const updatedTasks = tasks.filter((_, i) => i !== index);
      if (!taskToDelete.completed) {
        setTaskCount(taskCount - 1);
      }
      setTasks(updatedTasks);
      console.log("Task deleted:", taskToDelete);
      console.log("Updated tasks:", updatedTasks);
    },
    [tasks, taskCount]
  );

  const handleEditTask = useCallback(
    (index) => {
      const updatedTasks = [...tasks];
      updatedTasks[index].editing = true;
      setTasks(updatedTasks);
      console.log("Task editing:", updatedTasks[index]);
      console.log("Updated tasks:", updatedTasks);
    },
    [tasks]
  );

  const handleSaveTask = useCallback(
    (index) => {
      const updatedTasks = [...tasks];
      const editedName = updatedTasks[index].editedName.trim();
      if (!editedName) {
        setError(true);
        console.log("Error: Task name cannot be empty");
        return;
      }
      setError(false);
      updatedTasks[index].name = editedName;
      updatedTasks[index].editing = false;
      setTasks(updatedTasks);
      console.log("Task saved:", updatedTasks[index]);
      console.log("Updated tasks:", updatedTasks);
    },
    [tasks]
  );

  const handleTaskNameChange = useCallback(
    (index, newName) => {
      const updatedTasks = [...tasks];
      updatedTasks[index].editedName = newName;
      setTasks(updatedTasks);
    },
    [tasks]
  );

  const handleLogout = useCallback(() => {
    Cookies.remove("token");
    navigate("/login");
  }, [navigate]);


  const handleOnKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter") {
        addTask();
      }
    },
    [addTask]
  );

  return (
    <div className="App">
      <Baselayout showLogin handleLogout={handleLogout}>
        <div className="nav-box" />
        <div className="todobody">
          <div className="todo">
            <h1 style={{ color: "white" }}>To-do list</h1>
            <div className="container">
              <div id="wrapper">
                <div id="task-place">
                  <InputField
                    type="text"
                    placeholder="Write your task"
                    value={newTask}
                    onKeyDown={handleOnKeyDown}
                    onChange={(e) => setNewTask(e.target.value)}
                  />
                </div>
                <Button id="add-btn" onClick={addTask}>
                  Add
                </Button>
              </div>
              <div id="tasks">
                <p id="pending-tTasks">
                  <b>
                    <span className="count-value">{taskCount}</span> task need
                    to do
                  </b>
                </p>
                {tasks.map((task, index) => (
                  <Task
                    key={index}
                    task={task}
                    index={index}
                    handleTaskChange={handleTaskChange}
                    handleTaskNameChange={handleTaskNameChange}
                    handleSaveTask={handleSaveTask}
                    handleEditTask={handleEditTask}
                    handleDeleteTask={handleDeleteTask}
                  />
                ))}
              </div>
              {error && <p id="error">Can&apos;t leave the space empty</p>}
            </div>
          </div>
        </div>
      </Baselayout>
    </div>
  );
}
const TodoList = React.memo(HandleTodoList);
export default TodoList;
