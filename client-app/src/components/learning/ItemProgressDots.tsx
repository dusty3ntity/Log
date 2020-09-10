import React from "react";

import { IComponentProps } from "../../app/models/components";
import { combineClassNames } from "../../app/common/util/classNames";

export interface ItemProgressDotsProps extends IComponentProps {
	total: number;
	checked: number;
	secondTraining: boolean;
}

const ItemProgressDots: React.FC<ItemProgressDotsProps> = ({
	id,
	className,
	total,
	checked,
	secondTraining,
	...props
}) => {
	const dots = [];

	for (let i = 0; i < checked; i++) {
		dots.push(<span className="progress-dot active" key={i} />);
	}

	for (let i = 0; i < total - checked; i++) {
		dots.push(<span className="progress-dot" key={i + checked} />);
	}

	return (
		<div
			id={id}
			className={combineClassNames("item-progress-dots", className, { "second-training": secondTraining })}
			{...props}
		>
			{dots}
		</div>
	);
};

export default ItemProgressDots;
