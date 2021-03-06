import React, { ReactNode } from "react";

import LoadingIndicator from "../loading/LoadingIndicator";
import { IComponentProps } from "../../../app/models/components";
import { combineClassNames } from "../../../app/common/util/classNames";

export interface IButtonProps extends IComponentProps {
	type?: "button" | "submit" | "reset";
	primary?: boolean;
	icon?: ReactNode;
	text?: string;
	textClassName?: string;

	active?: boolean;
	loading?: boolean;
	disabled?: boolean;
	onClick?: () => void;

	noDisabledStyles?: boolean;
	rightIcon?: ReactNode;
}

const Button: React.FC<IButtonProps> = ({
	id,
	className,

	type = "button",
	primary,
	icon,
	text,
	textClassName,

	active,
	loading,
	disabled,
	onClick,

	noDisabledStyles,
	rightIcon,

	children,
	...props
}) => {
	function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
		if (!onClick) {
			return undefined;
		}

		e.stopPropagation();
		onClick();
	}

	return (
		<button
			id={id}
			className={combineClassNames("btn", className, {
				primary: primary,
				round: icon && !text,
				active: active,
				"no-disabled-styles": noDisabledStyles,
			})}
			type={type}
			disabled={disabled || loading}
			onClick={handleClick}
			{...props}
		>
			{!loading ? icon : <LoadingIndicator type="small" />}
			{text && <span className={combineClassNames(textClassName)}>{text}</span>}
			{children}
			{rightIcon}
		</button>
	);
};

export default Button;
