import React from "react";

// swap_horiz-24px

interface IProps {
	className?: string;
}

const SwapIcon: React.FC<IProps> = ({ className }) => {
	return (
		<svg className={"icon swap-icon " + className} viewBox="0 0 24 24">
			<path d="M0 0h24v24H0V0z" fill="none" />
			<path d="M6.14 11.86l-2.78 2.79c-.19.2-.19.51 0 .71l2.78 2.79c.31.32.85.09.85-.35V16H13c.55 0 1-.45 1-1s-.45-1-1-1H6.99v-1.79c0-.45-.54-.67-.85-.35zm14.51-3.21l-2.78-2.79c-.31-.32-.85-.09-.85.35V8H11c-.55 0-1 .45-1 1s.45 1 1 1h6.01v1.79c0 .45.54.67.85.35l2.78-2.79c.2-.19.2-.51.01-.7z" />
		</svg>
	);
};

export default SwapIcon;
