import React from "react";
import GoogleLogin from "react-google-login";

import Button from "../common/inputs/Button";
import GoogleIcon from "../icons/GoogleIcon";
import { createNotification } from "../../app/common/util/notifications";
import { NotificationType } from "../../app/models/error";

interface IProps {
	text: string;
	loading?: boolean;
	handler: (response: any) => void;
	disabled?: boolean;
}

const GoogleButton: React.FC<IProps> = ({ text, loading, handler, disabled }) => {
	const onFailure = () => {
		createNotification(NotificationType.Error, {
			title: "Authorization error!",
			message: "An authorization error occurred. Please, refresh the page or contact the administrator.",
			errorOrigin: "google-button",
		});
	};

	return (
		<GoogleLogin
			clientId="419705102336-401ps735smi8pvo6u48ghmcsphuup0un.apps.googleusercontent.com"
			onSuccess={handler}
			onFailure={onFailure}
			responseType="code"
			cookiePolicy={"none"}
			render={(renderProps: any) => (
				<Button
					className="google-btn provider-btn"
					text={text}
					icon={<GoogleIcon />}
					loading={loading}
					disabled={disabled}
					onClick={renderProps.onClick}
				/>
			)}
		/>
	);
};

export default GoogleButton;
