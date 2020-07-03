import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import * as serviceWorker from "./serviceWorker";

import "react-toastify/dist/ReactToastify.min.css";
import "simplebar/dist/simplebar.min.css";
import "./app/styles/style.less";

import App from "./app/layout/App";

export const history = createBrowserHistory();

ReactDOM.render(
	//   <React.StrictMode>
	<Router history={history}>
		<App />
	</Router>,
	//   </React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
