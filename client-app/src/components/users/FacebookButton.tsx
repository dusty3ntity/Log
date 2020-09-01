import React from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

import Button from "../common/inputs/Button";
import FacebookIcon from "../icons/FacebookIcon";
import { createNotification } from "../../app/common/util/notifications";
import { NotificationType } from "../../app/models/error";

interface IProps {
	text: string;
	loading?: boolean;
	handler: (response: any) => void;
	disabled?: boolean;
}

const FacebookButton: React.FC<IProps> = ({ text, loading, handler, disabled }) => {
	const onClick = (response: any) => {
		if (response.status === "unknown") {
			createNotification(NotificationType.Error, {
				title: "Authorization error!",
				message: "An authorization error occurred. Please, refresh the page or contact the administrator.",
				errorOrigin: "facebook-button",
			});
			return;
		}

		handler(response);
	};

	return (
		<FacebookLogin
			appId="588857195154246"
			callback={onClick}
			fields="name,email,picture"
			render={(renderProps: any) => (
				<Button
					className="facebook-btn provider-btn"
					text={text}
					loading={loading}
					disabled={disabled}
					icon={<FacebookIcon />}
					onClick={renderProps.onClick}
				/>
			)}
		/>
	);
};

export default FacebookButton;
