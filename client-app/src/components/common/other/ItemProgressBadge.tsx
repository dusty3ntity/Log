import React from "react";

import { IComponentProps } from "../../../app/models/components";
import { combineClassNames } from "../../../app/common/util/classNames";

export interface IItemProgressBadgeProps extends IComponentProps {
	status: "no-progress" | "in-progress" | "learned";
	rectangular?: boolean;
}

const ItemProgressBadge: React.FC<IItemProgressBadgeProps> = ({ id, className, status, rectangular, ...props }) => {
	return (
		<div
			id={id}
			className={combineClassNames("item-progress-badge", status, className, { rectangular: rectangular })}
			{...props}
		/>
	);
};

export default ItemProgressBadge;
