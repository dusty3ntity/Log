import React from "react";
import { Tabs } from "antd";

import { ItemType } from "../../app/models/item";
import NewItemForm from "./NewItemForm";

const { TabPane } = Tabs;

const NewItem = () => {
	return (
		<div id="new-item-container">
			<div id="new-item">
				<Tabs defaultActiveKey={ItemType.Word + ""}>
					<TabPane tab="Word" key={ItemType.Word + ""}>
						<NewItemForm id="new-word-form" type={ItemType.Word} />
					</TabPane>

					<TabPane tab="Phrase" key={ItemType.Phrase + ""}>
						<NewItemForm id="new-phrase-form" type={ItemType.Phrase} />
					</TabPane>
				</Tabs>
			</div>
		</div>
	);
};

export default NewItem;
