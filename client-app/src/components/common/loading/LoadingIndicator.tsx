import React from "react";

import { IComponentProps } from "../../../app/models/components";
import { combineClassNames } from "../../../app/common/util/classNames";

export interface ILoadingIndicatorProps extends IComponentProps {
	type: "small" | "big";
	size?: number;
}

const LoadingIndicator: React.FC<ILoadingIndicatorProps> = ({ id, className, type, size, ...props }) => {
	if (type === "small") {
		return (
			<svg
				id={id}
				className={combineClassNames("icon", "loading-indicator-small", className)}
				viewBox="0 0 50 50"
				{...props}
			>
				<path d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z" />
			</svg>
		);
	}

	return (
		<div id={id} className={combineClassNames("loading-indicator-big", className)} {...props}>
			<div className="bounce1" style={{ width: `${size}rem`, height: `${size}rem` }} />
			<div className="bounce2" style={{ width: `${size}rem`, height: `${size}rem` }} />
			<div className="bounce3" style={{ width: `${size}rem`, height: `${size}rem` }} />
		</div>
	);
};

export default LoadingIndicator;
