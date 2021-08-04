import React, { useState, useEffect } from "react";

const Poster = (props) => {
  let [src, setSrc] = useState('');
  useEffect(()=>{
    // console.log('testy')
    if(props.props == null){
      // console.log('null')
      return
    } else {
      // console.log(props.props.src)
      setSrc(props.props.src)
    }

  })
  return (
    <div style={{display:'inline'}} >
      <img
      src={src}
      width='250'
      />
    </div>
  );
};

export default Poster;