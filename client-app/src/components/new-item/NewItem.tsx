import React from "react";
import { Tabs } from "antd";

import NewItemForm from "./NewItemForm";

const { TabPane } = Tabs;

const NewItem = () => {
	return (
		<div id="new-item-container">
			<div id="new-item">
				<Tabs defaultActiveKey="10">
					<TabPane tab="Word" key="10">
						<NewItemForm id="new-word-form" type={10} />
					</TabPane>

					<TabPane tab="Phrase" key="20">
						<NewItemForm id="new-phrase-form" type={10} />
					</TabPane>
				</Tabs>
			</div>
		</div>
	);
};

export default NewItem;
