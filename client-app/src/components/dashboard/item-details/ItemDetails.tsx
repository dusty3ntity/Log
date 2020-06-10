import React, { useContext } from "react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import ItemDetailsContent from "./ItemDetailsContent";
import ItemDetailsEditForm from "./ItemDetailsEditForm";
import { Empty } from "antd";

interface IProps {
	classNames: string;
}

const ItemDetails: React.FC<IProps> = ({ classNames }) => {
	const rootStore = useContext(RootStoreContext);
	const { activeItem, editing } = rootStore.itemStore;

	return (
		<div id="item-details" className={classNames}>
			{!activeItem && <Empty description="Select an item" />}
			{activeItem && editing && <ItemDetailsEditForm item={activeItem} />}
			{activeItem && !editing && <ItemDetailsContent item={activeItem} />}
		</div>
	);
};

export default observer(ItemDetails);
