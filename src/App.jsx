import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
} from "react-router-dom";
import "./App.css";

import io from "socket.io-client";

// Generics
import Topbar from "./components/Topbar";
import Footer from "./components/Footer";

// Specifics
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Testing from "./pages/Room";

function App() {
    const socket = io();
    return (
        <>
			<Topbar />
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/test" component={Testing}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/rooms/:id" component={Room}/>
                </Switch>
            </Router>
			<Footer />
        </>
  );
}

function Room() {
    let { id } = useParams();
    return <h1>Room: { id }</h1>
}

export default App;