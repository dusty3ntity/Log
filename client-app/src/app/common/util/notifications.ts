import React from "react";
import { toast } from "react-toastify";

import { NotificationType } from "./../../models/error";
import Notification from "../../../components/common/notifications/Notification";

interface IOptionalProps {
	title?: string;
	message?: string;
	errors?: string;
	className?: string;
}

export const createNotification = (type: NotificationType, options?: IOptionalProps) => {
	toast(
		React.createElement(Notification, {
			type: type,
			title: options?.title,
			message: options?.message,
			errors: options?.errors,
			className: options?.className,
		})
	);
};
