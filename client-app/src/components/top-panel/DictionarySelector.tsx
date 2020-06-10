import React from "react";
import { Menu, Dropdown, Divider, Button } from "antd";

const menu = (
	<Menu>
		<Menu.Item key="0" className="menu-item">
			<img className="flag lang-from" src="/images/flags/ua.png" alt="Lang from" />
			<i className="material-icons arrow">arrow_forward</i>
			<img className="flag lang-to" src="/images/flags/en.png" alt="Lang to" />

			<Divider className="menu-divider" type="vertical" />

			<span className="items-counter">273</span>
		</Menu.Item>

		<Menu.Item key="1" className="menu-item">
			<img className="flag lang-from" src="/images/flags/en.png" alt="Lang to" />

			<i className="material-icons arrow">arrow_forward</i>
			<img className="flag lang-to" src="/images/flags/ru.png" alt="Lang from" />

			<Divider className="menu-divider" type="vertical" />

			<span className="items-counter">4921</span>
		</Menu.Item>
		
		<div id="menu-actions">
			<Button id="new-btn" className="actions-btn" href="#">
				<i className="material-icons">add</i>
			</Button>

			<Button id="edit-btn" className="actions-btn" href="#">
				<i className="material-icons">edit</i>
			</Button>
		</div>
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
				<img className="flag lang-from" src="/images/flags/ru.png" alt="Lang from" />
				<i className="material-icons arrow">arrow_forward</i>
				<img className="flag lang-to" src="/images/flags/en.png" alt="Lang to" />
				<i id="arrow-dropdown" className="material-icons">
					play_arrow
				</i>
			</div>
		</Dropdown>
	);
};

export default DictionarySelector;
