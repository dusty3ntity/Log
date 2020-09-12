import React from "react";

import { IComponentProps } from "../../../app/models/components";
import { combineClassNames } from "../../../app/common/util/classNames";

/**
 * Icon name: remove-black-24dp
 */
const MinusIcon: React.FC<IComponentProps> = ({ id, className, ...props }) => {
	return (
		<svg id={id} className={combineClassNames("icon minus-icon", className)} viewBox="0 0 24 24" {...props}>
			<path d="M0 0h24v24H0V0z" fill="none" />
			<path d="M18 13H6c-.55 0-1-.45-1-1s.45-1 1-1h12c.55 0 1 .45 1 1s-.45 1-1 1z" />
		</svg>
	);
};

export default MinusIcon;
