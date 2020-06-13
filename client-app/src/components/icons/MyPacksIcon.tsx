import React from "react";

// view_column-24px

interface IProps {
	classNames?: string;
}

const MyPacksIcon: React.FC<IProps> = ({ classNames }) => {
	return (
		<svg className={"icon my-packs-icon " + classNames} viewBox="0 0 24 24">
			<path d="M0 0h24v24H0V0z" fill="none" />
			<path d="M11 18h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1h-3c-.55 0-1 .45-1 1v11c0 .55.45 1 1 1zm-6 0h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v11c0 .55.45 1 1 1zM16 6v11c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1h-3c-.55 0-1 .45-1 1z" />
		</svg>
	);
};

export default MyPacksIcon;