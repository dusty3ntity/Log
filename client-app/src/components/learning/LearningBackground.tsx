import React from "react";

import { IComponentProps } from "../../app/models/components";
import { combineClassNames } from "../../app/common/util/classNames";

const LearningBackground: React.FC<IComponentProps> = ({ id, className, ...props }) => {
	const skeleton = [];

	for (let i = 0; i < 11; i++) skeleton.push(<li key={i} />);

	return (
		<div className={combineClassNames("learning-background", className)} {...props}>
			<div className="bg-big background">
				<div className="skeleton">{skeleton}</div>
			</div>
			<div className="bg-medium background">
				<div className="skeleton">{skeleton}</div>
			</div>
			<div className="bg-small background">
				<div className="skeleton">{skeleton}</div>
			</div>
		</div>
	);
};

export default LearningBackground;
