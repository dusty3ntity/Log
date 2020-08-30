import React from "react";

// play_arrow-24px

interface IProps {
	classNames?: string;
}

const DropdownIcon: React.FC<IProps> = ({ classNames }) => {
	return (
		<svg className={"icon dropdown-icon " + classNames} viewBox="0 0 24 24">
			<path d="M17.18 8L6.81999 8C6.02999 8 5.54999 8.87 5.97999 9.54L11.16 17.68C11.55 18.3 12.45 18.3 12.85 17.68L18.02 9.54C18.45 8.87 17.97 8 17.18 8Z" />
		</svg>
	);
};

export default DropdownIcon;
