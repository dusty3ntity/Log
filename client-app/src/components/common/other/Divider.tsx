import React from "react";

interface IProps {
	vertical?: boolean;
	text?: string;
	invisible?: boolean;
	className?: string;
}

const Divider: React.FC<IProps> = ({ vertical, text, invisible, className }) => {
	if (text) {
		return (
			<div className="text-divider">
				<hr className="divider divider-left" />
				<div className="divider-text">{text}</div>
				<hr className="divider divider-right" />
			</div>
		);
	}

	const classNames: string[] = ["divider"];

	if (className) {
		classNames.push(className);
	}

	if (vertical) {
		classNames.push("vertical");
	}

	if (invisible) {
		classNames.push("invisible");
	}

	if (vertical) {
		return <div className={classNames.join(" ")} />;
	}

	return <hr className={classNames.join(" ")} />;
};

export default Divider;
