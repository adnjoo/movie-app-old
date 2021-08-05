import React, { useState, useEffect } from "react";

const Poster = (props) => {
  let [src, setSrc] = useState("");
  useEffect(() => {
    function myfunction() {
      if (props.props == null) {
        return;
      } else {
        setSrc(props.props.src);
      }
    }
    myfunction();
  });
  return (
    <div style={{ display: "inline" }}>
      <img src={src} width="250" alt="" />
    </div>
  );
};

export default Poster;
