import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Movies = (props) => (
  <tr>
    <td>{props.movies.name}</td>
  </tr>
)

export default class Movielist extends Component {
  constructor(props){
    super(props);
    this.state = {movies: []}
  }

  //componentDidMount() is invoked immediately after a component is
  //mounted (inserted into the tree). Initialization that requires
  //DOM nodes should go here.
  //https://reactjs.org/docs/react-component.html#componentdidmount

  componentDidMount() {
    axios.get('https://andrew-movie-app.herokuapp.com/')
    .then((response)=>{
      this.setState({movies: response.data});
    })
    .catch((error)=>{
      console.log(error);
    });
  }

  movieList(){
    return this.state.movies.map((currentMovie)=>{
      return (
        <Movies
        movies = {currentMovie}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Movies</h3>
        <table className='table'></table>
        <thead className='thead-light'>
          <tr>
            <th>Movie</th>
          </tr>
        </thead>
        <tbody>{this.movieList()}</tbody>
      </div>
    );
  }
}