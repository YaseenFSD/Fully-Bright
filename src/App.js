import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoginPage } from "./pages";
import { NavBar } from "./components/nav-bar/NavBar";
import "./App.css";
import "./firebase/config";

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" component={LoginPage} />
        
      </div>
    </Router>
  );
}

export default App;
