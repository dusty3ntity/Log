import React from "react";
import copy from "copy-to-clipboard";

import InfoIcon from "../../icons/InfoIcon";
import SuccessIcon from "../../icons/SuccessIcon";
import WarningOutlinedIcon from "../../icons/WarningOutlinedIcon";
import CopyIcon from "../../icons/CopyIcon";
import ErrorIcon from "../../icons/ErrorIcon";
import { NotificationType } from "../../../app/models/error";
import { createCustomError } from "../../../app/common/util/errors";
import Button from "../inputs/Button";

interface IProps {
	className?: string;
	type: NotificationType;
	title?: string;
	message?: string;
	error?: any;
	errorOrigin?: string;
}

const Notification: React.FC<IProps> = ({ className, type, title, message, error, errorOrigin }) => {
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
		if (error) {
			message = "Please, copy the data (the button above) and send it to the administrator for a quick fix.";
		} else {
			message = "An unknown error occurred... Please, refresh the page or contact the administrator.";
		}
	}

	if (error) {
		error = createCustomError(error);
	}

	if (!error && errorOrigin) {
		error = errorOrigin;
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
				<div className="title-container">
					<span className="title">{title}</span>
					{(error || errorOrigin) && (
						<Button
							className="copy-err-btn"
							onClick={() => copy(JSON.stringify(error, null, "\t"))}
							icon={<CopyIcon />}
						/>
					)}
				</div>
				<div className="message">{message}</div>
			</div>
		</div>
	);
};

export default Notification;
