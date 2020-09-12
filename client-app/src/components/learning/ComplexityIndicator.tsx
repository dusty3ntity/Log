import React from "react";

import { IComponentProps } from "../../app/models/components";
import { combineClassNames } from "../../app/common/util/classNames";
import HappySmileIcon from "../common/icons/HappySmileIcon";
import NeutralSmileIcon from "../common/icons/NeutralSmileIcon";
import UnhappySmileIcon from "../common/icons/UnhappySmileIcon";

export interface IComplexityIndicatorProps extends IComponentProps {
	complexity: number;
}

const ComplexityIndicator: React.FC<IComplexityIndicatorProps> = ({ id, className, complexity, ...props }) => {
	return (
		<div id={id} className={combineClassNames("difficulty-indicator", className)} {...props}>
			{complexity < 0.4 && <HappySmileIcon />}
			{complexity >= 0.4 && complexity < 0.8 && <NeutralSmileIcon />}
			{complexity >= 0.8 && <UnhappySmileIcon />}
		</div>
	);
};

export default ComplexityIndicator;
