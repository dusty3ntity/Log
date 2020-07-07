import React from "react";
import { Drawer } from "antd";

import LanguagesList from "../LanguagesList";
import { ILanguage } from "../../../app/models/dictionary";

interface IProps {
	listId: string;
	listType: "known-language" | "language-to-learn";
	disabledItems: ILanguage[];
	selectedItem: ILanguage | undefined;
	className: string;
	reset: () => void;
	position: "left" | "right";
	isVisible: boolean;
	onClose: () => void;
	onItemSelect: (language: ILanguage) => void;
}

const LanguagesListDrawer: React.FC<IProps> = ({
	listId,
	listType,
	className,
	position,
	isVisible,
	onClose,
	disabledItems,
	selectedItem,
	onItemSelect,
	reset,
}) => {
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
			<LanguagesList
				id={listId}
				className="drawer-content"
				type={listType}
				reset={reset}
				disabledItems={disabledItems}
				selectedItem={selectedItem}
				onItemSelect={onItemSelect}
			/>
		</Drawer>
	);
};

export default LanguagesListDrawer;
