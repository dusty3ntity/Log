import React from "react";

import { getInitials, getStyles } from "../../app/common/util/avatars";

interface IProps {
	type: "image" | "custom";
	username: string;
	imageLink?: string;
}

const Avatar: React.FC<IProps> = ({ type, username, imageLink }) => {
	if (type === "custom") {
		return (
			<div className="avatar" style={getStyles(username)}>
				<span className="avatar-text">{getInitials(username)}</span>
			</div>
		);
	}

	return (
		<div className="avatar">
			<img src={imageLink} alt="avatar" />
		</div>
	);
};

export default Avatar;
