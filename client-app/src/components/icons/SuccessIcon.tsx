import React from "react";

// check_circle_outline-24px

interface IProps {
	className?: string;
}

const SuccessIcon: React.FC<IProps> = ({ className }) => {
	return (
		<svg className={"icon success-icon " + className} viewBox="0 0 24 24">
			<path d="M0 0h24v24H0V0z" fill="none" />
			<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.88-11.71L10 14.17l-1.88-1.88c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L17.3 9.7c.39-.39.39-1.02 0-1.41-.39-.39-1.03-.39-1.42 0z" />
		</svg>
	);
};

export default SuccessIcon;