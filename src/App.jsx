import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useParams,
} from "react-router-dom";

import "./App.css";

import axios from "axios";

// Generics
import Topbar from "./components/Topbar";
import Footer from "./components/Footer";

// Specifics
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Testing from "./pages/Room";

function App() {
	return (
		<>
			<Topbar />
			<Router>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/test" component={Testing} />
					<Route path="/profile" component={Profile} />
					<Route path="/rooms/:id" component={Room} />
				</Switch>
			</Router>
			<Footer />
		</>
	);
}

const Room = async () => {
	let { id } = useParams();
	let res = await axios.get("/rooms/getRoomInfo", { id: id });
	if (res.code) {
		return <Testing id={id} />;
	}
	return <h1>Room: {id}</h1>;
};

export default App;
