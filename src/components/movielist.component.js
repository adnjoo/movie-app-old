import React, { Component } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import { Container } from "react-bootstrap";
import Poster from "./poster.component";
import Inputfield from "./inputfield.component";
import Movie from "./movie.component";
import HerokuAlert from './helperfunctions.component'

let apiKey = "7aa9ec6612579e4bfd39288619de239c";
let herokuURL = "https://andrew-movie-app.herokuapp.com/";

class Movielist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    };

    this.editMovie = this.editMovie.bind(this);
    this.getMovies = this.getMovies.bind(this);
    this.addMovie = this.addMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.editName = this.editName.bind(this);
    this.activateLasers = this.activateLasers.bind(this);
  }

  componentDidMount() {
    this.getMovies();
  }

  getMovies() {
    axios.get("https://andrew-movie-app.herokuapp.com/").then((response) => {
      this.setState({ movies: response.data });
      for (let i in response.data) {
        this.getImage(response.data[i].name);
      }
      // console.log('state of movies', this.state.movies)
    });
  }

  getImage(movie) {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movie}`
      )
      .then((res) => {
        // console.log(res)
        let stateCopy = Object.assign({}, this.state);
        //if unable to find the movie we will return the no poster image
        if(res.data.results.length===0){
          let attach = stateCopy.movies.find((e) => e.name === movie);
          // console.log('attach is', attach)
          attach.src= 'https://raw.githubusercontent.com/adnjoo/movie-app/main/assets/no-poster.jpeg'
          return
        }
        let result = res.data.results[0];
        let poster = `https://image.tmdb.org/t/p/original/${result.poster_path}`;
        let attach = stateCopy.movies.find((e) => e.name === movie);
        // console.log(attach)
        attach.src = poster;
        attach.overview = res.data.results[0].overview;
        attach.release = res.data.results[0].release_date;
        // console.log(attach, stateCopy)
        this.setState(stateCopy);
      });
  }

  editName(name, newname, id) {
    // edit state but dont get movies with axios
    let stateCopy = Object.assign({}, this.state);
    // console.log(name, id, this.state, stateCopy)
    let movieEdit = stateCopy.movies.find((e) => e.name === name);
    console.log(movieEdit);
    movieEdit.name = newname;
    this.setState(stateCopy);
  }

  editMovie(id, name) {
    axios
      .put(herokuURL, {
        id,
        name,
      })
      .then((res) => {
        console.log(res.data);
        console.log(this.state);
        this.getMovies();
      });
  }

  addMovie(name) {
    axios
      .post(herokuURL, {
        movie: name,
      })
      .then((res) => {
        // console.log(res);
        this.getMovies();
        console.log(this.state.movies);
      });
  }

  deleteMovie(id) {
    console.log("deleting");
    axios
      .delete(herokuURL, {
        data: {
          id,
        },
      })
      .then((res) => {
        // console.log(res.data);
        this.getMovies();
        // console.log(this.state)
      });
  }

  movieList() {
    // console.log(this.state)
    return this.state.movies.map((e, i) => {
      return (
        <Movie
          key={i}
          movies={e}
          editMovie={this.editMovie}
          deleteMovie={this.deleteMovie}
          editName={this.editName}
        />
      );
    });
  }

  posterList() {
    return this.state.movies.map((e, i) => {
      return <Poster key={i} props={e} />;
    });
  }
  activateLasers(){
    console.log(this.state)
  }
  
  render() {
    return (
      <div>
        <HerokuAlert/>
        <Container className="mycontainer border my-3">
          <h1 className="text-center fs-2">My movie list</h1>
          <div className="">
            <div>{this.movieList()}</div>
          </div>
          <div>
            <div id="posters" className="my-3" style={{ textAlign: "center" }}>
              {this.posterList()}
            </div>
          </div>
          <Inputfield addMovie={this.addMovie} />
        </Container>
      </div>
    );
  }
}

export default Movielist;
