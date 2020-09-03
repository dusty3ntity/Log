import React from "react";
import { ErrorMessage } from "react-hook-form";

export interface IValidationMessageProps {
	inputName: string;
	errors: any;
}

const ValidationMessage: React.FC<IValidationMessageProps> = ({ errors, inputName, ...props }) => {
	return (
		<ErrorMessage errors={errors} name={inputName}>
			{({ message }) => (
				<div className="validation-error" {...props}>
					<p className="error-message">{message}</p>
				</div>
			)}
		</ErrorMessage>
	);
};

export default ValidationMessage;
