import React from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

import Button from "../common/inputs/Button";
import FacebookIcon from "../icons/FacebookIcon";

interface IProps {
	text: string;
	loading?: boolean;
	handler: (response: any) => void;
	disabled?: boolean;
}

const FacebookButton: React.FC<IProps> = ({ text, loading, handler, disabled }) => {
	return (
		<FacebookLogin
			appId="588857195154246"
			callback={handler}
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
