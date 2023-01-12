import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { taskCompleted, titleChanged, taskDeleted } from "./store/actions";
import { initiateStore } from "./store/store";

const store = initiateStore();

const App = (params) => {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState());
    });
  }, []);

  useEffect(() => {
    console.log("state", state);
  }, [state]);

  const completeTask = (taskId) => {
    store.dispatch(taskCompleted(taskId));
  };

  const changeTitle = (taskId) => {
    store.dispatch(titleChanged(taskId));
  };

  const deleteTask = (taskId) => {
    store.dispatch(taskDeleted(taskId));
  };

  return (
    <div>
      <h1>App</h1>
      <ul>
        {state.map((el) => (
          <div key={el.id}>
            <li key={el.id}>
              <p>{`${el.title} (Completed: ${el.completed})`}</p>
              <button id={el.id} onClick={() => changeTitle(el.id)}>
                Change title
              </button>
              <button id={el.id} onClick={() => completeTask(el.id)}>
                Complete task
              </button>
              <button id={el.id} onClick={() => deleteTask(el.id)}>
                Delete task
              </button>

              <hr />
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
