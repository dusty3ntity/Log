import React from "react";

interface IProps {
	id: string;
	name: string;
	icon: string;
	active?: boolean;
}

const NavItem: React.FC<IProps> = ({ id, name, icon, active = false }) => {
	const className = "nav-item" + (active ? " active" : "");

	return (
		<a id={id} className={className} href="/">
			<i id={id + "-icon"} className="material-icons nav-icon">
				{icon}
			</i>
			<span className="item-name lg-hidden">{name}</span>
			{active && <i className="material-icons arrow lg-hidden">keyboard_arrow_right</i>}
		</a>
	);
};

export default NavItem;
