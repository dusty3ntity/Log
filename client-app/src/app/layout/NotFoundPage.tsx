import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = ({ ...props }) => {
	useEffect(() => {
		document.title = "Not found - Log";
	}, []);

	return (
		<div id="not-found-page" {...props}>
			<div className="error-code">404</div>

			<div className="content">
				<div className="title">Nothing here... Yet.</div>

				<Link to="/items-list" className="btn">
					Go to items list
				</Link>
			</div>
		</div>
	);
};

export default NotFoundPage;
