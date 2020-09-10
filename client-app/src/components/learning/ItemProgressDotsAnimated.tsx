import React from "react";

import { IComponentProps } from "../../app/models/components";
import { combineClassNames } from "../../app/common/util/classNames";

export interface ItemProgressDotsAnimatedProps extends IComponentProps {
	total: number;
	checked: number;
	isHardModeEnabled: boolean;
	answerCorrect?: boolean;
	animated?: boolean;
	secondTraining: boolean;
}

const ItemProgressDotsAnimated: React.FC<ItemProgressDotsAnimatedProps> = ({
	id,
	className,
	total,
	checked,
	isHardModeEnabled,
	answerCorrect,
	animated,
	secondTraining,
	...props
}) => {
	const dots = [];

	let active = checked;
	let remaining = total - checked;

	if (answerCorrect) {
		for (let i = 0; i < checked; i++) {
			dots.push(<span className="progress-dot active" key={i} />);
		}
		if (checked < total && !secondTraining) {
			dots.push(<span className={combineClassNames("progress-dot", { fadein: animated })} key={checked} />);
			remaining--;
			active++;
		}
	} else {
		if (!isHardModeEnabled && checked > 0) {
			for (let i = 0; i < checked - 1; i++) {
				dots.push(<span className="progress-dot active" key={i} />);
			}
			dots.push(
				<span className={combineClassNames("progress-dot active", { fadeout: animated })} key={checked - 1} />
			);
		} else {
			for (let i = 0; i < checked; i++) {
				dots.push(<span className={combineClassNames("progress-dot active", { fadeout: animated })} key={i} />);
			}
		}
	}

	for (let i = 0; i < remaining; i++) {
		dots.push(<span className="progress-dot" key={active + i} />);
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

export default ItemProgressDotsAnimated;
