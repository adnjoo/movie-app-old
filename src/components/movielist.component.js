import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Movies = (props) => {
  <tr>
    <td>{props.movies.name}</td>
  </tr>
}

export default class Movielist extends Component {
  constructor(props){
    super(props);

    this.state = {movies: []}
  }

  componentDidMount() {
    axios.get('https://andrew-movie-app.herokuapp.com/')
    .then((response)=>{
      this.setState({movies: response.data})
    })
    .catch((error)=>{
      console.log(error)
    })
  }
}