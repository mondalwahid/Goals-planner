import React, { useState } from "react";
import "./Style.css";

// getting local storage data

const getLocalData = () => {
  const listsGoals = localStorage.getItem("goalsList");
  if (listsGoals) {
    return JSON.parse(listsGoals);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const addItems = () => {
    if (!inputData) {
      alert("Please list your goal");
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };
  // delete item section
  const deleteItem = (index) => {
    const updatedItem = items.filter((currentElement) => {
      return currentElement.id !== index;
    });
    setItems(updatedItem);
  };
  // done wuth all the goals
  const doneGoals = () => {
    setItems([]);
  };

  // adding localstorage

  React.useEffect(() => {
    localStorage.setItem("goalslist", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img
              className="img"
              src="https://ignousolvedassignments.com/wp-content/uploads/2013/07/ignou-mca-notes.jpg"
              alt=""
            />
          </figure>
          <figure>Hey there, please wish your Goals below.</figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="📝 Add a Goal"
              className="form-control"
              value={inputData}
              onChange={(event) => setInputData(event.target.value)}
            />
            <i class="fa fa-plus add-btn" onClick={addItems}></i>
          </div>
          {/* show our goals */}
          <div className="show-goals">
            {items.map((currentElement) => {
              return (
                <div className="each-goal" key={currentElement.id}>
                  <p>
                    {currentElement.name} &nbsp;&nbsp; &nbsp;&nbsp;
                    <i
                      class="fa fa-trash add-btn"
                      onClick={() => deleteItem(currentElement.id)}
                    ></i>
                  </p>
                </div>
              );
            })}
            {/* done button */}
            <div className="btn-container">
              <button className="btn" onClick={doneGoals}>
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
