import React from "react";

import { IComponentProps } from "../../../app/models/components";
import { combineClassNames } from "../../../app/common/util/classNames";

export interface ISwitchProps extends IComponentProps {
	checked?: boolean;
	onChange?: (value: boolean) => void;
}

const Switch: React.FC<ISwitchProps> = ({ id, className, checked, onChange, ...props }) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (onChange) {
			onChange(e.target.checked);
		}
	};

	return (
		<label id={id} className={combineClassNames("switch", className)} {...props}>
			<input type="checkbox" checked={checked} onChange={handleChange} />
			<span className="track">
				<span className="thumb" />
			</span>
		</label>
	);
};

export default Switch;
