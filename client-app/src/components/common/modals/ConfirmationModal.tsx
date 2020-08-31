import React, { ReactElement, useEffect, useState } from "react";

import Button from "../inputs/Button";
import { combineClassNames } from "../../../app/common/util/classNames";

interface IProps {
	id?: string;
	classNames?: string[];
	onConfirm: () => void;
	onCancel: () => void;
	content: ReactElement;
	confirmText: string;
}

const ConfirmationModal: React.FC<IProps> = ({
	id,
	classNames = [],
	onConfirm,
	onCancel,
	content,
	confirmText,
	...props
}) => {
	classNames.unshift("modal confirmation-modal");

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
		<div id={id} className={combineClassNames(classNames, { initial: !animating })} {...props}>
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
