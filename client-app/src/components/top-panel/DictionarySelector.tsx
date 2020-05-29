import React from "react";
import { Menu, Dropdown } from "antd";

const menu = (
	<Menu>
		<Menu.Item key="0">
			<img id="lang-from" src="/images/flags/en.png" alt="Lang from" />
			<img id="lang-to" src="/images/flags/ru.png" alt="Lang to" />
		</Menu.Item>
		<Menu.Divider />
		<Menu.Item key="new">Create new</Menu.Item>
	</Menu>
);

const DictionarySelector = () => {
	return (
		<Dropdown
			overlay={menu} 
			trigger={["click"]} 
			placement="bottomCenter"
			overlayClassName="dictionary-selector-dropdown"
		>
			<div id="dictionary-selector">
				<img id="lang-from" src="/images/flags/ru.png" alt="Lang from" />
				<img id="lang-to" src="/images/flags/en.png" alt="Lang to" />
				<i id="arrow" className="material-icons arrow">
					keyboard_arrow_down
				</i>
			</div>
		</Dropdown>
	);
};

export default DictionarySelector;
