import React, { Component } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import { Container } from "react-bootstrap";
import Poster from './poster.component'

let APIkey = "7aa9ec6612579e4bfd39288619de239c";


class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      name: props.movies.name,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({ name: e.target.value });
  }
  handleKeyDown = (e) => {
    if(e.key==='Enter'){
      console.log('enter pressed')
    }
  } 
  render() {
    return (
      <div className='mx-auto text-center '>
        <input
        className='text-center'
        onChange={this.handleChange}
        value={this.state.name}
        onKeyDown={this.handleKeyDown}
        >
        </input>
      </div>
    );
  }
}

export default class Movielist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
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
      .catch((error) => {
        console.log(error);
      });
  }

  getImage(movie) {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${APIkey}&query=${movie}`
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
        // console.log(this.state)
      });
  }

  movieList() {
    // console.log(this.state)
    return this.state.movies.map((e) => {
      return <Movies movies={e} />;
    });
  }

  posterList(){
    return this.state.movies.map((e)=>{
      return <Poster props={e} />
    })
  }

  render() {
    return (
      <div>
        <Container className='mycontainer border'>
          <h1 className='text-center fs-2'>My movie list</h1>
          <div className="marginauto">
            <div>{this.movieList()}</div>
          </div>
          <div>
            <div id='posters' className='my-3' style={{textAlign:"center"}} >{this.posterList()}</div>
          </div>
        </Container>
      </div>
    );
  }
}
