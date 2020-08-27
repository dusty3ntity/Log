import React, { useState } from "react";
import { default as Kek } from "react-rangeslider";

import "react-rangeslider/lib/index.css";

interface IProps {
	name: string;
	id?: string;
	classNames?: string[];
	step?: number;
	min?: number;
	max?: number;
}

const Slider: React.FC<IProps> = ({ name, classNames = [], id, min = 1, max = 100, step = 1, ...props }) => {
	classNames.unshift("slider");

	const [value, setValue] = useState(min);

	return (
		// <input
		// 	type="range"
		// 	id={id}
		// 	className={classNames.join(" ")}
		// 	name={name}
		// 	min={min}
		// 	max={max}
		// 	step={step}
		// 	{...props}
		// />

		<div className={classNames.join(" ")}>
			<Kek min={min} max={max} step={step} value={value}  tooltip={false} onChange={setValue} />
		</div>
	);
};

export default Slider;
