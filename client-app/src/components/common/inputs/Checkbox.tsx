import React from "react";

import CheckIcon from "../../icons/CheckIcon";

interface IProps {
	id?: string;
	classNames?: string[];
	checked?: boolean;
	onChange?: (value: boolean) => void;
	disabled?: boolean;
}

const Checkbox: React.FC<IProps> = ({ classNames = [], id, checked, onChange, disabled, children, ...props }) => {
	classNames.unshift("checkbox-wrapper");

	const handleChange = (e: any) => {
		if (onChange) {
			onChange(e.target.checked);
		}
	};

	return (
		<label id={id} className={classNames.join(" ")} {...props}>
			<input type="checkbox" checked={checked} disabled={disabled} onChange={handleChange} />
			<span className="checkbox">
				<CheckIcon className="check" />
			</span>

			<span className="checkbox-content">{children}</span>
		</label>
	);
};

export default Checkbox;
