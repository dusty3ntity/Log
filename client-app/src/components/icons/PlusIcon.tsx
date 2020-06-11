import React from "react";

// add-24px

interface IProps {
	classNames?: string;
}

const PlusIcon: React.FC<IProps> = ({ classNames }) => {
	return (
		<svg className={"icon plus-icon " + classNames} viewBox="0 0 24 24">
			<path d="M0 0h24v24H0V0z" fill="none" />
			<path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z" />
		</svg>
	);
};

export default PlusIcon;
