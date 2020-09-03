import React from "react";

import { IComponentProps } from "../../../app/models/components";
import { combineClassNames } from "../../../app/common/util/classNames";

export interface IDrawerProps extends IComponentProps {
	onClose: () => void;
	visible: boolean;
	placement?: "left" | "right";
}

const Drawer: React.FC<IDrawerProps> = ({
	id,
	className,
	onClose,
	visible,
	placement = "right",
	children,
	...props
}) => {
	return (
		<div id={id} className={combineClassNames("drawer", className, { hidden: !visible })} {...props}>
			<div className="drawer-mask" onClick={onClose} />
			<div
				className={combineClassNames("drawer-content", {
					"placement-right": placement === "right",
					"placement-left": placement === "left",
				})}
			>
				{children}
			</div>
		</div>
	);
};

export default Drawer;
