import React from "react";

const HomePage = () => {
	if (process.env.REACT_APP_ENV === "PRODUCTION") {
		window.location.replace("https://log.ohyr.dev");
		return <div />;
	}

	return (
		<div>
			<h1>Home page!</h1>
		</div>
	);
};

export default HomePage;
