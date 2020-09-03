import React from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

import { IProviderButtonProps } from "../../app/models/components";
import Button from "../common/inputs/Button";
import { createNotification } from "../../app/common/components/notifications";
import { NotificationType } from "../../app/models/error";
import FacebookIcon from "../common/icons/FacebookIcon";

const FacebookButton: React.FC<IProviderButtonProps> = ({ text, loading, onClick, disabled, ...props }) => {
	const handleClick = (response: any) => {
		if (response.status === "unknown") {
			createNotification(NotificationType.Error, {
				title: "Authorization error!",
				message: "An authorization error occurred. Please, refresh the page or contact the administrator.",
				errorOrigin: "facebook-button",
			});
			return;
		}

		onClick(response);
	};

	return (
		<FacebookLogin
			appId="588857195154246"
			callback={handleClick}
			fields="name,email,picture"
			render={(renderProps: any) => (
				<Button
					className="facebook-btn provider-btn"
					text={text}
					loading={loading}
					disabled={disabled}
					icon={<FacebookIcon />}
					onClick={renderProps.onClick}
					{...props}
				/>
			)}
		/>
	);
};

export default FacebookButton;
