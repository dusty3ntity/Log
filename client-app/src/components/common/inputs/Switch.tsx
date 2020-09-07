import React from "react";

import { IComponentProps } from "../../../app/models/components";
import { combineClassNames } from "../../../app/common/util/classNames";

export interface ISwitchProps extends IComponentProps {
	name?: string;
	checked?: boolean;
	onChange?: (value: boolean) => void;
}

const Switch = React.forwardRef<HTMLInputElement, ISwitchProps>(
	({ id, className, name, checked, onChange, ...props }, ref) => {
		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			if (onChange) {
				onChange(e.target.checked);
			}
		};

		return (
			<label id={id} className={combineClassNames("switch", className)} {...props}>
				<input type="checkbox" name={name} ref={ref} checked={checked} onChange={handleChange} />
				<span className="track">
					<span className="thumb" />
				</span>
			</label>
		);
	}
);

export default Switch;
