import React, { useRef, useEffect, ReactNode } from "react";

import { combineClassNames } from "../../../app/common/util/classNames";
import { IComponentProps } from "../../../app/models/components";
import DropdownIcon from "../icons/DropdownIcon";

export interface IDropdownProps extends IComponentProps {
	expanded: boolean;
	onClick: (value?: boolean) => void;

	buttonContent: ReactNode;
	menuContent: ReactNode;
}

const Dropdown: React.FC<IDropdownProps> = ({
	id,
	className,

	expanded,
	onClick,

	buttonContent,
	menuContent,
	...props
}) => {
	const buttonRef = useRef<HTMLDivElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (e: any) => {
			if (
				menuRef.current &&
				buttonRef.current &&
				!menuRef.current.contains(e.target) &&
				!buttonRef.current.contains(e.target)
			) {
				onClick(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [onClick]);

	return (
		<div
			id={id}
			className={combineClassNames("dropdown", className, {
				"dropdown-open": expanded,
				"dropdown-closed": !expanded,
			})}
			{...props}
		>
			<div className="dropdown-button btn" ref={buttonRef} onClick={() => onClick()}>
				<div className="button-content-wrapper">
					{buttonContent}

					<DropdownIcon />
				</div>
			</div>

			<div className="dropdown-menu" ref={menuRef}>
				{menuContent}
			</div>
		</div>
	);
};

export default Dropdown;
