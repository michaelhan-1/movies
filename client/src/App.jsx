import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useReducer,
} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NavBar from './components/navBar'
import "bootstrap/dist/css/bootstrap.min.css";
import Movies from "./components/movies";
import EditForm from "./components/editMovie";
function App() {
  return (
    <div>
      <Router>
      <NavBar />
      <div  style={{ padding: "100px" }}>      
            <Switch>
                <Route exact path="/">
                    <Movies />
                </Route>
                <Route exact path="/movie">
                    <EditForm />
                </Route>
            </Switch>
        
        </div>
        </Router>
    </div>
  );
}

export default App;
