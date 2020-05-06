import React from "react";
import { Input, Form } from "antd";

interface IProps {
	id?: string;
	className?: string;
	value: string;
	autoFocus?: boolean;
	name: string;
}

const EditInput: React.FC<IProps> = ({ id, value, autoFocus, className, name }) => {
	return (
		<Form.Item name={name} rules={[{ required: true }]} initialValue={value}>
			<Input id={id} className={`edit-input ${className}`} autoFocus={autoFocus} />
		</Form.Item>
	);
};

export default EditInput;
