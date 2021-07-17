import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import './index.css'
import { BrowserRouter as Router, Route } from "react-router-dom";

import Mynavbar from "./components/mynavbar.component";
import Movielist from "./components/movielist.component";


function App() {
  return (
    <Router>
      <Mynavbar />
      <Route path='/' exact component={Movielist} />
    </Router>
  )

}

export default App;
