import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "antd";

import NavItem from "./NavItem";
import DashboardIcon from "../icons/DashboardIcon";
import StatisticsIcon from "../icons/StatisticsIcon";
import CommunityIcon from "../icons/CommunityIcon";
import MyPacksIcon from "../icons/MyPacksIcon";
import SettingsIcon from "../icons/SettingsIcon";
import LogoutIcon from "../icons/LogoutIcon";
import { RootStoreContext } from "../../app/stores/rootStore";

const NavBar = () => {
	const rootStore = useContext(RootStoreContext);
	const { user, logout } = rootStore.userStore;

	return (
		<div id="nav">
			<div className="nav-header">
				<Link to="/">
					<img className="logo xxl-hidden" src="/images/logo.svg" alt="Logo" />
					<span className="title xxl-visible">Log.</span>
				</Link>
			</div>

			<div className="nav-items">
				<NavItem link="/dashboard" name="Dashboard" icon={<DashboardIcon classNames="nav-icon" />} />
				<NavItem link="/statistics" name="Statistics" icon={<StatisticsIcon classNames="nav-icon" />} />

				<div className="divider invisible nav-divider" />

				<NavItem link="/community" name="Community" icon={<CommunityIcon classNames="nav-icon" />} />
				<NavItem link="/packs" name="My Packs" icon={<MyPacksIcon classNames="nav-icon" />} />

				<div className="divider invisible nav-divider" />

				<NavItem link="/settings" name="Settings" icon={<SettingsIcon classNames="nav-icon" />} />
				<NavItem button onClick={logout} name="Logout" icon={<LogoutIcon classNames="nav-icon" />} />
			</div>

			<div className="nav-user-area">
				<Link to="/profile" className="profile-link">
					<Avatar className="avatar" src="/images/temp/avatar.png" alt={user!.displayName} />
				</Link>
				<div className="username xxl-visible">{user!.displayName}</div>
				<Link to="/" className="btn upgrade-btn xxl-visible">
					Upgrade
				</Link>
			</div>
		</div>
	);
};

export default NavBar;
