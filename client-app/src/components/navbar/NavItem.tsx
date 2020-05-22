import React from "react";
import { NavLink } from "react-router-dom";

interface IProps {
	link: string;
	id: string;
	name: string;
	icon: string;
}

const NavItem: React.FC<IProps> = ({ id, name, icon, link }) => {
	// const className = "nav-item" + (active ? " active" : "");

	return (
		<NavLink to={link} exact id={id} className={"nav-item"}>
			<i id={id + "-icon"} className="material-icons nav-icon">
				{icon}
			</i>
			<span className="item-name lg-hidden">{name}</span>
			{/* {active && <i className="material-icons arrow lg-hidden">keyboard_arrow_right</i>} */}
		</NavLink>
	);
};

export default NavItem;
