import React, { useState, useEffect } from "react";

const Poster = (props) => {
  let [src, setSrc] = useState('');
  useEffect(()=>{
    function myfunction (){
      // console.log('testy')
    if(props.props == null){
      // console.log('null')
      return
    } else {
      // console.log(props.props.src)
      setSrc(props.props.src)
    }
    }
    myfunction()
  })
  return (
    <div style={{display:'inline'}} >
      <img
      src={src}
      width='250'
      alt=''
      />
    </div>
  );
};

export default Poster;