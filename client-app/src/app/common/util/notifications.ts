import React from "react";
import { toast } from "react-toastify";

import { NotificationType } from "./../../models/error";
import Notification from "../../../components/common/notifications/Notification";

interface IOptionalProps {
	title?: string;
	message?: string;
	error?: any;
	errorOrigin?: string;
	className?: string;

	analyticsErrorDescription?: string;
	fatalError?: boolean;
}

export const createNotification = (type: NotificationType, options?: IOptionalProps) => {
	toast(
		React.createElement(Notification, {
			type: type,
			title: options?.title,
			message: options?.message,
			error: options?.error,
			errorOrigin: options?.errorOrigin,
			className: options?.className,

			analyticsErrorDescription: options?.analyticsErrorDescription,
			fatalError: options?.fatalError,
		})
	);
};
