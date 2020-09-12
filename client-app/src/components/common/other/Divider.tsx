import React from "react";

import { IComponentProps } from "../../../app/models/components";
import { combineClassNames } from "../../../app/common/util/classNames";

export interface IDividerProps extends IComponentProps {
	text?: string;
	vertical?: boolean;
	invisible?: boolean;
}

const Divider: React.FC<IDividerProps> = ({ id, className, vertical, text, invisible, ...props }) => {
	if (text) {
		return (
			<div id={id} className={combineClassNames("text-divider", className)} {...props}>
				<hr className={combineClassNames("divider", "divider-left")} />
				<div className="divider-text">{text}</div>
				<hr className={combineClassNames("divider", "divider-right")} />
			</div>
		);
	}

	if (vertical) {
		return (
			<div
				id={id}
				className={combineClassNames("divider", "vertical", className, { invisible: invisible })}
				{...props}
			/>
		);
	}

	return <hr id={id} className={combineClassNames("divider", className, { invisible: invisible })} {...props} />;
};

export default Divider;
