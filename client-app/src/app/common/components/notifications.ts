import React from "react";
import { toast } from "react-toastify";

import { NotificationType } from "../../models/error";
import Notification from "../../../components/common/notifications/Notification";
import { IComponentProps } from "./../../models/components";

export interface INotificationOptionsProps extends IComponentProps {
	title?: string;
	message?: string;
	error?: any;
	errorOrigin?: string;
}

export const createNotification = (type: NotificationType, options?: INotificationOptionsProps) => {
	toast(
		React.createElement(Notification, {
			type: type,
			...options,
		})
	);
};
