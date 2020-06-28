import React from "react";

// arrow_forward-24px

interface IProps {
	classNames?: string;
}

const ArrowForwardIcon: React.FC<IProps> = ({ classNames }) => {
	return (
		<svg className={"icon arrow-forward-icon " + classNames} viewBox="0 0 24 24">
			<path d="M0 0h24v24H0V0z" fill="none" />
			<path d="M5 13h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42.39.39 1.02.39 1.41 0l6.59-6.59c.39-.39.39-1.02 0-1.41l-6.58-6.6c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L16.17 11H5c-.55 0-1 .45-1 1s.45 1 1 1z" />
		</svg>
	);
};

export default ArrowForwardIcon;
