import React, { useContext } from "react";
import { Tabs } from "antd";

import { RootStoreContext } from "../../app/stores/rootStore";
import { ItemType } from "../../app/models/item";
import ItemForm from "../common/forms/ItemForm";

const { TabPane } = Tabs;

const NewItem = () => {
	const rootStore = useContext(RootStoreContext);
	const { createItem } = rootStore.itemStore;

	return (
		<div id="new-item-container" className="manage-item-container">
			<div id="new-item" className="manage-item">
				<Tabs defaultActiveKey={ItemType.Word + ""}>
					<TabPane tab="Word" key={ItemType.Word + ""}>
						<ItemForm id="new-word-form" type={ItemType.Word} onSubmit={createItem} />
					</TabPane>

					<TabPane tab="Phrase" key={ItemType.Phrase + ""}>
						<ItemForm id="new-phrase-form" type={ItemType.Phrase} onSubmit={createItem} />
					</TabPane>
				</Tabs>
			</div>
		</div>
	);
};

export default NewItem;
