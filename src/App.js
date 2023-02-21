import React from "react";
import "./App.css";
import ReactDOM from "react-dom/client";

function App() {
  return <h1>Hello</h1>;
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {" "}
    <App />{" "}
  </React.StrictMode>
);
