import React from "react";
import { Layout, Avatar, Button } from "antd";
import { Link } from "react-router-dom";

import NavItem from "./NavItem";
import DashboardIcon from "../icons/DashboardIcon";
import StatisticsIcon from "../icons/StatisticsIcon";
import CommunityIcon from "../icons/CommunityIcon";
import MyPacksIcon from "../icons/MyPacksIcon";
import SettingsIcon from "../icons/SettingsIcon";
import LogoutIcon from "../icons/LogoutIcon";

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
					<NavItem link="/dashboard" name="Dashboard" icon={<DashboardIcon classNames="nav-icon" />} />
					<NavItem link="/statistics" name="Statistics" icon={<StatisticsIcon classNames="nav-icon" />} />

					<div className="nav-divider" />

					<NavItem link="/community" name="Community" icon={<CommunityIcon classNames="nav-icon" />} />
					<NavItem link="/packs" name="My Packs" icon={<MyPacksIcon classNames="nav-icon" />} />

					<div className="nav-divider" />

					<NavItem link="/settings" name="Settings" icon={<SettingsIcon classNames="nav-icon" />} />
					<NavItem link="/logout" name="Logout" icon={<LogoutIcon classNames="nav-icon" />} />
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
