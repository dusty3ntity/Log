import React from "react";
import { history } from "../..";

const NotFound = () => {
	document.title = "404 - Log";

	return (
		<div className="not-found">
			<div className="error-code">404</div>

			<div className="content">
				<div className="title">Nothing here... Yet.</div>

				<button className="btn default" onClick={() => history.push("/dashboard")}>
					Go to dashboard
				</button>
			</div>
		</div>
	);
};

export default NotFound;
