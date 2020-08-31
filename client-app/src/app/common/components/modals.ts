import React, { ReactElement } from "react";
import ReactDOM from "react-dom";

import ConfirmationModal from "../../../components/common/modals/ConfirmationModal";

export const createConfirmationModal = (content: ReactElement, confirmText: string, onConfirm: () => void) => {
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
			content: content,
			confirmText: confirmText,
			onConfirm: handleOnConfirm,
			onCancel: destroyModal,
		}),
		modalContainer
	);
};
