import React, { useState } from "react";

const Inputfield = (props) => {
    const [textInput, setTextInput] = useState('')
    const handleChange = (e) =>{
        setTextInput(e.target.value)
    }
    const handleKeyDown = (e) =>{
        if(e.key==="Enter"){
            console.log('enter pressed')
            props.addMovie(textInput)
        }
    }
    return(
        <div style={{textAlign: 'center'}}>
        <input
        onChange= {handleChange}
        onKeyDown={handleKeyDown}
        />
        </div>
    )
};

export default Inputfield;