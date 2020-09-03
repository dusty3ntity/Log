import React from "react";
import { default as RangeSlider } from "react-rangeslider";

import { IComponentProps } from "../../../app/models/components";
import { combineClassNames } from "../../../app/common/util/classNames";

export interface ISliderProps extends IComponentProps {
	step?: number;
	min?: number;
	max?: number;
	value?: number;
	onChange?: (value: number) => void;
}

const Slider: React.FC<ISliderProps> = ({ id, className, min, max, step, value, onChange, ...props }) => {
	return (
		<div id={id} className={combineClassNames("slider", className)} {...props}>
			<RangeSlider
				min={min || 1}
				max={max || 100}
				step={step || 1}
				value={value}
				tooltip={false}
				onChange={onChange}
			/>
		</div>
	);
};

export default Slider;
