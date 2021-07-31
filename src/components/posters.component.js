import React, { Component } from "react";
// import axios from "axios";
// import { Container } from "react-bootstrap";


class Poster extends React.Component {
  constructor(props) {
    super(props)
    // console.log(props, new Date().toISOString())
    this.state = {
      src: props.movies.src
    }
  }

  render() {
    return (
      <div>
        <img
          src={this.state.src}
          className='d-inline'
        />
      </div>
    )
  }
}


class Posters extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
    this.moviePosters = this.moviePosters.bind(this);
  }
  
  
  moviePosters() {
    // console.log(this.props, new Date().toISOString())
    return this.props.movies.map((e) => {
      return <Poster movies={e} />
    })
  }

  render() {
    return (
      <div>
        {this.moviePosters()}
      </div>
    )
  }
}

export default Posters;


