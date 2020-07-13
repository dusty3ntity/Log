import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Empty } from "antd";

import { RootStoreContext } from "../../../app/stores/rootStore";
import ItemDetailsContent from "./ItemDetailsContent";
import LoadingScreen from "../../common/loading/LoadingScreen";

interface IProps {
	classNames: string;
}

const ItemDetails: React.FC<IProps> = ({ classNames }) => {
	const rootStore = useContext(RootStoreContext);
	const { activeItem, loading } = rootStore.itemStore;

	return (
		<div id="item-details" className={classNames}>
			{!activeItem && !loading && <Empty description="Select an item" />}
			{loading && <LoadingScreen size={2} />}
			{activeItem && !loading && <ItemDetailsContent item={activeItem} />}
		</div>
	);
};

export default observer(ItemDetails);
