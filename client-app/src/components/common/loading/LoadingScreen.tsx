import React from "react";

import LoadingIndicator from "./LoadingIndicator";

interface IProps {
	size: number;
}

const LoadingScreen: React.FC<IProps> = ({ size }) => {
	return (
		<div className="loading-screen">
			<LoadingIndicator type="big" size={size} />
			<span className="title" style={{ fontSize: `${size / 1.5}rem` }}>
				Loading...
			</span>
		</div>
	);
};

export default LoadingScreen;
