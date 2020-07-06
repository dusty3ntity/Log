import React from "react";
import { Drawer } from "antd";

import LanguagesList from "../LanguagesList";

interface IProps {
	listId: string;
	listType: "known-language" | "language-to-learn";
	className: string;
	position: "left" | "right";
	isVisible: boolean;
	onClose: () => void;
}

const LanguagesListDrawer: React.FC<IProps> = ({ listId, listType, className, position, isVisible, onClose }) => {
	const noShadowClass = !isVisible ? " no-shadow" : "";

	return (
		<Drawer
			className={`drawer new-dictionary-drawer ${className} ${noShadowClass}`}
			placement={position}
			closable={false}
			visible={isVisible}
			onClose={onClose}
			getContainer={false}
			style={{ position: "absolute" }}
		>
			<LanguagesList id={listId} className="drawer-content" type={listType} />
		</Drawer>
	);
};

export default LanguagesListDrawer;
