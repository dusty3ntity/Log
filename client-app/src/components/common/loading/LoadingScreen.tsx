import React from "react";

import LoadingIndicator from "./LoadingIndicator";
import { IComponentProps } from "../../../app/models/components";
import { combineClassNames } from "../../../app/common/util/classNames";

export interface ILoadingScreenProps extends IComponentProps {
	size: number;
}

const LoadingScreen: React.FC<ILoadingScreenProps> = ({ id, className, size, ...props }) => {
	return (
		<div id={id} className={combineClassNames("loading-screen", className)} {...props}>
			<LoadingIndicator type="big" size={size} />

			<span className="title" style={{ fontSize: `${size / 1.5}rem` }}>
				Loading...
			</span>
		</div>
	);
};

export default LoadingScreen;
