import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, toggleTask, deleteTask } from "./Redux/Action";
export default function TodoList() {
  const [showFormTask, setShowFormTask] = useState(false);
  const [showAddNote, setShowAddNote] = useState(false);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const [titleTask, setTitleTask] = useState("");
  const [someNote, setSomeNote] = useState("");
  const tasks = useSelector((state) => state.tasks.TaskList);
  const dispatch = useDispatch();
  function handleAddTaskForm() {
    const handleSave = () => {
      const task = { title: titleTask, someNote: someNote };
      dispatch(addTask(task));
      setShowFormTask(false);
    };
    return (
      <div className="sectionFormTask">
        <input
          type="text"
          placeholder="What are you working on?"
          onChange={(e) => setTitleTask(e.target.value)}
          className="inputTask"
        />
        <br />
        <div className="divOfAddNote">
          <button
            className="btnAddNote"
            onClick={() => setShowAddNote(!showAddNote)}
          >
            <i className="bx bx-plus"></i> Add Note
          </button>
        </div>
        <br />
        {showAddNote ? (
          <textarea
            className="inputAddNotes"
            type="text"
            placeholder="Some notes..."
            onChange={(e) => setSomeNote(e.target.value)}
          ></textarea>
        ) : null}
        <div className="divOfConfig">
          <button
            className="btnCancel"
            type="button"
            onClick={() => setShowFormTask(false)}
          >
            Cancel
          </button>
          <button className="btnSave" type="button" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    );
  }
  function handleCheckboxChange(index) {
    dispatch(toggleTask(index));
  }
  function handleDeleteTask(index) {
    dispatch(deleteTask(index));
  }
  function ShowListTask() {
    return (
      <div className="ulTasks">
        {tasks.map((task, index) => (
          <div key={index} className="liTask">
            <li className="optionTask">
              <div className="lineTaskevenly">
                <input
                  className="checkBoxTask"
                  type="checkbox"
                  checked={task.checked || false}
                  onChange={() => handleCheckboxChange(index)}
                />
                <span
                  title="Show Notes"
                  className="titleTask"
                  style={{
                    textDecoration: task.checked ? "line-through" : "none",
                  }}
                  onClick={() => setSelectedTaskIndex(index)}
                >
                  {task.title}
                </span>
              </div>
              <button
                className="deleteTask"
                title="Delete Task"
                onClick={() =>
                  window.confirm("Delete Tasks ?")
                    ? handleDeleteTask(index)
                    : null
                }
              >
                <i className="bx bxs-message-square-x"></i>
              </button>
            </li>
            {selectedTaskIndex === index && (
              <li className="SomeNotes">{task.someNote}</li>
            )}
          </div>
        ))}
      </div>
    );
  }
  return (
    <Fragment>
      <center>
        <div className="todoList">
          {ShowListTask()}
          {showFormTask ? handleAddTaskForm() : null}
          <button
            className="btnAddTask"
            onClick={() => setShowFormTask(!showFormTask)}
          >
            <i className="bx bx-plus-circle"></i> Add Task
          </button>
        </div>
      </center>
    </Fragment>
  );
}
