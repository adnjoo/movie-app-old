import React, { useState, useEffect } from "react";
import {Alert} from 'react-bootstrap'

const HerokuAlert = () => {
  const [show, setShow] = useState(true);
  useEffect(()=>{
      const timeId = setTimeout(()=>{
          setShow(false)
      },7000)
      return ()=>{
          clearTimeout(timeId)
      }
  },[])
  if (show) {
    return (
      <Alert key='alert' variant="primary" onClose={() => setShow(false)} dismissible>
        try loading <a target="_blank" href='https://andrew-movie-app.herokuapp.com/'>heroku</a> if no data loads
      </Alert>
    );
  }
  else {
      return (<div></div>)
  }
};

export default HerokuAlert