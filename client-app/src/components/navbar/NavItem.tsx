import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

interface IProps {
	link?: string;
	button?: boolean;
	onClick?: () => void;
	name: string;
	icon: JSX.Element;
}

const NavItem: React.FC<IProps> = ({ name, button, onClick, icon, link }) => {
	return (
		<Fragment>
			{link && (
				<NavLink to={link} exact className="nav-item">
					{icon}
					<span className="item-name">{name}</span>
				</NavLink>
			)}
			{button && (
				<button className="nav-item nav-item-btn" onClick={onClick}>
					{icon}
					<span className="item-name">{name}</span>
				</button>
			)}
		</Fragment>
	);
};

export default NavItem;
