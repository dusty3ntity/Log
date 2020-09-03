import React, { ReactElement, useEffect, useState } from "react";

import Button from "../inputs/Button";
import { combineClassNames } from "../../../app/common/util/classNames";
import { IComponentProps } from "../../../app/models/components";

export interface IConfirmationModalProps extends IComponentProps {
	onConfirm: () => void;
	onCancel: () => void;
	content: ReactElement;
	confirmText: string;
}

const ConfirmationModal: React.FC<IConfirmationModalProps> = ({
	id,
	className,
	onConfirm,
	onCancel,
	content,
	confirmText,
	...props
}) => {
	const [animating, setAnimating] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setAnimating(true);
		}, 20);
	}, []);

	const handleClick = (func: () => void) => {
		setAnimating(false);
		setTimeout(func, 300);
	};

	return (
		<div
			id={id}
			className={combineClassNames("modal", "confirmation-modal", className, { initial: !animating })}
			{...props}
		>
			<div className="modal-mask" onClick={() => handleClick(onCancel)} />
			<div className="modal-content">
				<div className="modal-title">Confirmation</div>

				<div className="modal-body">{content}</div>

				<div className="modal-actions">
					<Button className="modal-btn cancel-btn" onClick={() => handleClick(onCancel)} text="Cancel" />
					<Button
						className={combineClassNames("modal-btn confirm-btn", `${confirmText.toLowerCase()}-btn`)}
						onClick={() => handleClick(onConfirm)}
						text={confirmText}
					/>
				</div>
			</div>
		</div>
	);
};

export default ConfirmationModal;
