import React from "react";

// done-black-24dp

interface IProps {
	className?: string;
}

const CheckIcon: React.FC<IProps> = ({ className }) => {
	return (
		<svg className={"icon check-icon " + className} viewBox="0 0 24 24">
			<path d="M0 0h24v24H0V0z" fill="none" />
			<path d="M9 16.2l-3.5-3.5c-.39-.39-1.01-.39-1.4 0-.39.39-.39 1.01 0 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7c.39-.39.39-1.01 0-1.4-.39-.39-1.01-.39-1.4 0L9 16.2z" />
		</svg>
	);
};

export default CheckIcon;
