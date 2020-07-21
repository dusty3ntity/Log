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
				<div className="divider divider-left" />
				<div className="divider-text">{text}</div>
				<div className="divider divider-right" />
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

	return <div className={classNames.join(" ")} />;
};

export default Divider;
