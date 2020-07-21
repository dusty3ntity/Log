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
				{getInitials(username)}
			</div>
		);
	}

	return (
		<div className="avatar">
			<img src={imageLink} alt={username} />
		</div>
	);
};

export default Avatar;
