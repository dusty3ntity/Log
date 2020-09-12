import React from "react";

import { IComponentProps } from "../../../app/models/components";
import { combineClassNames } from "../../../app/common/util/classNames";

/**
 * Icon name: play_arrow-24px
 */
const DropdownIcon: React.FC<IComponentProps> = ({ id, className, ...props }) => {
	return (
		<svg id={id} className={combineClassNames("icon dropdown-icon", className)} viewBox="0 0 24 24" {...props}>
			<path d="M17.18 8L6.81999 8C6.02999 8 5.54999 8.87 5.97999 9.54L11.16 17.68C11.55 18.3 12.45 18.3 12.85 17.68L18.02 9.54C18.45 8.87 17.97 8 17.18 8Z" />
		</svg>
	);
};

export default DropdownIcon;
