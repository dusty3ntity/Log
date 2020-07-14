import React from "react";

import { getInitials, getStyles } from "../../app/common/util/avatars";

interface IProps {
	username: string;
}

const Avatar: React.FC<IProps> = ({ username }) => {
	return (
		<div className="avatar" style={getStyles(username)}>
			{getInitials(username)}
		</div>
	);
};

export default Avatar;
