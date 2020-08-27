import React from "react";

interface IProps {
	name: string;
	id?: string;
	classNames?: string[];
	checked: boolean;
	onChange: (value: boolean) => void;
}

const Switch: React.FC<IProps> = ({ name, classNames = [], id, checked, onChange, ...props }) => {
	classNames.unshift("switch");

	return (
		<label id={id} className={classNames.join(" ")} {...props}>
			<input name={name} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
			<span className="toggle"></span>
		</label>
	);
};

export default Switch;
