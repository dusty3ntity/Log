import React from "react";

import { IComponentProps } from "../../../app/models/components";
import { combineClassNames } from "../../../app/common/util/classNames";
import CheckIcon from "../icons/CheckIcon";

export interface ICheckboxProps extends IComponentProps {
	checked?: boolean;
	onChange?: (value: boolean) => void;
	disabled?: boolean;
}

const Checkbox: React.FC<ICheckboxProps> = ({ id, className, checked, onChange, disabled, children, ...props }) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (onChange) {
			onChange(e.target.checked);
		}
	};

	return (
		<label id={id} className={combineClassNames("checkbox-wrapper", className)} {...props}>
			<input type="checkbox" checked={checked} disabled={disabled} onChange={handleChange} />
			<span className="checkbox">
				<CheckIcon className="check" />
			</span>

			<span className="checkbox-content">{children}</span>
		</label>
	);
};

export default Checkbox;
