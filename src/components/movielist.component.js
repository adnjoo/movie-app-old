import React, { Component } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";

let APIkey = "7aa9ec6612579e4bfd39288619de239c";

class Movies extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      value: '',
      name: props.movies.name
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event){
    this.setState({name: event.target.value})
  }
  render() {
    return (
      <tr className='space-x-2'>
      <td className='inline-block'><input
       onChange= {this.handleChange}
       value={this.state.name}></input></td>
      <a className='inline-block border-2' href='/'>X</a>
      <img className='inline-block' src={this.props.movies.src} alt='poster'></img>
    </tr>
    )
  }
}

// const Movies = (props) => (
//   <tr className='space-x-2'>
//     <td className='inline-block'><input
//      onChange={()=>console.log('test')}
//      value={props.movies.name}></input></td>
//     <a className='inline-block border-2' href='/'>X</a>
//     <img className='inline-block' src={props.movies.src} alt='poster'></img>
//   </tr>
// )

export default class Movielist extends Component {
  constructor(props){
    super(props);
    this.state = {
      movies: []
    }
  }

  componentDidMount() {
    axios.get('https://andrew-movie-app.herokuapp.com/')
    .then((response)=>{
      // console.log(response.data)
      this.setState({movies: response.data});
      for(let i in response.data){
        this.getImage(response.data[i].name)
      }
      console.log(this.state)
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
      // console.log(stateCopy)
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