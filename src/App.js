import React, { useCallback, useState } from "react";
import "./App.css";
import List from "./components/List";
import Form from "./components/form";

const initialTodoData = localStorage.getItem("todoData")
  ? JSON.parse(localStorage.getItem("todoData"))
  : [];

export default function App() {
  const [todoData, setTodoData] = useState(initialTodoData);
  const [value, setValue] = useState("");

  const handleClick = useCallback(
    (id) => {
      let newTodoData = todoData.filter((data) => data.id !== id);
      // this.setState({ todoData: newTodoData });
      setTodoData(newTodoData);
      localStorage.setItem("todoData", JSON.stringify(newTodoData));
    },
    [todoData]
  );

  const handleRemoveClick = () => {
    setTodoData([]);
    localStorage.setItem("todoData", JSON.stringify([]));
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // 페이지 리로드 방지

    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };

    // this.setState({ todoData: [...todoData, newTodo] });
    setTodoData((prev) => [...prev, newTodo]);
    localStorage.setItem("todoData", JSON.stringify([...todoData, newTodo]));

    setValue("");
  }; // Setter에서 이전 State를 가지고 오기 위해서 prev 사용

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow-sm lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>할 일 목록</h1>
          <button onClick={handleRemoveClick}>Delete All</button>
        </div>
        <List
          handleClick={handleClick}
          todoData={todoData}
          setTodoData={setTodoData}
        />
        <Form value={value} setValue={setValue} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}
