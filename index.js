//declare variables
let movies = [];
let addMovieButton = document.getElementById("button");
let movielist = document.querySelector("#movielist");
let movielist1 = document.querySelector("#movielist1");
let input = document.querySelector("#input");

let APIkey = "7aa9ec6612579e4bfd39288619de239c";
let tooltip = document.getElementById("tooltip");

// let url = "http://localhost:4001/"; //local

let url = "https://andrew-movie-app.herokuapp.com/"; //heroku

//add event listener to input
input.addEventListener("keypress",(e)=>{
  if(e.key==="Enter"){
    getMovie(input.value)
    input.value=''
  }
})

//function to get all movies
let fetchMovies = () => {
  //clear movielist
  movielist.innerHTML = "";
  movielist1.innerHTML = "";

  axios.get(url).then((res) => {
    console.log("server response:", res.data);
    movies = res.data;
    for (let i in res.data) {
      let span = document.createElement("span");
      let node = document.createElement("input");
      let btn = document.createElement("button");
      node.classList.add("textfield2");
      node.id = res.data[i].id;
      node.contentEditable = true;
      node.value = `${res.data[i].name}`;
      //listen for enter key
      node.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          console.log("enter pressed");
          editMovie(node.id, node.value);
        }
      });
      //tailwind classes
      node.classList.add('bg-gradient-to-r', 'from-green-400', 'to-blue-500','text-xl','md:text-2xl','w-10/12')
      btn.innerHTML = "X";
      btn.classList.add("buttonfield",'transform','transition','duration-700','hover:scale-125');
      btn.id = res.data[i].id;
      btn.addEventListener("click", () => {
        // console.log(btn.id)
        deleteMovie(btn.id);
      });
      span.appendChild(node);
      span.appendChild(btn);
      movielist.appendChild(span);
    }

    for (let i in movies) {
      getImage(movies[i].name);
    }
    // append all images here after they load asynchronously through axios

    setTimeout(() => {
      for (let i in movies) {
        let w = document.createElement('div')
        w.classList.add('posterContainer')
        let x = document.createElement("img");
        x.setAttribute("src", movies[i].src);
        //tailwind classes
        x.classList.add('h-1/4','inline-flex','md:h-1/3')
        //on mouse click, show movie text
        x.addEventListener("click", () => {
          let attach = movies.find((e) => e.src == movies[i].src);
          tooltip.innerHTML = attach.overview;
        });
        w.appendChild(x);
        movielist1.appendChild(w);
      }
      // increase setTimeout time to allow for fetch posters from TMDB
    }, 350);
  })
  .catch((err)=>{
    console.log(err)
  })
};

fetchMovies();

//get movie poster from TMDB
let getImage = (movie) => {
  console.log(movie)
  axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=${APIkey}&query=${movie}`
    )
    .then((res) => {
      // res.data.results is an array of objects
      // console.log(res.data.results);
      let result = res.data.results[0];
      let poster = `https://image.tmdb.org/t/p/original/${result.poster_path}`;

      //attach source+other-details to movies array
      let attach = movies.find((element) => element.name == movie);
      attach.src = poster;
      attach.overview = res.data.results[0].overview;
      attach.release = res.data.results[0].release_date;
    });
};

//add a movie
let getMovie = (x) => {
  axios
    .post(url, {
      movie: x,
    })
    .then((res) => {
      console.log(res);
      //fetch all movies after posting a movie
      setTimeout(fetchMovies(), 1000);
    });
};

//delete a movie
let deleteMovie = (movie) => {
  //we want to send the id of movie we want to delete
  axios
    .delete(url, {
      data: {
        id: movie,
      },
    })
    .then((res) => {
      console.log(res.data);
      setTimeout(fetchMovies(), 1000);
    });
};

//edit movie - pass two params in
let editMovie = (movie, newName) => {
  axios
    .put(url, {
      id: movie,
      name: newName,
    })
    .then((res) => {
      console.log(res.data);
      setTimeout(fetchMovies(), 1000);
    });
};

addMovieButton.addEventListener("click", () => {
  // console.log('test')
  getMovie(input.value);
});

// M.toast({
//   html: `<span>try loading <a href='https://andrew-movie-app.herokuapp.com/'> heroku </a> if nothing pops up</span>`,
//   displayLength: 4000
// })

//alert
let alert = document.getElementById('alert')

setTimeout(()=>{
  alert.setAttribute('style','display:none')
},8000)

document.getElementById('close-alert').addEventListener('click',()=>{
  alert.setAttribute('style','display:none')
})