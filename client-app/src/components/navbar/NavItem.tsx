import React from "react";
import { NavLink } from "react-router-dom";

interface IProps {
	link: string;
	id: string;
	name: string;
	icon: string;
}

const NavItem: React.FC<IProps> = ({ id, name, icon, link }) => {
	return (
		<NavLink to={link} exact id={id} className="nav-item">
			<i id={id + "-icon"} className="material-icons nav-icon">
				{icon}
			</i>
			<span className="item-name xl-visible">{name}</span>
		</NavLink>
	);
};

export default NavItem;
