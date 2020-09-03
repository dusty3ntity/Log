import React from "react";

import { IComponentProps } from "../../../app/models/components";
import { combineClassNames } from "../../../app/common/util/classNames";

/**
 * Icon name: arrow_right_alt-24px
 */
const ArrowForwardSmallIcon: React.FC<IComponentProps> = ({ id, className, ...props }) => {
	return (
		<svg
			id={id}
			className={combineClassNames("icon arrow-forward-small-icon", className)}
			viewBox="0 0 24 24"
			{...props}
		>
			<path d="M0 0h24v24H0V0z" fill="none" />
			<path d="M16.01 11H5c-.55 0-1 .45-1 1s.45 1 1 1h11.01v1.79c0 .45.54.67.85.35l2.78-2.79c.19-.2.19-.51 0-.71l-2.78-2.79c-.31-.32-.85-.09-.85.35V11z" />
		</svg>
	);
};

export default ArrowForwardSmallIcon;
