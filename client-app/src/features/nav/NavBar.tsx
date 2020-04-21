import React from "react";
import { Container, Button } from "semantic-ui-react";
import NavItem from "./NavItem";

const NavBar = () => {
	return (
		<Container id="navbar">
			<div id="header">
				<img id="logo" src="/images/logo.svg" alt="Logo" />
				<span id="title">Log.</span>
			</div>

			<NavItem name={"Dashboard"} icon="dashboard" active />
			<NavItem name={"Statistics"} icon="timeline" />

			<div className="divider" />

			<NavItem name={"Community"} icon="people" />
			<NavItem name={"My Packs"} icon="view_column" />

			<div className="divider" />

			<NavItem name={"Settings"} icon="settings" />
			<NavItem name={"Logout"} icon="power_settings_new" />

			<div id="user-area">
				<img id="avatar" src="/images/temp/user.jpg" alt="Avatar" />
				<span id="username">Vadym Ohyr</span>
				<Button id="upgrade-btn" content="Upgrade" />
			</div>
		</Container>
	);
};

export default NavBar;
