import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

const NotFound = () => {
	return (
		<div>
			Nothing here...
			<Button>
				<Link to={"/dashboard"}>Return to dashboard</Link>
			</Button>
		</div>
	);
};

export default NotFound;