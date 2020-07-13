import React, { useContext } from "react";
import { Tabs } from "antd";
import { observer } from "mobx-react-lite";

import { RootStoreContext } from "../../app/stores/rootStore";
import { ItemType, INewItem } from "../../app/models/item";
import ItemForm from "../common/forms/ItemForm";

const { TabPane } = Tabs;

const NewItem = () => {
	const rootStore = useContext(RootStoreContext);
	const { createItem, submitting } = rootStore.itemStore;

	const onSubmit = async (item: INewItem, resetForm: () => void) => {
		const success = await createItem(item);
		if (success) {
			resetForm();
		}
	};

	return (
		<div id="new-item-container" className="manage-item-container">
			<div id="new-item" className="manage-item">
				<Tabs defaultActiveKey={ItemType.Word + ""}>
					<TabPane tab="Word" key={ItemType.Word + ""}>
						<ItemForm id="new-word-form" type={ItemType.Word} onSubmit={onSubmit} submitting={submitting} />
					</TabPane>

					<TabPane tab="Phrase" key={ItemType.Phrase + ""}>
						<ItemForm
							id="new-phrase-form"
							type={ItemType.Phrase}
							onSubmit={onSubmit}
							submitting={submitting}
						/>
					</TabPane>
				</Tabs>
			</div>
		</div>
	);
};

export default observer(NewItem);
