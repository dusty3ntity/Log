import React from "react";

import { combineClassNames } from "../../../app/common/util/classNames";

interface IProps {
	id?: string;
	classNames?: string[];
	onClose: () => void;
	visible: boolean;
	placement?: "left" | "right";
}

const Drawer: React.FC<IProps> = ({
	id,
	classNames = [],
	onClose,
	visible,
	placement = "right",
	children,
	...props
}) => {
	classNames.unshift("drawer");
	const placementClass = placement === "right" ? "placement-right" : "placement-left";

	return (
		<div id={id} className={combineClassNames(classNames, { hidden: !visible })} {...props}>
			<div className="drawer-mask" onClick={onClose} />
			<div className={combineClassNames("drawer-content", placementClass)}>{children}</div>
		</div>
	);
};

export default Drawer;
