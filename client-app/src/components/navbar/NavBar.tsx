import React from "react";
import { Layout, Avatar, Button } from "antd";
import { Link } from "react-router-dom";
import NavItem from "./NavItem";

const { Sider } = Layout;

const NavBar = () => {
	return (
		<Sider id="nav-sider" width={"12.5vw"} trigger={null} collapsible breakpoint={"xxl"}>
			<div id="nav">
				<div id="nav-header">
					<Link to="/">
						<img id="nav-logo" src="/images/logo.svg" alt="Logo" />
						<span id="nav-title" className="xl-visible">
							Log.
						</span>
					</Link>
				</div>

				<div id="nav-items">
					<NavItem link="/dashboard" id="nav-dashboard" name={"Dashboard"} icon="dashboard" />
					<NavItem link="/statistics" id="nav-statistics" name={"Statistics"} icon="timeline" />

					<div className="nav-divider" />

					<NavItem link="/community" id="nav-community" name={"Community"} icon="people" />
					<NavItem link="/packs" id="nav-my-packs" name={"My Packs"} icon="view_column" />

					<div className="nav-divider" />

					<NavItem link="/settings" id="nav-settings" name={"Settings"} icon="settings" />
					<NavItem link="/logout" id="nav-logout" name={"Logout"} icon="power_settings_new" />
				</div>

				<div id="nav-user-area">
					<div id="user-area-content">
						<Link to="/profile" id="profile-link">
							<Avatar className="nav-avatar" src="/images/temp/avatar.png" alt={"Account name"} />
						</Link>
						<div id="nav-username" className="xl-visible">
							Vadym Ohyr
						</div>
						<Button id="nav-upgrade-btn" className="xl-visible" type="link" href="/">
							Upgrade
						</Button>
					</div>
				</div>
			</div>
		</Sider>
	);
};

export default NavBar;
