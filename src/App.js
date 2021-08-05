import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { HashRouter} from "react-router-dom";
// import { Helmet } from 'react-helmet'

import Mynavbar from "./components/mynavbar.component";
import Movielist from "./components/movielist.component";

function App() {
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <Mynavbar />
      {/* <Route path='/' exact component={Movielist} /> we need this later*/}
      <Movielist />
    </HashRouter>
  );
}

export default App;
