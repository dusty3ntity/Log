import React, { useContext } from "react";
import { Link } from "react-router-dom";

import NavItem from "./NavItem";
import { RootStoreContext } from "../../app/stores/rootStore";
import Avatar from "../users/Avatar";
import Divider from "../common/other/Divider";
import ListIcon from "../common/icons/ListIcon";
import StatisticsIcon from "../common/icons/StatisticsIcon";
import SettingsIcon from "../common/icons/SettingsIcon";
import LogoutIcon from "../common/icons/LogoutIcon";

const NavBar: React.FC = ({ ...props }) => {
	const rootStore = useContext(RootStoreContext);
	const { user, logout } = rootStore.userStore;

	return (
		<div id="nav" {...props}>
			<div className="nav-header">
				<a href="/">
					<img className="logo" src="/images/logo.svg" alt="Logo" />
					<span className="title">Log.</span>
				</a>
			</div>

			<div className="nav-items">
				<NavItem type="link" link="/items-list" title="Items list" icon={<ListIcon className="nav-icon" />} />
				<NavItem
					type="link"
					link="/statistics"
					title="Statistics"
					icon={<StatisticsIcon className="nav-icon" />}
				/>

				<Divider className="nav-divider" invisible />

				<NavItem type="link" link="/settings" title="Settings" icon={<SettingsIcon className="nav-icon" />} />
				<NavItem type="button" onClick={logout} title="Log out" icon={<LogoutIcon className="nav-icon" />} />
			</div>

			<div className="nav-user-area">
				<Link to="/profile" className="profile-link">
					<Avatar
						type={user!.avatar ? "image" : "custom"}
						username={user!.displayName}
						imageLink={user!.avatar}
					/>
				</Link>

				<div className="username">{user!.displayName}</div>
			</div>
		</div>
	);
};

export default NavBar;
