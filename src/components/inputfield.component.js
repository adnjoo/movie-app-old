import React, { useState } from "react";

const Inputfield = (props) => {
  const [textInput, setTextInput] = useState("");
  const handleChange = (e) => {
    setTextInput(e.target.value);
  };
  const handleKeyDown = (e) => {
    setTextInput(e.target.value);
    if (e.key === "Enter") {
      console.log("enter pressed");
      props.addMovie(textInput);
      setTextInput("");
    }
  };
  return (
    <div style={{ textAlign: "center" }}>
      <input
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={textInput}
      />
    </div>
  );
};

export default Inputfield;
