import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import { RootStoreContext } from "../../../app/stores/rootStore";
import ItemDetailsContent from "./ItemDetailsContent";
import LoadingScreen from "../../common/loading/LoadingScreen";
import Empty from "../../common/other/Empty";

const ItemDetails: React.FC = ({ ...props }) => {
	const rootStore = useContext(RootStoreContext);
	const { activeItem, loadingItem } = rootStore.itemStore;

	return (
		<div id="item-details" {...props}>
			{!activeItem && !loadingItem && <Empty text="Select an item" size={9} />}
			{loadingItem && <LoadingScreen size={2} />}
			{activeItem && !loadingItem && <ItemDetailsContent item={activeItem} />}
		</div>
	);
};

export default observer(ItemDetails);
