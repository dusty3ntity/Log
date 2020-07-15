import React from "react";

interface IProps {
	className?: string;
	type: "small" | "big";
	size?: number;
}

const LoadingIndicator: React.FC<IProps> = ({ className, type, size }) => {
	if (type === "small") {
		return (
			<svg className={`icon loading-indicator-small ${className ? className : ""}`} viewBox="0 0 50 50">
				<path d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z" />
			</svg>
		);
	}

	return (
		<div className={`loading-indicator-big ${className ? className : ""}`}>
			<div className="bounce1" style={{ width: `${size}rem`, height: `${size}rem` }} />
			<div className="bounce2" style={{ width: `${size}rem`, height: `${size}rem` }} />
			<div className="bounce3" style={{ width: `${size}rem`, height: `${size}rem` }} />
		</div>
	);
};

export default LoadingIndicator;
