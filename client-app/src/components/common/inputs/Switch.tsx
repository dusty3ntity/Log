import React from "react";

interface IProps {
	name: string;
	ref?: string | ((instance: HTMLInputElement | null) => void) | React.RefObject<HTMLInputElement>;
	id?: string;
	classNames?: string[];
}

const Switch: React.FC<IProps> = ({ name, classNames = [], id, ref, ...props }) => {
	classNames.unshift("switch");

	return (
		<label id={id} className={classNames.join(" ")} {...props}>
			<input name={name} type="checkbox" ref={ref} />
			<span className="toggle"></span>
		</label>
	);
};

export default Switch;
