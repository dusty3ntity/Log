import React from "react";

interface IProps {
	id?: string;
	classNames?: string[];
	checked?: boolean;
	onChange?: (value: boolean) => void;
}

const Switch: React.FC<IProps> = ({ classNames = [], id, checked, onChange, ...props }) => {
	classNames.unshift("switch");

	const handleChange = (e: any) => {
		if (onChange) {
			onChange(e.target.checked);
		}
	};

	return (
		<label id={id} className={classNames.join(" ")} {...props}>
			<input type="checkbox" checked={checked} onChange={handleChange} />
			<span className="track">
				<span className="thumb" />
			</span>
		</label>
	);
};

export default Switch;
