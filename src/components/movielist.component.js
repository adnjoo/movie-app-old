import React, { Component } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";

let APIkey = "7aa9ec6612579e4bfd39288619de239c";

const Movies = (props) => (
  <tr>
    <td>{props.movies.name}</td>
    <img src={props.movies.src}></img>
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
      // console.log(response.data)
      this.setState({movies: response.data});
      for(let i in response.data){
        this.getImage(response.data[i].name)
      }
      // console.log(this.state.movies)
    })
    .catch((error)=>{
      console.log(error);
    });
  }

  getImage(movie) {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${APIkey}&query=${movie}`)
    .then((res)=>{
      // console.log(res.data.results);
      let stateCopy = Object.assign({},this.state)
      console.log(stateCopy)
      let result = res.data.results[0];
      let poster = `https://image.tmdb.org/t/p/original/${result.poster_path}`;
      let attach = stateCopy.movies.find((e) => e.name === movie);
      // console.log(attach)
      attach.src = poster;
      attach.overview = res.data.results[0].overview;
      attach.release = res.data.results[0].release_date;
      // console.log(attach, stateCopy)
      this.setState(stateCopy)
      // console.log(this.state)
    })
  }

  movieList(){
    return this.state.movies.map((e)=>{
      return (
        <Movies
        movies = {e}
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