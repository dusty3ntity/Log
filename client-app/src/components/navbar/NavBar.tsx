import React from "react";
import { Layout } from "antd";
import NavItem from "./NavItem";

const { Sider } = Layout;

const NavBar = () => {
	return (
		<Sider id="nav" width={"12.5vw"} trigger={null} collapsible breakpoint={"xl"}>
			<div id="nav-header">
				<img id="nav-logo" src="/images/logo.svg" alt="Logo" />
				<span id="nav-title" className="lg-hidden">Log.</span>
			</div>

			<NavItem id="nav-dashboard" name={"Dashboard"} icon="dashboard" active />
			<NavItem id="nav-statistics" name={"Statistics"} icon="timeline" />

			<div className="nav-divider" />

			<NavItem id="nav-community" name={"Community"} icon="people" />
			<NavItem id="nav-my-packs" name={"My Packs"} icon="view_column" />

			<div className="nav-divider" />

			<NavItem id="nav-settings" name={"Settings"} icon="settings" />
			<NavItem id="nav-logout" name={"Logout"} icon="power_settings_new" />

			<div id="nav-user-area">
				<img id="nav-avatar" src="/images/temp/avatar.jpg" alt="Avatar" />
				<span id="nav-username" className="lg-hidden">Vadym Ohyr</span>
				<a id="nav-upgrade-btn" className="lg-hidden" href="/">Upgrade</a>
			</div>
		</Sider>
	);
};

export default NavBar;
