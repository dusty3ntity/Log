import React from "react";

// remove-black-24dp

interface IProps {
	classNames?: string;
}

const MinusIcon: React.FC<IProps> = ({ classNames }) => {
	return (
		<svg className={"icon minus-icon " + classNames} viewBox="0 0 24 24">
			<path d="M0 0h24v24H0V0z" fill="none" />
			<path d="M18 13H6c-.55 0-1-.45-1-1s.45-1 1-1h12c.55 0 1 .45 1 1s-.45 1-1 1z" />
		</svg>
	);
};

export default MinusIcon;
