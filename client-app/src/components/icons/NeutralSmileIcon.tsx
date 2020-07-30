import React from "react";

// sentiment_neutral-24px

interface IProps {
	className?: string;
}

const NeutralSmileIcon: React.FC<IProps> = ({ className }) => {
	return (
		<svg className={"icon neutral-smile-icon " + (className ? className : "")} viewBox="0 0 24 24">
			<path d="M9.75 14h4.5a.75.75 0 1 1 0 1.5h-4.5a.75.75 0 1 1 0-1.5z" />
			<circle cx="15.5" cy="9.5" r="1.5" />
			<circle cx="8.5" cy="9.5" r="1.5" />
			<path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8z" />
		</svg>
	);
};

export default NeutralSmileIcon;
