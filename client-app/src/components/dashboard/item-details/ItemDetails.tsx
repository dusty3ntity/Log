import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Empty } from "antd";

import { RootStoreContext } from "../../../app/stores/rootStore";
import ItemDetailsContent from "./ItemDetailsContent";

interface IProps {
	classNames: string;
}

const ItemDetails: React.FC<IProps> = ({ classNames }) => {
	const rootStore = useContext(RootStoreContext);
	const { activeItem, editing } = rootStore.itemStore;

	return (
		<div id="item-details" className={classNames}>
			{!activeItem && <Empty description="Select an item" />}
			{activeItem && !editing && <ItemDetailsContent item={activeItem} />}
		</div>
	);
};

export default observer(ItemDetails);
