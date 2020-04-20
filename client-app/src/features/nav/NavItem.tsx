import React from "react";

interface IProps {
	name: string;
	icon: string;
	active?: boolean;
}

const NavItem: React.FC<IProps> = ({ name, icon, active = false }) => {
	const className = "nav-item" + (active ? " active" : "");

	return (
		<div className={className}>
			<i id={icon} className="material-icons nav-icon">
				{icon}
			</i>
			<span className="item-name">{name}</span>
			{active && <i className="material-icons arrow">keyboard_arrow_right</i>}
		</div>
	);
};

export default NavItem;
