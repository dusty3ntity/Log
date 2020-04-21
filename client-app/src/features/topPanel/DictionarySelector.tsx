import React from "react";
import { Button, Dropdown, DropdownDivider } from "semantic-ui-react";

const DictionarySelector = () => {
	return (
		<Button.Group id="dictionary-selector">
			<Button id="selected-dictionary">
				<img id="lang-from" src="/images/flags/ru-ru.png" alt="Lang from" />
				<img id="lang-to" src="/images/flags/en-us.png" alt="Lang to" />
			</Button>
			<Dropdown
				id="dropdown"
				className="button icon"
				scrolling
				icon={
					<i id="arrow" className="material-icons arrow">
						keyboard_arrow_right
					</i>
				}
			>
				<Dropdown.Menu>
					<Dropdown.Item>
						<img id="lang-from" src="/images/flags/en-us.png" alt="Lang from" />
						<img id="lang-to" src="/images/flags/ru-ru.png" alt="Lang to" />
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</Button.Group>
	);
};

export default DictionarySelector;
