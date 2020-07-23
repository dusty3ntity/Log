import React, { ReactNode } from "react";

import LoadingIndicator from "../loading/LoadingIndicator";
import { fireAnalyticsEvent } from "../../../app/common/analytics/analytics";

interface IProps {
	type?: "button" | "submit" | "reset";
	className?: string;
	primary?: boolean;
	icon?: ReactNode;
	text?: string;
	active?: boolean;
	onClick?: () => any;
	disabled?: boolean;
	noDisabledStyles?: boolean;
	loading?: boolean;
	rightIcon?: ReactNode;

	analyticsEnabled?: boolean;
	analyticsCategory?: string;
	analyticsAction?: string;
	analyticsLabel?: string;
	analyticsValue?: number;
}

const Button: React.FC<IProps> = ({
	type,
	className,
	primary,
	icon,
	text,
	active,
	disabled,
	noDisabledStyles,
	onClick,
	loading,
	rightIcon,

	analyticsEnabled,
	analyticsCategory,
	analyticsAction,
	analyticsLabel,
	analyticsValue,
}) => {
	const classNames = ["btn"];

	if (primary) {
		classNames.push("primary");
	}

	if (icon && !text) {
		classNames.push("round");
	}

	if (className) {
		classNames.push(className);
	}

	if (active) {
		classNames.push("active");
	}

	if (noDisabledStyles) {
		classNames.push("no-disabled-styles");
	}

	const handleClick = () => {
		if (analyticsEnabled) {
			fireAnalyticsEvent(analyticsCategory!, analyticsAction!, analyticsLabel, analyticsValue);
		}

		onClick!();
	};

	return (
		<button
			className={classNames.join(" ")}
			type={type ? type : "button"}
			disabled={disabled || loading}
			onClick={onClick ? handleClick : undefined}
		>
			{!loading ? icon : <LoadingIndicator type="small" />}
			{text && <span>{text}</span>}
			{rightIcon}
		</button>
	);
};

export default Button;
