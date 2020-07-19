import React, { ReactElement } from "react";
import { Tooltip as Tippy } from "react-tippy";

interface IProps {
	text?: string;
	content?: ReactElement;
	position:
		| "top"
		| "top-start"
		| "top-end"
		| "bottom"
		| "bottom-start"
		| "bottom-end"
		| "left"
		| "left-start"
		| "left-end"
		| "right"
		| "right-start"
		| "right-end";
	interactive?: boolean;
	theme?: "dark" | "light";
	open?: boolean;
}

const Tooltip: React.FC<IProps> = ({ text, content, position, children, interactive, theme, open }) => {
	if (text) {
		content = <div style={{ minWidth: 60, maxWidth: 300, overflowWrap: "break-word" }}>{text}</div>;
	}

	return (
		<Tippy
			html={content}
			animation="fade"
			open={open}
			arrow
			distance={11}
			interactive={interactive}
			position={position}
			delay={500}
			className="tooltip-container"
			theme={theme ? theme : "dark"}
		>
			{children}
		</Tippy>
	);
};

export default Tooltip;
