import React from "react";

interface IProps {
	status: "no-progress" | "in-progress" | "learned";
	rectangular?: boolean;
	id?: string;
	classNames?: string[];
}

const ItemProgressBadge: React.FC<IProps> = ({ status, rectangular, classNames = [], id, ...props }) => {
	classNames.unshift("item-progress-badge");
	classNames.push(status);

	if (rectangular) {
		classNames.push("rectangular");
	}

	return <div id={id} className={classNames.join(" ")} {...props} />;
};

export default ItemProgressBadge;
