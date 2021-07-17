import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Movies = (props) => (
  <tr>
    <td>{props.movies.name}</td>
    <img width='100' src='https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png'></img>
  </tr>
)

export default class Movielist extends Component {
  constructor(props){
    super(props);
    this.state = {movies: []}
  }

  componentDidMount() {
    axios.get('https://andrew-movie-app.herokuapp.com/')
    .then((response)=>{
      this.setState({movies: response.data});
    })
    //make another axios call to TMDB to get images
    .then()
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