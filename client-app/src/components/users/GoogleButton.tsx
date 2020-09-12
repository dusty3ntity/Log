import React from "react";
import GoogleLogin from "react-google-login";

import { IProviderButtonProps } from "../../app/models/components";
import Button from "../common/inputs/Button";
import { createNotification } from "../../app/common/components/notifications";
import { NotificationType } from "../../app/models/error";
import GoogleIcon from "../common/icons/GoogleIcon";

const GoogleButton: React.FC<IProviderButtonProps> = ({ text, loading, onClick, disabled, ...props }) => {
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
			onSuccess={onClick}
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
					{...props}
				/>
			)}
		/>
	);
};

export default GoogleButton;
