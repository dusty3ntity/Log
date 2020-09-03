import React from "react";
import ReactDOM from "react-dom";

import { IComponentProps } from "./../../models/components";
import ConfirmationModal from "../../../components/common/modals/ConfirmationModal";

export const createConfirmationModal = (
	content: React.ReactElement,
	confirmText: string,
	onConfirm: () => void,
	options?: IComponentProps
) => {
	const modalContainer = document.createElement("div");
	document.body.appendChild(modalContainer);

	const handleOnConfirm = () => {
		onConfirm();
		destroyModal();
	};

	const destroyModal = () => {
		const unmountResult = ReactDOM.unmountComponentAtNode(modalContainer);
		if (unmountResult && modalContainer.parentNode) {
			modalContainer.parentNode.removeChild(modalContainer);
		}
	};

	ReactDOM.render(
		React.createElement(ConfirmationModal, {
			onConfirm: handleOnConfirm,
			onCancel: destroyModal,
			content: content,
			confirmText: confirmText,
			...options,
		}),
		modalContainer
	);
};
