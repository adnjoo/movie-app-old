import React, { Component } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";

class Poster extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      src: props.movies.src
    }
  }

  render () {
    return (
      <img
      src={this.state.src}
      className='d-inline'
      />
    )
  }
}


class Posters extends React.Component {
  constructor(props){
    super(props)

    this.moviePosters = this.moviePosters.bind(this);
  }

  moviePosters(){
    return this.props.movies.map((e)=>{
      return <Poster movies={e} />
    })
  }

  render(){
    return(
      <div>

        {this.moviePosters()}
        </div>
    )
  }
}

export default Posters;