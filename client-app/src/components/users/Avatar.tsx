import React from "react";

import { getInitials, getStyles } from "../../app/common/components/avatars";
import { IComponentProps } from "../../app/models/components";
import { combineClassNames } from "../../app/common/util/classNames";

export interface IAvatarProps extends IComponentProps {
	type: "image" | "custom";
	username: string;
	imageLink?: string;
}

const Avatar: React.FC<IAvatarProps> = ({ id, className, type, username, imageLink, ...props }) => {
	if (type === "custom") {
		return (
			<div
				id={id}
				className={combineClassNames("avatar custom-avatar", className)}
				style={getStyles(username)}
				{...props}
			>
				<span className="avatar-text">{getInitials(username)}</span>
			</div>
		);
	}

	return (
		<div id={id} className={combineClassNames("avatar", className)} {...props}>
			<img src={imageLink} alt="Avatar" />
		</div>
	);
};

export default Avatar;
