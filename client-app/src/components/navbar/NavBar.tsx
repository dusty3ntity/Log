import React from "react";
import { Layout, Avatar } from "antd";
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
				<div className="nav-header">
					<Link to="/">
						<img className="logo xl-hidden" src="/images/logo.svg" alt="Logo" />
						<span className="title xl-visible">Log.</span>
					</Link>
				</div>

				<div className="nav-items">
					<NavItem link="/dashboard" name="Dashboard" icon={<DashboardIcon classNames="nav-icon" />} />
					<NavItem link="/statistics" name="Statistics" icon={<StatisticsIcon classNames="nav-icon" />} />

					<div className="nav-divider" />

					<NavItem link="/community" name="Community" icon={<CommunityIcon classNames="nav-icon" />} />
					<NavItem link="/packs" name="My Packs" icon={<MyPacksIcon classNames="nav-icon" />} />

					<div className="nav-divider" />

					<NavItem link="/settings" name="Settings" icon={<SettingsIcon classNames="nav-icon" />} />
					<NavItem link="/logout" name="Logout" icon={<LogoutIcon classNames="nav-icon" />} />
				</div>

				<div className="nav-user-area">
					<Link to="/profile" className="profile-link">
						<Avatar className="avatar" src="/images/temp/avatar.png" alt={"Account name"} />
					</Link>
					<div className="username xl-visible">Vadym Ohyr</div>
					<Link to="/" className="btn upgrade-btn xl-visible">
						Upgrade
					</Link>
				</div>
			</div>
		</Sider>
	);
};

export default NavBar;
