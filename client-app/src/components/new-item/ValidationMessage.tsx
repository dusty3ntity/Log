import React from "react";
import { ErrorMessage } from "react-hook-form";

interface IProps {
	name: string;
	errors: any;
}

const ValidationMessage: React.FC<IProps> = ({ errors, name }) => {
	return (
		<ErrorMessage errors={errors} name={name}>
			{({ message }) => (
				<div className="validation-error">
					<p className="error-message">{message}</p>
				</div>
			)}
		</ErrorMessage>
	);
};

export default ValidationMessage;
