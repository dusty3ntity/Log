import React from "react";
import { default as RangeSlider } from "react-rangeslider";

interface IProps {
	name: string;
	id?: string;
	classNames?: string[];
	step?: number;
	min?: number;
	max?: number;
	value: number;
	onChange: (value: number) => void;
}

const Slider: React.FC<IProps> = ({
	name,
	classNames = [],
	id,
	min = 1,
	max = 100,
	step = 1,
	value,
	onChange,
	...props
}) => {
	classNames.unshift("slider");

	return (
		<div className={classNames.join(" ")} {...props}>
			<RangeSlider min={min} max={max} step={step} value={value} tooltip={false} onChange={onChange} />
		</div>
	);
};

export default Slider;
