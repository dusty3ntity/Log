import React from "react";

import InfoIcon from "../../icons/InfoIcon";
import SuccessIcon from "../../icons/SuccessIcon";
import WarningOutlinedIcon from "../../icons/WarningOutlinedIcon";
import ErrorIcon from "../../icons/ErrorIcon";
import { NotificationType } from "../../../app/models/error";

interface IProps {
	className?: string;
	type: NotificationType;
	title?: string;
	message?: string;
	errors?: any;
}

const Notification: React.FC<IProps> = ({ className, type, title, message, errors }) => {
	if (!title) {
		switch (type) {
			case NotificationType.Info:
				title = "Information";
				break;
			case NotificationType.Success:
				title = "Success!";
				break;
			case NotificationType.Warning:
				title = "Warning!";
				break;
			case NotificationType.Error:
				title = "Error!";
				break;
			case NotificationType.UnknownError:
				title = "Unknown error!";
				break;
		}
	}

	if (type === NotificationType.UnknownError) {
		message = "Please, copy this data and send it to the administrator for a quick fix.";
	}
	
	return (
		<div className={`notification ${className ? className : ""}`}>
			<div className="icon-container">
				{type === NotificationType.Info && <InfoIcon />}
				{type === NotificationType.Success && <SuccessIcon />}
				{type === NotificationType.Warning && <WarningOutlinedIcon />}
				{(type === NotificationType.Error || type === NotificationType.UnknownError) && <ErrorIcon />}
			</div>

			<div className="content-container">
				<div className="title">{title}</div>
				<div className="message">
					{message}
				</div>
			</div>
		</div>
	);
};

export default Notification;