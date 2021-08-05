import React, { Component, useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import { Container } from "react-bootstrap";
import Poster from "./poster.component";
import Inputfield from "./inputfield.component";

let apiKey = "7aa9ec6612579e4bfd39288619de239c";
let herokuURL = 'https://andrew-movie-app.herokuapp.com/'

const Movie = (props) => {
  const [value, setValue] = useState('')
  const [name, setName] = useState(props.movies.name)
  const [id, setId] = useState(props.movies.id)

  useEffect(()=>{
    function test () {
      console.log(name, props.movies)
    }
    test()
  })

  const handleChange = (e) => {
    setName(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("enter pressed");
      props.editMovie(id, name);
    }
  }
    return (
      <div className="mx-auto text-center" style={{ width: "100%" }}>
        <input
          className="text-center movieListInput"
          onChange={handleChange}
          value={name}
          onKeyDown={handleKeyDown}
        ></input>
        <button onClick={()=>{props.deleteMovie(id)}}>x</button>
      </div>
    );
}

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
  }

  componentDidMount() {
    this.getMovies();
  }

  getMovies() {
    axios
      .get("https://andrew-movie-app.herokuapp.com/")
      .then((response) => {
        // console.log(response.data)
        this.setState({ movies: response.data });
        for (let i in response.data) {
          this.getImage(response.data[i].name);
        }
        // console.log(this.state);
      })
  }

  getImage(movie) {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movie}`
      )
      .then((res) => {
        // console.log(res.data.results);
        let stateCopy = Object.assign({}, this.state);
        // console.log(stateCopy)
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
        console.log(res);
        this.getMovies();
        console.log(this.state.movies)
      });
  }

  deleteMovie(id){
    console.log('deleting')
    axios
    .delete(herokuURL,{
      data:{
        id
      }
    })
    .then((res)=>{
      console.log(res.data)
      this.getMovies()
    })
  }

  movieList() {
    // console.log(this.state)
    return this.state.movies.map((e) => {
      return <Movie 
      movies={e} 
      editMovie={this.editMovie}
      deleteMovie={this.deleteMovie} />;
    });
  }

  posterList() {
    return this.state.movies.map((e, i) => {
      return <Poster key={i} props={e} />;
    });
  }

  render() {
    return (
      <div>
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
          <Inputfield addMovie={this.addMovie}/>
        </Container>
      </div>
    );
  }
}

export default Movielist