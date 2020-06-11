import React from "react";
import { NavLink } from "react-router-dom";

interface IProps {
	link: string;
	name: string;
	icon: JSX.Element;
}

const NavItem: React.FC<IProps> = ({ name, icon, link }) => {
	return (
		<NavLink to={link} exact className="nav-item">
			{icon}
			<span className="item-name xl-visible">{name}</span>
		</NavLink>
	);
};

export default NavItem;
