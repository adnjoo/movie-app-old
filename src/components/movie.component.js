import React, { useState, useEffect } from "react";

const Movie = (props) => {
    const [name, setName] = useState('');
    const [id, setId] = useState(props.movies.id);
  
    useEffect(() => {
      function test() {
        if(props.movies.name == null){
          return
        } else {
          setName(props.movies.name)
          setId(props.movies.id)
        }
      }
      test();
    });
  
    const handleChange = (e) => {
      // setName(e.target.value); go up to parent
      props.editName(name,e.target.value, id)
    };
  
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        console.log("enter pressed");
        props.editMovie(id, name);
      }
    };
    return (
      <div className="mx-auto text-center" style={{ width: "100%" }}>
        <input
          className="text-center movieListInput"
          onChange={handleChange}
          value={name}
          onKeyDown={handleKeyDown}
        ></input>
        <button
          onClick={() => {
            // console.log('id is', id)
            props.deleteMovie(id);
          }}
        >
          x
        </button>
      </div>
    );
};

export default Movie;