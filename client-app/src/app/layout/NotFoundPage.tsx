import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = ({ ...props }) => {
	document.title = "404 - Log";

	return (
		<div id="not-found-page" {...props}>
			<div className="error-code">404</div>

			<div className="content">
				<div className="title">Nothing here... Yet.</div>

				<Link to="/items-list" className="btn">Go to items list</Link>
			</div>
		</div>
	);
};

export default NotFoundPage;
