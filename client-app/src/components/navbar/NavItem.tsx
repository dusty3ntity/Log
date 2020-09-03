import React from "react";
import { NavLink } from "react-router-dom";

import { IComponentProps } from "../../app/models/components";
import { combineClassNames } from "../../app/common/util/classNames";
import Button from "../common/inputs/Button";

export interface INavItemProps extends IComponentProps {
	type: "link" | "button";
	link?: string;
	onClick?: () => void;
	title: string;
	icon: JSX.Element;
}

const NavItem: React.FC<INavItemProps> = ({ id, className, type, link, onClick, title, icon, ...props }) => {
	if (type === "link" && link) {
		return (
			<NavLink to={link} exact id={id} className={combineClassNames("nav-item", className)} {...props}>
				{icon}
				<span className="item-name">{title}</span>
			</NavLink>
		);
	}

	return (
		<Button
			id={id}
			className={combineClassNames("nav-item", "nav-item-btn", className)}
			onClick={onClick}
			icon={icon}
			text={title}
			textClassName="item-name"
			{...props}
		/>
	);
};

export default NavItem;
